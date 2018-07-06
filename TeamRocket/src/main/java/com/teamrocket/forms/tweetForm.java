package com.teamrocket.forms;

public class tweetForm {

	private String message;
	private int userId;

	public tweetForm() {
		super();
		// TODO Auto-generated constructor stub
	}

	public tweetForm(String message, int userId) {
		super();
		this.message = message;
		this.userId = userId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
}
