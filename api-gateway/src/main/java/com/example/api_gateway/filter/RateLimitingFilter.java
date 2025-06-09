package com.example.api_gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends AbstractGatewayFilterFactory<RateLimitingFilter.Config> {

    private final Map<String, ClientRequestInfo> clientRequests = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS_PER_MINUTE = 100;

    public RateLimitingFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String clientIp = getClientIp(exchange);
            
            if (isRateLimited(clientIp)) {
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                response.getHeaders().add("Content-Type", "application/json");
                
                String body = "{\"error\":\"Rate limit exceeded\",\"message\":\"Too many requests. Please try again later.\",\"status\":429}";
                DataBuffer buffer = response.bufferFactory().wrap(body.getBytes());
                
                return response.writeWith(Mono.just(buffer));
            }
            
            updateClientRequestInfo(clientIp);
            return chain.filter(exchange);
        };
    }

    private String getClientIp(org.springframework.web.server.ServerWebExchange exchange) {
        String xForwardedFor = exchange.getRequest().getHeaders().getFirst("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = exchange.getRequest().getHeaders().getFirst("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return exchange.getRequest().getRemoteAddress() != null 
            ? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress() 
            : "unknown";
    }

    private boolean isRateLimited(String clientIp) {
        ClientRequestInfo requestInfo = clientRequests.get(clientIp);
        
        if (requestInfo == null) {
            return false;
        }
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMinuteAgo = now.minus(1, ChronoUnit.MINUTES);
        
        // Clean up old requests
        requestInfo.getRequestTimes().removeIf(time -> time.isBefore(oneMinuteAgo));
        
        return requestInfo.getRequestTimes().size() >= MAX_REQUESTS_PER_MINUTE;
    }

    private void updateClientRequestInfo(String clientIp) {
        LocalDateTime now = LocalDateTime.now();
        
        clientRequests.computeIfAbsent(clientIp, k -> new ClientRequestInfo())
                     .getRequestTimes()
                     .add(now);
        
        // Clean up old client entries periodically
        cleanupOldEntries();
    }

    private void cleanupOldEntries() {
        LocalDateTime oneHourAgo = LocalDateTime.now().minus(1, ChronoUnit.HOURS);
        
        clientRequests.entrySet().removeIf(entry -> {
            ClientRequestInfo info = entry.getValue();
            info.getRequestTimes().removeIf(time -> time.isBefore(oneHourAgo));
            return info.getRequestTimes().isEmpty();
        });
    }

    public static class Config {
        private int maxRequests = MAX_REQUESTS_PER_MINUTE;
        private int windowSizeInMinutes = 1;

        public int getMaxRequests() {
            return maxRequests;
        }

        public void setMaxRequests(int maxRequests) {
            this.maxRequests = maxRequests;
        }

        public int getWindowSizeInMinutes() {
            return windowSizeInMinutes;
        }

        public void setWindowSizeInMinutes(int windowSizeInMinutes) {
            this.windowSizeInMinutes = windowSizeInMinutes;
        }
    }

    private static class ClientRequestInfo {
        private final java.util.List<LocalDateTime> requestTimes = new java.util.concurrent.CopyOnWriteArrayList<>();

        public java.util.List<LocalDateTime> getRequestTimes() {
            return requestTimes;
        }
    }
}