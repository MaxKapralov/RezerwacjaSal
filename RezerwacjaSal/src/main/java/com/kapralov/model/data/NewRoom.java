package com.kapralov.model.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "rooms")
public class NewRoom {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_room", nullable = false)
	private Long id;
	
	@NotNull @Size(min = 1, max = 5)
	private String location;
	
	@NotNull
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean permission;
		
	public NewRoom() {}
	
	public NewRoom(String location, boolean permission)
	{
		this.location = location;
		this.permission = permission;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isPermission() {
		return permission;
	}

	public void setPermission(boolean permission) {
		this.permission = permission;
	}
	
	
}
