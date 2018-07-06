package com.teamrocket.forms;

public class newTwitterForm {
	private int userId;
	private String pin;
	private String message;
	public newTwitterForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	public newTwitterForm(int userId, String pin, String message) {
		super();
		this.userId = userId;
		this.pin = pin;
		this.message = message;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
