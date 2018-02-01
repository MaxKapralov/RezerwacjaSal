package com.kapralov.model.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.kapralov.model.data.NewRoom;

@Repository
public interface NewRoomRepository extends CrudRepository<NewRoom, Long>{

	NewRoom save(NewRoom room);
	Iterable<NewRoom> findAll();
	NewRoom findByLocation(String location);
	NewRoom findById(Long id);
}
