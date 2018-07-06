package com.teamrocket.forms;

public class deletePokemonForm {

	private int userId;
	private int teamId;
	private int posistion;
	public deletePokemonForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	public deletePokemonForm(int userId, int teamId, int posistion) {
		super();
		this.userId = userId;
		this.teamId = teamId;
		this.posistion = posistion;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getTeamId() {
		return teamId;
	}
	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}
	public int getPosistion() {
		return posistion;
	}
	public void setPosistion(int posistion) {
		this.posistion = posistion;
	}
	
	
}
