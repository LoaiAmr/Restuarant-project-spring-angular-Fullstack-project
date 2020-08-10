package com.datagear.restaurant.dto;

import java.util.ArrayList;
import java.util.List;

public class RecipeIngredientDTO {

	private Long id;
	private String name;
	private String description;
	private String imagePath;
	private List<IngredientDTO> ingredients = new ArrayList<>();

	public RecipeIngredientDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public List<IngredientDTO> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<IngredientDTO> ingredients) {
		this.ingredients = ingredients;
	}

	@Override
	public String toString() {
		return "RecipeIngredientDTO [id=" + id + ", name=" + name + ", description=" + description + ", imagePath="
				+ imagePath + ", ingredients=" + ingredients + "]";
	}

}
