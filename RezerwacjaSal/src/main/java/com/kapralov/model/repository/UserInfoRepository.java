package com.kapralov.model.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.kapralov.model.data.UserInfo;

@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo, Long>{

	UserInfo save(UserInfo entity);
	UserInfo findByEmail(String email);
	UserInfo findById(Long id);

}
