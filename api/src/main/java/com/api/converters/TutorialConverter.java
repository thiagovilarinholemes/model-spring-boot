package com.api.converters;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.api.dto.TutorialDTO;
import com.api.entities.Tutorial;

@Component
public class TutorialConverter {
	
	public TutorialDTO entityToDto(Tutorial tutorial) {
		TutorialDTO dto = new TutorialDTO();
		dto.setId(tutorial.getId());
		dto.setTitle(tutorial.getTitle());
		dto.setDescription(tutorial.getDescription());
		dto.setPublished(tutorial.getPublished());
		return dto;
	}
	
	public List<TutorialDTO> entityToDto(List<Tutorial> tutorial ){
		return	tutorial.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
	}
	
	public Tutorial dtoToEntity(TutorialDTO dto) {
		Tutorial tutorial = new Tutorial();
		tutorial.setId(dto.getId());
		tutorial.setTitle(dto.getTitle());
		tutorial.setDescription(dto.getDescription());
		tutorial.setPublished(dto.getPublished());
		
		return tutorial;
	}
	
	public List<Tutorial> dtoToEntity(List<TutorialDTO> dto)
	{

		return dto.stream().map(x -> dtoToEntity(x)).collect(Collectors.toList());
	}


}
