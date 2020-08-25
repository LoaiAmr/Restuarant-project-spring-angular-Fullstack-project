package com.datagear.restaurant.config;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * It is the entry point to check if a user is authenticated and logs the person
 * in or throws exception (unauthorized).
 * 
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

	private static final long serialVersionUID = -7858869558953243875L;

//	@Override
//	public void commence(HttpServletRequest request, HttpServletResponse response,
//			AuthenticationException authException) throws IOException {
//
//		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//	}

	@Override
	public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			AuthenticationException e) throws IOException, ServletException {

		Map<String, Object> response = new HashMap<>();
		response.put("status", "401");
		response.put("message", "You are not authorized to access this resource");
		httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		OutputStream out = httpServletResponse.getOutputStream();
		ObjectMapper mapper = new ObjectMapper();
		mapper.writerWithDefaultPrettyPrinter().writeValue(out, response);
		out.flush();
	}

}