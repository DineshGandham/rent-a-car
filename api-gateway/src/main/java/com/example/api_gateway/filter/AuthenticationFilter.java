package com.example.api_gateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.example.api_gateway.util.JwtUtil;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String path = request.getPath().toString();
            System.out.println("🔎 Incoming request path: " + path);

            // Skip authentication for public endpoints
            if (isPublicEndpoint(path)) {
                System.out.println("✅ Public endpoint detected, skipping auth: " + path);
                return chain.filter(exchange);
            }

            // Check if Authorization header is present
            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                System.out.println("❌ Missing Authorization header for path: " + path);
                return onError(exchange, "Missing Authorization header", HttpStatus.UNAUTHORIZED);
            }

            String authHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            System.out.println("🔐 Auth Header: " + authHeader);

            String token = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                System.out.println("✅ Extracted token: " + token);
            } else {
                System.out.println("❌ Invalid Authorization header format.");
                return onError(exchange, "Invalid Authorization header format", HttpStatus.UNAUTHORIZED);
            }

            // Validate JWT token
            if (!jwtUtil.validateToken(token)) {
                System.out.println("❌ Invalid or expired token.");
                return onError(exchange, "Invalid or expired token", HttpStatus.UNAUTHORIZED);
            }

            // Extract user information and add to headers for downstream services
            try {
                String username = jwtUtil.extractUsername(token);
                String userId = jwtUtil.extractUserId(token);
                String role = jwtUtil.extractRole(token);

                System.out.println("👤 User validated. Username: " + username + ", ID: " + userId + ", Role: " + role);

                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                        .header("X-User-Id", userId != null ? userId : "")
                        .header("X-Username", username != null ? username : "")
                        .header("X-User-Role", role != null ? role : "")
                        .build();

                return chain.filter(exchange.mutate().request(modifiedRequest).build());
            } catch (Exception e) {
                System.out.println("❌ Token processing error: " + e.getMessage());
                return onError(exchange, "Token processing error", HttpStatus.UNAUTHORIZED);
            }
        });
    }

    private boolean isPublicEndpoint(String path) {
        boolean result = path.startsWith("/api/auth/") ||
                         path.startsWith("/actuator/") ||
                         path.equals("/api/users/register") ||
                         path.equals("/api/users/login") ||
                         path.equals("/api/users/forgot-password") ||
                         path.equals("/api/users/reset-password");

        System.out.println("🛡️ isPublicEndpoint(\"" + path + "\") = " + result);
        return result;
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        response.getHeaders().add("Content-Type", "application/json");

        String body = "{\"error\":\"" + err + "\",\"status\":" + httpStatus.value() + "}";
        System.out.println("🚫 Responding with error: " + body);

        org.springframework.core.io.buffer.DataBuffer buffer = response.bufferFactory().wrap(body.getBytes());
        return response.writeWith(Mono.just(buffer));
    }

    public static class Config {
        // Configuration properties can be added here if needed
    }
}
