//REST APIS for managing wishlists

package net.christmas_wishlist.demo.controller;

import net.christmas_wishlist.demo.model.WishlistItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    private final List<WishlistItem> wishlist = new ArrayList<>();
    private Long idCounter = 1L; // Counter for generating unique ids

    //Get all wishlist items
    @GetMapping
    public List<WishlistItem> getAllItems() {
        return wishlist;
    }

    //Add a new item to the wishlist
    @PostMapping
    public WishlistItem addItem(@RequestBody WishlistItem item) {
        item.setId(idCounter++);
        wishlist.add(item);
        return item;
    }

    //Update an existing item by ID
    @PutMapping("/{id}")
    public WishlistItem updateItem(@PathVariable Long id, @RequestBody WishlistItem updatedItem) {
        Optional<WishlistItem> item = wishlist.stream().filter(i -> i.getId().equals(id)).findFirst();
        if (item.isPresent()) {
            WishlistItem existingItem = item.get();
            existingItem.setName(updatedItem.getName());
            existingItem.setDescription(updatedItem.getDescription());
            existingItem.setPrice(updatedItem.getPrice());
            existingItem.setLink(updatedItem.getLink());
            return existingItem;
        }
        return null;
    }

    //Delete an item by ID
    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        wishlist.removeIf(i -> i.getId().equals(id));
        return "Item deleted";
    }

    //Export wishlist as JSON
    @GetMapping("/export")
    public List<WishlistItem> exportWishlist() {
        return wishlist;
    }

    //Import wishlist from JSON
    @PostMapping("/import")
    public String importWishlist(@RequestBody List<WishlistItem> importedWishlist) {
        wishlist.clear();
        wishlist.addAll(importedWishlist);
        idCounter = wishlist.size() > 0 ? wishlist.get(wishlist.size() - 1).getId() + 1 : 1L;
        return "Wishlist imported";
    }
}