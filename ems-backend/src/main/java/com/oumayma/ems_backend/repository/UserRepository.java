package com.oumayma.ems_backend.repository;

import com.oumayma.ems_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); //optional pour evoter nullpointerexception
    Boolean existsByEmail(String email);
}