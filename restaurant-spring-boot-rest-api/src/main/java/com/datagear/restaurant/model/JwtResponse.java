package com.datagear.restaurant.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	
	private final Long id;
	private final String username;
	private final String email;
	private final List<GrantedAuthority> authorities;
	private final String jwttoken;
	private final int expirationDate;


	public JwtResponse(String jwttoken, int expirationDate, RestaurantUserDetails userDetails) {
		this.id = userDetails.getId();
		this.username = userDetails.getUsername();
		this.email = userDetails.getEmail();
		this.authorities = (List<GrantedAuthority>) userDetails.getAuthorities();
		this.jwttoken = jwttoken;
		this.expirationDate = expirationDate;
	}

	public String getToken() {
		return this.jwttoken;
	}

	public String getEmail() {
		return email;
	}

	public String getUsername() {
		return username;
	}

	public List<GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public int getExpirationDate() {
		return expirationDate;
	}

	public Long getId() {
		return id;
	}
	
	
}