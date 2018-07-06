package com.teamrocket.forms;

import org.springframework.web.bind.annotation.RequestParam;

public class addPokemonForm {
	private int pokedexId;
	private String name;
	private int level;
	private int teamId;
	private int position;
	private int userId;
	public addPokemonForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	public addPokemonForm(int pokedexId, String name, int level, int teamId, int position, int userId) {
		super();
		this.pokedexId = pokedexId;
		this.name = name;
		this.level = level;
		this.teamId = teamId;
		this.position = position;
		this.userId = userId;
	}
	public int getPokedexId() {
		return pokedexId;
	}
	public void setPokedexId(int pokedexId) {
		this.pokedexId = pokedexId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getTeamId() {
		return teamId;
	}
	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}
	public int getPositon() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	
	
}
