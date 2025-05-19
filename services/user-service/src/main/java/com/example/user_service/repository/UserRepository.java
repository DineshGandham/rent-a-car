package com.example.user_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.user_service.model.User;
import java.util.Optional;
import java.util.List;


public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

}
