package com.datagear.restaurant.controller;

import java.util.List;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.datagear.restaurant.dto.RecipeIngredientDTO;
import com.datagear.restaurant.exception.IngredientServiceException;
import com.datagear.restaurant.exception.RecipeServiceException;
import com.datagear.restaurant.model.Ingredient;
import com.datagear.restaurant.model.Recipe;
import com.datagear.restaurant.model.RecipeIngredient;
import com.datagear.restaurant.repository.IngredientRepository;
import com.datagear.restaurant.repository.RecipeRepository;
import com.datagear.restaurant.service.IngredientService;
import com.datagear.restaurant.service.RecipeIngredientService;
import com.datagear.restaurant.service.RecipeService;

@RestController
@RequestMapping("restaurant")
@CrossOrigin
public class RecipeIngredientController {

	@Autowired
	private RecipeIngredientService recipeIngredientService;

	@GetMapping("/recipes")
	public List<RecipeIngredientDTO> getAllRecipeIngredients() {
		return recipeIngredientService.getAllRecipeIngredients();
	}

	@GetMapping("/recipes/{id}")
	public RecipeIngredientDTO getRecipeIngredientsById(@PathVariable(value = "id") Long recipeId) {
		return recipeIngredientService.getRecipeIngredientsById(recipeId);
	}

	@PostMapping("/recipes")
	public RecipeIngredientDTO createRecipeIngredients(@Valid @RequestBody RecipeIngredientDTO recIngDTO) {
		return recipeIngredientService.createRecipeIngredients(recIngDTO);
	}

	@DeleteMapping("/recipes/{id}")
	public RecipeIngredientDTO deleteRecipeIngredient(@PathVariable(value = "id") Long recipeId) {
		return recipeIngredientService.deleteRecipeIngredients(recipeId);
	}
	
	
	@PutMapping("/recipes/{id}")
	public RecipeIngredientDTO updateRecipe(@PathVariable(value = "id") Long recipeId,
			@RequestBody RecipeIngredientDTO recipeIngredientDetails) {
		return recipeIngredientService.updateRecipeIngredients(recipeId, recipeIngredientDetails);
	}

}
