package com.datagear.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datagear.restaurant.model.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long>{

}
