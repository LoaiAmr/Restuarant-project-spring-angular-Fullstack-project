package com.datagear.restaurant.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.datagear.restaurant.dto.UserLoginDTO;
import com.datagear.restaurant.dto.UserSignupDTO;
import com.datagear.restaurant.exception.AuthenticationException;
import com.datagear.restaurant.model.RestaurantUserDetails;
import com.datagear.restaurant.model.User;
import com.datagear.restaurant.repository.UserRepository;

@Service
public class RestaurantUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;


	@Override
	public RestaurantUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		if(!isUserExist(username)) {
			throw new UsernameNotFoundException("This user Not exists! Please Signup");
		}
		
		Optional<User> user = userRepository.findByUsername(username);
				
		return user.map(RestaurantUserDetails::new).get();
	}

	public RestaurantUserDetails saveUser(UserSignupDTO newUserDto) {

		if (isEmailExist(newUserDto.getEmail())) {
			throw new AuthenticationException("This Email exists already! Please Login");
		}

		User newUser = new User();

		newUser.setUsername(newUserDto.getUsername());
		newUser.setEmail(newUserDto.getEmail());
		newUser.setPassword(bcryptEncoder.encode(newUserDto.getPassword()));
		newUser.setActive(true);
		newUser.setRoles(newUserDto.getRoles());
		
		User user = userRepository.save(newUser);
		
		RestaurantUserDetails userDetails = new RestaurantUserDetails(user);
		
		return userDetails;

	}

	private boolean isEmailExist(String email) {
		return userRepository.findByEmail(email).isPresent();
	}
	
	private boolean isUserExist(String username) {
		return userRepository.findByUsername(username).isPresent();
	}


}
