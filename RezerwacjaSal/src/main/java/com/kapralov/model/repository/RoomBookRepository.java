package com.kapralov.model.repository;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kapralov.model.data.RoomBook;

@Repository
public interface RoomBookRepository extends CrudRepository<RoomBook, Long>{

	
	@Query("SELECT r FROM RoomBook r WHERE ( TO_DAYS(r.busyFrom)=TO_DAYS(:date) AND r.idRoom = :id)")
	List<RoomBook> findWithDate(@Param("date") Date date, @Param("id") Long id);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM RoomBook r WHERE r.idRoom=:id")
	void deleteByIdRoom(@Param("id")Long id);
	
	RoomBook save(RoomBook book);
}
