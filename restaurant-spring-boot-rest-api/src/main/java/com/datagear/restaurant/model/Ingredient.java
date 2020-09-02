package com.datagear.restaurant.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "ingredient")
public class Ingredient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Name Must Be Not Null")
	@Size(min = 1)
	private String name;

	@OneToMany(mappedBy = "ingredient")
	private List<RecipeIngredient> recipeIngredient;

	public Ingredient() {
		super();
	}

	public Ingredient(String name) {
		super();
		this.name = name;
	}

	/**
	 * Gets id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets id.
	 *
	 * @param id the id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets name.
	 *
	 * @param name the name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets recipe_ingredients.
	 *
	 * @return Set of recipe_ingredients
	 */
	public void setRecipeIngredient(List<RecipeIngredient> recipeIngredient) {
		this.recipeIngredient = recipeIngredient;
	}

	/**
	 * Sets recipe_ingredients.
	 *
	 * @param Set of recipe_ingredients
	 */
	public List<RecipeIngredient> getRecipeIngredient() {
		return recipeIngredient;
	}



}
