package com.kapralov.model.repository;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kapralov.model.data.RoomBook;

@Repository
public interface RoomBookRepository extends CrudRepository<RoomBook, Long>{

	
	@Query("SELECT r FROM RoomBook r WHERE TO_DAYS(r.busyFrom)=TO_DAYS(:date)")
	List<RoomBook> findWithDate(@Param("date") Date date);
}
