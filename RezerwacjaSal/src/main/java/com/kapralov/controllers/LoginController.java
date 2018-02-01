package com.kapralov.controllers;

import java.security.Principal;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	
	@GetMapping("/logUser")
	public Principal getUser(Principal user)
	{
		return user;
	}
	
}
//dopisat udalienie dannych iz formy registracji
