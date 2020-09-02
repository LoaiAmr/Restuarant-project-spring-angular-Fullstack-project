package com.datagear.restaurant.exception;

public class AuthenticationException extends RuntimeException {

	
	private static final long serialVersionUID = -2200096393750010261L;

	public AuthenticationException(String message) {
		super(message);
	}

}
