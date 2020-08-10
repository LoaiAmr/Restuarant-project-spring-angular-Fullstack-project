package com.datagear.restaurant.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "recipe")
public class Recipe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Name Must Be Not Null")
	@Size(min = 1)
	@Column(unique = true)
	private String name;

	@NotNull(message = "Description Must Be Not Null")
	@Size(max = 250)
	private String description;

	@Column(nullable = false)
	private String imagePath;

	@OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<RecipeIngredient> recipeIngredient;

	public Recipe() {
		super();
	}

	public Recipe(String name, String description, String imagePath) {
		super();
		this.name = name;
		this.description = description;
		this.imagePath = imagePath;
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
	 * @param the name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets description.
	 *
	 * @param the description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Gets imagePath.
	 *
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * Sets imagPath.
	 *
	 * @param the imagPath
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
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

	@Override
	public String toString() {
		return "Recipe [id=" + id + ", name=" + name + ", description=" + description + ", imagePath=" + imagePath
				+ ", recipeIngredient=" + recipeIngredient + "]";
	}

}
