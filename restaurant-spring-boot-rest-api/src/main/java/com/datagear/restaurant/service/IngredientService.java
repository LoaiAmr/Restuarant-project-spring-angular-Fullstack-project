package com.datagear.restaurant.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.datagear.restaurant.dto.IngredientDTO;
import com.datagear.restaurant.dto.RecipeIngredientDTO;
import com.datagear.restaurant.exception.IngredientServiceException;
import com.datagear.restaurant.exception.RecipeServiceException;
import com.datagear.restaurant.model.Ingredient;
import com.datagear.restaurant.model.Recipe;
import com.datagear.restaurant.model.RecipeIngredient;
import com.datagear.restaurant.model.RecipeIngredientKey;
import com.datagear.restaurant.repository.IngredientRepository;
import com.datagear.restaurant.repository.RecipeRepository;

@Service
public class IngredientService {

	@Autowired
	private IngredientRepository ingredientRepository;

	public List<Ingredient> convertToIngredientList(RecipeIngredientDTO recIngDTO) {

		List<Ingredient> ingredientList = new ArrayList<>();

		for (IngredientDTO ingDTO : recIngDTO.getIngredients()) {
			Ingredient ingredient = new Ingredient();
			ingredient.setId(ingDTO.getId());
			ingredient.setName(ingDTO.getName());
			ingredientList.add(ingredient);
		}

		return ingredientList;
	}

	public List<IngredientDTO> getAllIngredientsDTO() {

		List<Ingredient> ingredients = ingredientRepository.findAll();
		List<IngredientDTO> ingredientsDTO = new ArrayList<>();

		for (Ingredient ing : ingredients) {

			IngredientDTO ingDto = new IngredientDTO();
			ingDto.setId(ing.getId());
			ingDto.setName(ing.getName());

			ingredientsDTO.add(ingDto);
		}

		return ingredientsDTO;
	}

	public IngredientDTO insertIntoIngredient(IngredientDTO ingDTO) {

		boolean exist = checkIfIngredientExist(ingDTO);

		if (!exist) {

			Ingredient newIngredient = new Ingredient();
			newIngredient.setId(ingDTO.getId());
			newIngredient.setName(ingDTO.getName());
			newIngredient = ingredientRepository.save(newIngredient);

			ingDTO.setId(newIngredient.getId());
			return ingDTO;
		} else {
			return getIngredientByName(ingDTO.getName());
		}
	}

	public List<IngredientDTO> saveAllIngredients(RecipeIngredientDTO newRecIngDTO) {
		List<IngredientDTO> ingredients = newRecIngDTO.getIngredients();
		List<IngredientDTO> newIngredientsDTO = new ArrayList<>();
		
		for(IngredientDTO newIngDTO: ingredients) {		
			IngredientDTO newIngredient = insertIntoIngredient(newIngDTO);
			newIngredientsDTO.add(newIngredient);			
		}
		return newIngredientsDTO;
	}
	
	
	
	
	private IngredientDTO getIngredientByName(String ingName) {
		List<IngredientDTO> ingredientsDTO = getAllIngredientsDTO();
		for(IngredientDTO ing: ingredientsDTO) {
			if(ing.getName().equals(ingName)) {
				return ing;
			}
		}
		return null;
	}

	private boolean checkIfIngredientExist(IngredientDTO ingDTO) {
		List<IngredientDTO> allIngredients = getAllIngredientsDTO();
		String nameOfIngredient = ingDTO.getName();

		for (IngredientDTO ing : allIngredients) {
			if (ing.getName().equals(nameOfIngredient)) {
				return true;
			}
		}
		return false;
	}

}
