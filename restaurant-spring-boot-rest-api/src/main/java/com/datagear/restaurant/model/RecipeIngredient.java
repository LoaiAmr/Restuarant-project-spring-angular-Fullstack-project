package com.datagear.restaurant.model;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "recipe_ingredient")
public class RecipeIngredient {

	@EmbeddedId
	private RecipeIngredientKey id;

	@ManyToOne
	@JoinColumn(name = "recipe_id")
	@MapsId("recipe_id")
	private Recipe recipe;

	@ManyToOne
	@JoinColumn(name = "ingredient_id")
	@MapsId("ingredient_id")
	private Ingredient ingredient;

	@NotNull(message = "Amount Must Be Not Null")
	@Min(1)
	private Integer amount;

	public RecipeIngredient() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RecipeIngredientKey getId() {
		return id;
	}

	public void setId(RecipeIngredientKey id) {
		this.id = id;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public Ingredient getIngredient() {
		return ingredient;
	}

	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}

	/**
	 * Gets amount.
	 *
	 * @return the amount
	 */
	public Integer getAmount() {
		return amount;
	}

	/**
	 * Sets amount.
	 *
	 * @param amount the amount
	 */
	public void setAmount(Integer amount) {
		this.amount = amount;
	}



}
