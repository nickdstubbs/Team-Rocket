package com.teamrocket.forms;

public class teamChange {
	private int userId;
	private String teamName;
	private String visibility;
	private int teamId;
	public teamChange() {
		super();
		// TODO Auto-generated constructor stub
	}
	public teamChange(int userId, String teamName, String visibility, int teamId) {
		super();
		this.userId = userId;
		this.teamName = teamName;
		this.visibility = visibility;
		this.teamId = teamId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
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
	public int getTeamId() {
		return teamId;
	}
	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}
	
}
