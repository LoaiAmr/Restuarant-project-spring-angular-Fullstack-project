package com.datagear.restaurant.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.datagear.restaurant.dto.IngredientDTO;
import com.datagear.restaurant.dto.RecipeIngredientDTO;
import com.datagear.restaurant.model.Ingredient;
import com.datagear.restaurant.model.Recipe;
import com.datagear.restaurant.model.RecipeIngredient;
import com.datagear.restaurant.model.RecipeIngredientKey;
import com.datagear.restaurant.repository.IngredientRepository;
import com.datagear.restaurant.repository.RecipeIngredientRepository;
import com.datagear.restaurant.repository.RecipeRepository;

@Service
public class RecipeIngredientService {

	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;

	@Autowired
	private RecipeRepository recipeRepository;


	@Autowired
	private RecipeService recipeService;

	@Autowired
	private IngredientService ingredientService;

	public List<RecipeIngredientDTO> getAllRecipeIngredients() {
		return recipeService.getAllRecipes().stream().map(this::converToRecipeIngredientsDTO)
				.collect(Collectors.toList());
	}

	public RecipeIngredientDTO getRecipeIngredientsById(Long recipeId) {
		Recipe recipe = recipeService.getRecipeById(recipeId);
		return converToRecipeIngredientsDTO(recipe);
	}

	public RecipeIngredientDTO createRecipeIngredients(RecipeIngredientDTO newRecIngDTO) {

		Recipe newRecipe = recipeService.convertToRecipe(newRecIngDTO);
		recipeRepository.save(newRecipe);

		List<IngredientDTO> newIngredients = ingredientService.saveAllIngredients(newRecIngDTO);

		List<RecipeIngredient> newRecipeIngredients = findRecipeIngredient(newRecIngDTO, newRecipe, newIngredients);
		recipeIngredientRepository.saveAll(newRecipeIngredients);

		return newRecIngDTO;
	}

	public RecipeIngredientDTO deleteRecipeIngredients(Long recipeId) {

		Recipe recipe = recipeService.getRecipeById(recipeId);
		recipeService.deleteRecipeById(recipeId);

		return converToRecipeIngredientsDTO(recipe);
	}

	public RecipeIngredientDTO updateRecipeIngredients(Long recipeId, RecipeIngredientDTO recipeIngredientDetails) {

		RecipeIngredientDTO updatedRecIng = getRecipeIngredientsById(recipeId);
		Recipe updatedRecipe = recipeService.convertToRecipe(updatedRecIng);
		
		// update in the recipe
		updatedRecipe.setName(recipeIngredientDetails.getName());
		updatedRecipe.setDescription(recipeIngredientDetails.getDescription());
		updatedRecipe.setImagePath(recipeIngredientDetails.getImagePath());
		updatedRecipe = recipeRepository.save(updatedRecipe);

		// update in the ingredients
		List<IngredientDTO> updatedIngredients = ingredientService.saveAllIngredients(recipeIngredientDetails);

		// delete relation from the bridge table
		boolean isDeleted = deleteRelationFromRecipeIngredient(updatedRecIng);

		if (isDeleted) {
			List<RecipeIngredient> updatedRecipeIngredients = findRecipeIngredient(recipeIngredientDetails,
					updatedRecipe, updatedIngredients);
			recipeIngredientRepository.saveAll(updatedRecipeIngredients);
		}
		return recipeIngredientDetails;
	}

	private boolean deleteRelationFromRecipeIngredient(RecipeIngredientDTO recipeIngredient) {

		RecipeIngredientKey compositId = new RecipeIngredientKey();
		for (int i = 0; i < recipeIngredient.getIngredients().size(); i++) {
			compositId.setRecipeId(recipeIngredient.getId());
			compositId.setIngredientId(recipeIngredient.getIngredients().get(i).getId());
			recipeIngredientRepository.deleteById(compositId);
		}

		return true;

	}

	private List<RecipeIngredient> findRecipeIngredient(RecipeIngredientDTO recIngDTO, Recipe recipe,
			List<IngredientDTO> ingredients) {

		List<RecipeIngredient> recipeIngredientList = new ArrayList<>();

		for (int i = 0; i < recIngDTO.getIngredients().size(); i++) {

			RecipeIngredient recipeIngredient = new RecipeIngredient();
			RecipeIngredientKey compositeId = new RecipeIngredientKey();

			compositeId.setRecipeId(recipe.getId());
			compositeId.setIngredientId(ingredients.get(i).getId());

			recIngDTO.setId(recipe.getId());
			recIngDTO.getIngredients().get(i).setId(ingredients.get(i).getId());

			recipeIngredient.setId(compositeId);
			recipeIngredient.setAmount(recIngDTO.getIngredients().get(i).getAmount());

			recipeIngredientList.add(recipeIngredient);
		}
		return recipeIngredientList;
	}

	private RecipeIngredientDTO converToRecipeIngredientsDTO(Recipe recipe) {

		RecipeIngredientDTO recipeIngredientDTO = new RecipeIngredientDTO();
		recipeIngredientDTO.setId(recipe.getId());
		recipeIngredientDTO.setName(recipe.getName());
		recipeIngredientDTO.setDescription(recipe.getDescription());
		recipeIngredientDTO.setImagePath(recipe.getImagePath());

		List<IngredientDTO> ingredientsDTO = new ArrayList<>();

		for (RecipeIngredient ri : recipe.getRecipeIngredient()) {
			IngredientDTO ingDTO = new IngredientDTO();
			ingDTO.setId(ri.getIngredient().getId());
			ingDTO.setName(ri.getIngredient().getName());
			ingDTO.setAmount(ri.getAmount());
			ingredientsDTO.add(ingDTO);
		}

		recipeIngredientDTO.setIngredients(ingredientsDTO);

		return recipeIngredientDTO;
	}

}
