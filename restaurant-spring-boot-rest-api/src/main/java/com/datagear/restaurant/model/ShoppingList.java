package com.datagear.restaurant.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "shoppingList")
public class ShoppingList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "Name Must Be Not Null")
	@Size(min = 1)
	private String name;

	@NotNull(message = "Amount Must Be Not Null")
	@Min(1)
	private Integer amount;

	public ShoppingList() {
		super();
	}

	public ShoppingList(String name, Integer amount) {
		super();
		this.name = name;
		this.amount = amount;
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

	@Override
	public String toString() {
		return "Ingredient [id=" + id + ", name=" + name + ", amount=" + amount + "]";
	}

}
