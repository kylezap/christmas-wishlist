//REST APIS for managing wishlists

package net.christmas_wishlist.demo.controller;

import net.christmas_wishlist.demo.model.WishlistItem;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    private static final Logger logger = LoggerFactory.getLogger(WishlistController.class);

    private final List<WishlistItem> wishlist = new ArrayList<>();
    private Long idCounter = 1L; // Counter for generating unique ids

    //Get all wishlist items
    @GetMapping
    public List<WishlistItem> getAllItems() {
        logger.info("Fetching all wishlist items");
        return wishlist;
    }

    //Add a new item to the wishlist
    @PostMapping
    public ResponseEntity<?> addItem(@RequestBody WishlistItem item) {
        try {
            item.setId(idCounter++);
            wishlist.add(item);
            logger.info("Added new item to wishlist: {}", item.getName());
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            logger.error("Error adding item to wishlist", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding item to wishlist");
        }
    }

    //Update an existing item by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody WishlistItem updatedItem) {
        try {
            Optional<WishlistItem> item = wishlist.stream().filter(i -> i.getId().equals(id)).findFirst();
            if (item.isPresent()) {
                WishlistItem existingItem = item.get();
                existingItem.setName(updatedItem.getName());
                logger.info("Updated item with ID {}: {}", id, updatedItem.getName());
                return ResponseEntity.ok(existingItem);
            } else {
                logger.warn("Item with ID {} not found for update", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
            }
        } catch (Exception e) {
            logger.error("Error updating item with ID {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating item");
        }
    }

    //Delete an item by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        try {
            boolean removed = wishlist.removeIf(i -> i.getId().equals(id));
            if (removed) {
                logger.info("Deleted item with ID {}", id);
                return ResponseEntity.ok("Item deleted");
            } else {
                logger.warn("Item with ID {} not found for deletion", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
            }
        } catch (Exception e) {
            logger.error("Error deleting item with ID {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting item");
        }
    }

    //Export wishlist as JSON
    @GetMapping("/export")
    public ResponseEntity<?> exportWishlist() {
        try {
            logger.info("Exporting wishlist");
            return ResponseEntity.ok(wishlist);
        } catch (Exception e) {
            logger.error("Error exporting wishlist", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error exporting wishlist");
        }
    }

    //Import wishlist from JSON
    @PostMapping("/import")
    public ResponseEntity<?> importWishlist(@RequestBody List<WishlistItem> importedWishlist) {
        try {
            wishlist.clear();
            wishlist.addAll(importedWishlist);
            idCounter = wishlist.size() > 0 ? wishlist.get(wishlist.size() - 1).getId() + 1 : 1L;
            logger.info("Imported wishlist with {} items", wishlist.size());
            return ResponseEntity.ok("Wishlist imported");
        } catch (Exception e) {
            logger.error("Error importing wishlist", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error importing wishlist");
        }
    }

    // Global exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        logger.error("Unhandled exception", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
}
