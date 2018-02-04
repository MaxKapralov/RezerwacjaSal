package com.kapralov.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kapralov.model.repository.NewRoomRepository;
import com.kapralov.model.repository.RoomBookRepository;
import com.kapralov.model.repository.UserInfoRepository;
import com.kapralov.model.data.NewRoom;
import com.kapralov.model.data.RoomBook;
import com.kapralov.model.data.UserInfo;

@RestController
public class MyConfirmController {

	
	@Autowired RoomBookRepository roomBookRep;
	@Autowired UserInfoRepository userInfo;
	@Autowired NewRoomRepository roomRep;
	@Autowired JavaMailSender emailSender;
	
	@RequestMapping(value="/getConfirms", method = RequestMethod.GET)
	public ResponseEntity<List<RoomBook>> getConf()
	{
		return new ResponseEntity<List<RoomBook>>(roomBookRep.findConf(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/acceptBook", method = RequestMethod.POST)
	public ResponseEntity<Void> accept(@RequestParam("id") Long id, @RequestParam("idUser") Long idUser)
	{
		roomBookRep.changeStatusOk(id);
		UserInfo info = userInfo.findById(idUser);
		RoomBook roomInfo = roomBookRep.findById(id);
		NewRoom room = roomRep.findById(roomInfo.getIdRoom());
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(info.getEmail());
		message.setSubject("Rezerwacja sali " + room.getLocation() + " w dniu " + roomInfo.getBusyFrom());
		message.setText("Zmieniono status twojej rezerwacji w dniu " + roomInfo.getBusyFrom() 
			+ " - " + roomInfo.getBusyFrom() + " , sala " + room.getLocation() 
			+ " , status - Zaakceptowana.");
		emailSender.send(message);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/blockBook", method = RequestMethod.POST)
	public ResponseEntity<Void> block(@RequestParam("id") Long id, @RequestParam("idUser") Long idUser)
	{
		roomBookRep.changeStatusBlock(id);
		UserInfo info = userInfo.findById(idUser);
		RoomBook roomInfo = roomBookRep.findById(id);
		NewRoom room = roomRep.findById(roomInfo.getIdRoom());
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(info.getEmail());
		message.setSubject("Rezerwacja sali " + room.getLocation() + " w dniu " + roomInfo.getBusyFrom());
		message.setText("Zmieniono status twojej rezerwacji w dniu " + roomInfo.getBusyFrom() 
			+ " - " + roomInfo.getBusyFrom() + " , sala " + room.getLocation() 
			+ " , status - Odrzucona.");
		emailSender.send(message);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
}
