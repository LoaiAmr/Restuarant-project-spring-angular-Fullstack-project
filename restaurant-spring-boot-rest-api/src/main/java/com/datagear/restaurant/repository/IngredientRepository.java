package com.datagear.restaurant.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datagear.restaurant.model.Ingredient;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

//	List<Ingredient> findByRecipeId(Long recipeId);
//	List<Ingredient> findByRecipeIngredientId(Long id);
	
//	Optional<Ingredient> findByIdAndRecipeId(Long id, Long recipeId);

}
