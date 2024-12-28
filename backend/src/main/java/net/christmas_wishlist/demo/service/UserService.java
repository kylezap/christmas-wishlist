package net.christmas_wishlist.demo.service;

import net.christmas_wishlist.demo.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService implements UserDetailsService {

    private final Map<String, User> userStore = new ConcurrentHashMap<>();

    public UserService() {
        // Initialize with some users
        userStore.put("admin", new User("admin", "admin", "ROLE_ADMIN"));
        userStore.put("user", new User("user", "password", "ROLE_USER"));
    }

    public boolean addUser(User user) {
        if (userStore.containsKey(user.getUsername())) {
            return false; // user already exists
        }
        userStore.put(user.getUsername(), user);
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userStore.get(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }
}