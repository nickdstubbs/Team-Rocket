package com.teamrocket.forms;

public class deleteTeamForm {
	private int teamId;
	private int userId;

	public deleteTeamForm() {
		super();
		// TODO Auto-generated constructor stub
	}

	public deleteTeamForm(int teamId, int userId) {
		super();
		this.teamId = teamId;
		this.userId=userId;
	}

	public int getTeamId() {
		return teamId;
	}

	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	
}
