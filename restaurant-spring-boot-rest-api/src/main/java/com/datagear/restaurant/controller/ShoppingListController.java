package com.datagear.restaurant.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datagear.restaurant.exception.RecipeServiceException;
import com.datagear.restaurant.exception.ShoppingListServiceException;
import com.datagear.restaurant.model.ShoppingList;
import com.datagear.restaurant.repository.ShoppingListRepository;

@RestController
@RequestMapping("restaurant")
@CrossOrigin
public class ShoppingListController {

	@Autowired
	private ShoppingListRepository shoppingListRepository;

	
	@GetMapping("/shopping-list")
	public List<ShoppingList> getAllShoppingList() {

		return shoppingListRepository.findAll();
	}

	@GetMapping("/shopping-list/{shoppingListId}")
	public ResponseEntity<ShoppingList> getShoppingList(@PathVariable(value = "shoppingListId") Long shoppinListId) {

		ShoppingList shoppingList = shoppingListRepository.findById(shoppinListId)
				.orElseThrow(() -> new RecipeServiceException("Shopping List not found on :: " + shoppinListId));
		return ResponseEntity.ok(shoppingList);

	}

	@PostMapping("/shopping-list")
	public ResponseEntity<ShoppingList> createShoppinglist(@Valid @RequestBody ShoppingList newShoppingList) {

		ShoppingList shoppingList = shoppingListRepository.save(newShoppingList);
		return ResponseEntity.ok(shoppingList);
	}

	@PostMapping("/shopping-list/collection")
	public ResponseEntity<List<ShoppingList>> createListOfShoppinglist(
			@Valid @RequestBody List<ShoppingList> newShoppingList) {

		List<ShoppingList> shoppingList = shoppingListRepository.saveAll(newShoppingList);
		return ResponseEntity.ok(shoppingList);
	}

	@PatchMapping("/shopping-list/{shoppingListId}")
	public ResponseEntity<ShoppingList> updateShoppingList(@PathVariable(value = "shoppingListId") Long shoppingListId,
			@RequestBody ShoppingList shoppingListRequest) {

		ShoppingList shoppingList = shoppingListRepository.findById(shoppingListId)
				.orElseThrow(() -> new RecipeServiceException("Shopping List not found on :: " + shoppingListId));

		shoppingList.setName(shoppingListRequest.getName());
		shoppingList.setAmount(shoppingListRequest.getAmount());
		final ShoppingList updatedShoppingList = shoppingListRepository.save(shoppingList);
		return ResponseEntity.ok(updatedShoppingList);
	}

	@DeleteMapping("/shopping-list/{shoppingListId}")
	public ResponseEntity<ShoppingList> deleteShoppingList(
			@PathVariable(value = "shoppingListId") Long shoppingListId) {

		ShoppingList shoppingList = shoppingListRepository.findById(shoppingListId)
				.orElseThrow(() -> new RecipeServiceException("Shopping List not found on :: " + shoppingListId));

		shoppingListRepository.delete(shoppingList);

		return ResponseEntity.ok(shoppingList);
	}

}
