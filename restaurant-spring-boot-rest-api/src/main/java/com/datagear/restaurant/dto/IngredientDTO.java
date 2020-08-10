package com.datagear.restaurant.dto;

public class IngredientDTO {
	private Long id;
	private String name;
	private int amount;

	public IngredientDTO() {
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

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "IngredientDTO [id=" + id + ", name=" + name + ", amount=" + amount + "]";
	}

}
