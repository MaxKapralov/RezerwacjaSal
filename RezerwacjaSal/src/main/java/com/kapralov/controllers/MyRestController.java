package com.kapralov.controllers;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kapralov.model.data.NewUserForm;
import com.kapralov.model.data.User;
import com.kapralov.model.data.UserInfo;
import com.kapralov.model.repository.UserInfoRepository;
import com.kapralov.model.repository.UserRepository;

@RestController
public class MyRestController {

	@Autowired UserRepository userRepo;
	@Autowired UserInfoRepository userInfo;
	
	
	@RequestMapping(value="/user", method = RequestMethod.POST)
	public ResponseEntity<Void> createUser(@RequestBody String str) throws Exception
	{
		NewUserForm newUser = new NewUserForm(str);
		System.out.println("Creating user " + newUser.getLogin());
		User user = userRepo.save(new User(newUser.getLogin(), newUser.getPassword()));
        userInfo.save(new UserInfo(user.getId(), newUser.getName(), newUser.getSurname(), newUser.getEmail(), newUser.getBirthday(), newUser.getRole()));
        
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/loginIsUniq")
    public String checkLogin(@RequestParam("login") String login)
    {
    	User user = userRepo.findByLogin(login);
    	if(user == null)
    		return "true";
    	return "false";
    }
	
	
}
