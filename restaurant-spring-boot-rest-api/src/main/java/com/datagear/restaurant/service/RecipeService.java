package com.datagear.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.datagear.restaurant.dto.RecipeIngredientDTO;
import com.datagear.restaurant.exception.RecipeServiceException;
import com.datagear.restaurant.model.Recipe;
import com.datagear.restaurant.repository.RecipeRepository;

@Service
public class RecipeService {

	@Autowired
	private RecipeRepository recipeRepository;

	public Recipe convertToRecipe(RecipeIngredientDTO recIngDTO) {

		Recipe recipe = new Recipe();
		recipe.setId(recIngDTO.getId());
		recipe.setName(recIngDTO.getName());
		recipe.setImagePath(recIngDTO.getImagePath());
		recipe.setDescription(recIngDTO.getDescription());

		return recipe;
	}

	public List<Recipe> getAllRecipes() {
		return recipeRepository.findAll();
	}

	public Recipe getRecipeById(Long recipeId) {
		return recipeRepository.findById(recipeId)
				.orElseThrow(() -> new RecipeServiceException("Recipe not found on :: " + recipeId));
	}

	public Recipe deleteRecipeById(Long recipeId) {
		Recipe recipeDeleted = getRecipeById(recipeId);
		recipeRepository.deleteById(recipeId);
		return recipeDeleted;
	}

}
