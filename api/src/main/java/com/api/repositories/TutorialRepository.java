package com.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.entities.Tutorial;

@Repository
public interface TutorialRepository extends JpaRepository<Tutorial, Long>{
	
	List<Tutorial> findAllByOrderByTitleAsc();
	
	List<Tutorial> findByTitleContaining(String title);
	
	List<Tutorial> findByPublished(Boolean published);

}
