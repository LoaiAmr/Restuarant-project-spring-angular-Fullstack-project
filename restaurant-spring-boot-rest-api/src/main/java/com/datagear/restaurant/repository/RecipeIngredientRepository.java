package com.datagear.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datagear.restaurant.model.RecipeIngredient;
import com.datagear.restaurant.model.RecipeIngredientKey;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, RecipeIngredientKey>{

}
