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

import com.api.entities.Tutorial;
import com.api.repositories.TutorialRepository;
import com.api.services.TutorialService;

@RestController
@RequestMapping(value = "/api")
public class TutorialController {

	@Autowired
	TutorialService service;
	
	@GetMapping("/tutorials")
	public ResponseEntity<List<Tutorial>> getAllTutorials(){
		List<Tutorial> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/tutorials/{id}")
	public ResponseEntity<Tutorial> getByTutorialsId(@PathVariable("id") Long id){
		Tutorial list = service.findById(id);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/tutorials/title")
	public ResponseEntity<List<Tutorial>> getAllTutorialsTitle(@RequestBody(required = false) String title){
		List<Tutorial> list = service.findByTitleContaining(title);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/tutorials/published")
	public ResponseEntity<List<Tutorial>> getAllTutorialsPublished(@RequestBody(required = false) String published){
		List<Tutorial> list = service.findByPublished(published);
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping("/tutorials")
	public ResponseEntity<Tutorial> createTutorial(@RequestBody Tutorial obj){
		Tutorial tutorial = service.insert(obj);
		return ResponseEntity.ok().body(tutorial);
	}
	
	@PutMapping("/tutorials/{id}")
	public ResponseEntity<Tutorial> updateTutorial(@PathVariable("id") Long id, @RequestBody Tutorial tutorial) {
		Tutorial entity = service.update(id, tutorial);
		return ResponseEntity.ok().body(entity);
	}
	
	@DeleteMapping("/tutorials/{id}")
	public String  deleteTutorial(@PathVariable("id") Long id){
		String message = service.delete(id);
		return message;
	}
	
}