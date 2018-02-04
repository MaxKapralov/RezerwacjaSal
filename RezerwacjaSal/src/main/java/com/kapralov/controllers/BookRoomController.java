package com.kapralov.controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kapralov.model.data.NewRoom;
import com.kapralov.model.data.RoomBook;
import com.kapralov.model.data.User;
import com.kapralov.model.data.UserInfo;
import com.kapralov.model.repository.NewRoomRepository;
import com.kapralov.model.repository.RoomBookRepository;
import com.kapralov.model.repository.UserInfoRepository;
import com.kapralov.model.repository.UserRepository;

@RestController
public class BookRoomController {

	@Autowired RoomBookRepository roomBookRep;
	@Autowired NewRoomRepository roomRep;
	@Autowired UserRepository userRep;
	@Autowired UserInfoRepository userInfo;
	@Autowired JavaMailSender emailSender;
	
	@RequestMapping(value="/checkDate", method = RequestMethod.GET)
	public ResponseEntity<List<Integer>> checkDate(@RequestParam("date") Date date, @RequestParam("id") Long id) throws ParseException
	{
		List<Integer> hours = getHours();	
		ArrayList<RoomBook> rooms = new ArrayList<RoomBook>(roomBookRep.findWithDate(date, id));
		hours = getFreeHours(hours, rooms);
		return new ResponseEntity<List<Integer>>(hours, HttpStatus.OK);
	}
	
	public static List<Integer> getFreeHours(List<Integer> hours, ArrayList<RoomBook> rooms)
	{
		Calendar calendar = GregorianCalendar.getInstance();
		for(int i = 0; i < rooms.size(); i++)
		{
			calendar.setTime(rooms.get(i).getBusyFrom());
			if(hours.contains(new Integer(calendar.get(Calendar.HOUR_OF_DAY))))
				hours.remove(new Integer(calendar.get(Calendar.HOUR_OF_DAY)));
		}
		return hours;
	}
	public static List<Integer> getHours()
	{
		List<Integer> list = new ArrayList<Integer>();
		for(int i = 0,  j = 8; i < 6; i++, j+=2)
			list.add(j);
		return list;
	}
	
	@RequestMapping(value="/bookRoom", method = RequestMethod.POST)
	public ResponseEntity<Void> bookRoom(@RequestBody String aim, @RequestParam("idRoom") Long idRoom, @RequestParam("username") String login, @RequestParam("time") String time, @RequestParam("date") Date date)
	{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(time));
		date = cal.getTime();
		cal.set(Calendar.HOUR_OF_DAY, Integer.parseInt(time) + 2);
		Date dateTo = cal.getTime();
		User user = userRep.findByLogin(login);
		UserInfo info = userInfo.findById(user.getId());
		NewRoom room = roomRep.findById(idRoom);
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(info.getEmail());
		message.setSubject("Rezerwacja sali " + room.getLocation() + " w dniu " + date);
		if(!room.getPermission() || info.getRole().equals("ROLE_ADMIN"))
		{
			roomBookRep.save(new RoomBook(idRoom, user.getId(), date, dateTo, aim, "OK"));
			message.setText("Twoja rezerwacja sali "+ room.getLocation() + " w godzinach " + date + " - " + dateTo + " zostala zaakceptowana.");
		}
		else
		{
			roomBookRep.save(new RoomBook(idRoom, user.getId(), date, dateTo, aim, "WAIT"));
			message.setText("Twoja rezerwacja sali "+ room.getLocation() + " w godzinach " + date + " - " + dateTo + " oczekuje na potwierdzenie przez administratora.");
		}
		emailSender.send(message);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
}
