package com.datagear.restaurant.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datagear.restaurant.config.JwtTokenUtil;
import com.datagear.restaurant.dto.UserSignupDTO;
import com.datagear.restaurant.exception.AuthenticationException;
import com.datagear.restaurant.dto.UserLoginDTO;
import com.datagear.restaurant.model.JwtResponse;
import com.datagear.restaurant.model.RestaurantUserDetails;
import com.datagear.restaurant.model.User;
import com.datagear.restaurant.repository.UserRepository;
import com.datagear.restaurant.service.RestaurantUserDetailsService;



@RestController
@RequestMapping("restaurant")
@CrossOrigin
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private RestaurantUserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping(value = "/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody UserLoginDTO authenticationRequest) {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		
		final RestaurantUserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);
		
		final int expirationDate = jwtTokenUtil.getExpirationDateNumberFromToken(token); 

		return ResponseEntity.ok(new JwtResponse(token, expirationDate, userDetails));
	}

	@PostMapping(value = "/signup")
	public ResponseEntity<?> saveUser(@RequestBody UserSignupDTO newUserDto) throws Exception {
		
		RestaurantUserDetails userDetails = jwtUserDetailsService.saveUser(newUserDto);
		
		final String token = jwtTokenUtil.generateToken(userDetails);
		
		final int expirationDate = jwtTokenUtil.getExpirationDateNumberFromToken(token); 
		
		return ResponseEntity.ok(new JwtResponse(token, expirationDate, userDetails));

	}

	private void authenticate(String username, String password) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new AuthenticationException("You are disabled by an administrator");
		} catch (BadCredentialsException e) {
			Optional<User> user = userRepository.findByUsername(username);
			if(!user.isPresent())
			throw new AuthenticationException("This user Not Exists! Please Signup");
			else
				throw new AuthenticationException("Please Enter the valid password!");
		}
	}

}
