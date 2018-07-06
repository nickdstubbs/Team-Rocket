package com.teamrocket.forms;

public class pokemonChange {
	private int userId;
	private int pokemonId;
	private int teamId;
	private int level;
	private String name;
	public pokemonChange() {
		super();
		// TODO Auto-generated constructor stub
	}
	public pokemonChange(int userId, int pokemonId, int teamId, int level, String name) {
		super();
		this.userId = userId;
		this.pokemonId = pokemonId;
		this.teamId = teamId;
		this.level = level;
		this.name = name;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getPokemonId() {
		return pokemonId;
	}
	public void setPokemonId(int pokemonId) {
		this.pokemonId = pokemonId;
	}
	public int getTeamId() {
		return teamId;
	}
	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	

}
