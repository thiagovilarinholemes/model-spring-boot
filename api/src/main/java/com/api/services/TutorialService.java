package com.api.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.api.services.exceptions.DatabaseException;
import com.api.services.exceptions.ResourceNotFoundException;
import com.api.entities.Tutorial;
import com.api.repositories.TutorialRepository;

import org.json.JSONObject;

@Service
public class TutorialService {
	
	@Autowired
	TutorialRepository repository;
	
	/** Method List All Tutorials */
	@Transactional(readOnly = true)
	public List<Tutorial> findAll(){
		return repository.findAllByOrderByTitleAsc();
	}
	
	/** Method List Tutorial ID */
	@Transactional(readOnly = true)
	public Tutorial findById(Long id){
		Optional<Tutorial> obj = repository.findById(id);
		return obj.orElseThrow(()-> new ResourceNotFoundException(id));
	}
	
	/** Method List Tutorials Title */
	@Transactional(readOnly = true)
	public List<Tutorial> findByTitleContaining(String title){
		JSONObject json = new JSONObject(title);
		return repository.findByTitleContaining(json.getString("title"));
	}
	
	/** Method List Tutorials Published*/
	@Transactional(readOnly = true)
	public List<Tutorial> findByPublished(String published){
		JSONObject json = new JSONObject(published);
		System.out.print(json.getBoolean("published"));
		return repository.findByPublished(json.getBoolean("published"));
	}
	
	/** Method Insert Tutorial */
	@Transactional
	public Tutorial insert(Tutorial obj) {
		return repository.save(obj);
	}
	
	/** Method Update Tutorial */
	@Transactional
	public Tutorial update(Long id, Tutorial obj){
        try {
        	Tutorial entity = repository.getOne(id);
      
            /** Call Method updateDate */
            updateData(entity, obj);

            return repository.save(entity);
        }
        catch (EntityNotFoundException e){
            throw new DatabaseException(e.getMessage());
        }
    }
	
	/** Method Delete Tutorial */
	public String delete(Long id){
        try {
            repository.deleteById(id);
            return "Deletado com sucesso!!!";
        }
        catch (EmptyResultDataAccessException e){
            throw new ResourceNotFoundException(id);
        }
        catch (DataIntegrityViolationException e){
            throw new DatabaseException(e.getMessage());
        }
    }
	
	/** Method Update Data Tutorial  */
	public void updateData(Tutorial entity, Tutorial obj){
		entity.setTitle(obj.getTitle());
		entity.setDescription(obj.getDescription());
		entity.setPublished(obj.getPublished());
		entity = repository.save(entity);
	}
	
}













