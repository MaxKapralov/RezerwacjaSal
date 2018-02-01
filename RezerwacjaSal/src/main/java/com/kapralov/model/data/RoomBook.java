package com.kapralov.model.data;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "room_book")
public class RoomBook {
	
	@Id
	private Long id;

	@Column(name = "id_room", nullable = false)
	private Long idRoom;
	
	@Column(name = "id_user", nullable = false)
	private Long idUser;
	
	@Column(name = "busy_from", nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	private Timestamp busyFrom;

	@Column(name = "busy_to", nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	private Timestamp busyTo;
	
	@Size(min = 5, max = 255)
	private String aim;
	
	private String status;
	
	public RoomBook() {}
	
	public RoomBook(Long idRoom, Long idUser, Timestamp busyFrom, Timestamp busyTo, String aim, String status)
	{
		this.idRoom = idRoom;
		this.idUser = idUser;
		this.busyFrom = busyFrom;
		this.busyTo = busyTo;
		this.aim = aim;
		this.status = status;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public Long getIdRoom() {
		return idRoom;
	}

	public void setIdRoom(Long idRoom) {
		this.idRoom = idRoom;
	}

	public Timestamp getBusyFrom() {
		return busyFrom;
	}

	public void setBusyFrom(Timestamp busyFrom) {
		this.busyFrom = busyFrom;
	}

	public Timestamp getBusyTo() {
		return busyTo;
	}

	public void setBusyTo(Timestamp busyTo) {
		this.busyTo = busyTo;
	}

	public String getAim() {
		return aim;
	}

	public void setAim(String aim) {
		this.aim = aim;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String toString()
	{
		return "IdRoom: " + idRoom + " IdUser: " + idUser + " BusyFrom: " + busyFrom + " BusyTo: " + busyTo + " Aim: " + aim + " Status: " + status;
	}

}
