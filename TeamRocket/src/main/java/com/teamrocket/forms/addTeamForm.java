package com.teamrocket.forms;

public class addTeamForm {
	private String teamName;
	private String visibility;
	private int userId;
	public addTeamForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	public addTeamForm(String teamName, String visibility, int userId) {
		super();
		this.teamName = teamName;
		this.visibility = visibility;
		this.userId = userId;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getVisibility() {
		return visibility;
	}
	public void setVisibility(String visibility) {
		this.visibility = visibility;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	

}
