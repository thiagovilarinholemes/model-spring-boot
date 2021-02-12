package com.api.dto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
public class TutorialDTO {
	
	private Long id;
	private String title;
	private String description;
	private Boolean published;
}
