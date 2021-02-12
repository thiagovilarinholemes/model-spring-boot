package com.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.converters.TutorialConverter;
import com.api.dto.TutorialDTO;
import com.api.entities.Tutorial;
import com.api.repositories.TutorialRepository;
import com.api.services.TutorialService;

@RestController
@RequestMapping(value = "/api")
public class TutorialController {

	@Autowired
	TutorialService service;
	
	@Autowired
	TutorialConverter converter;
	
	/** List All Tutorials */
	@GetMapping("/tutorials")
	public ResponseEntity<List<TutorialDTO>> getAllTutorials(){
		List<Tutorial> list = service.findAll();
		return ResponseEntity.ok().body(converter.entityToDto(list));
	}
	
	/** List Tutorials ID*/
	@GetMapping("/tutorials/{id}")
	public ResponseEntity<TutorialDTO> getByTutorialsId(@PathVariable("id") Long id){
		Tutorial obj = service.findById(id);
		return ResponseEntity.ok().body(converter.entityToDto(obj));
	}
	
	@GetMapping("/tutorials/title")
	public ResponseEntity<List<TutorialDTO>> getAllTutorialsTitle(@RequestBody(required = false) String title){
		List<Tutorial> list = service.findByTitleContaining(title);
		return ResponseEntity.ok().body(converter.entityToDto(list));
	}
	
	@GetMapping("/tutorials/published")
	public ResponseEntity<List<TutorialDTO>> getAllTutorialsPublished(@RequestBody(required = false) String published){
		List<Tutorial> list = service.findByPublished(published);
		return ResponseEntity.ok().body(converter.entityToDto(list));
	}
	
	@PostMapping("/tutorials")
	public ResponseEntity<TutorialDTO> createTutorial(@RequestBody TutorialDTO dto){
		Tutorial tutorial = converter.dtoToEntity(dto);
		tutorial = service.insert(tutorial);
		return ResponseEntity.ok().body(converter.entityToDto(tutorial));
	}
	
	@PutMapping("/tutorials/{id}")
	public ResponseEntity<TutorialDTO> updateTutorial(@PathVariable("id") Long id, @RequestBody TutorialDTO dto) {
		Tutorial tutorial = converter.dtoToEntity(dto);
		tutorial = 	service.update(id, tutorial);
		return ResponseEntity.ok().body(converter.entityToDto(tutorial));
	}
	
	@DeleteMapping("/tutorials/{id}")
	public String  deleteTutorial(@PathVariable("id") Long id){
		String message = service.delete(id);
		return message;
	}
	
}
