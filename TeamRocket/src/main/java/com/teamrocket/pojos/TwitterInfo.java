package com.teamrocket.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

import com.teamrocket.daos.TwitterInfoImpl;

import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.auth.AccessToken;

@Component
@Entity
@Table(name="Twitter")
public class TwitterInfo extends TwitterInfoImpl{
	
	@Id
	@Column(name="user_id")
	private int userId;
	
	@Column
	private String token;
	
	@Column(name="token_secret")
	private String secretToken;

	public TwitterInfo() {
		super();
	}
	
	public TwitterInfo(int id) {
		TwitterInfo newTwit=getTwitterInfoById(id);
		if(newTwit!=null) {
			this.userId=newTwit.userId;
			this.token=newTwit.token;
			this.secretToken=newTwit.secretToken;
		}
	}

	public TwitterInfo(int userId, String token, String secretToken) {
		super();
		this.userId = userId;
		this.token = token;
		this.secretToken = secretToken;
	}
	
	public String post(String message, Twitter twitter) {
		twitter.setOAuthAccessToken(new AccessToken(this.getToken(), this.getSecretToken()));
		try {
			Status status = twitter.updateStatus(message);
			return "Success";
		} catch (TwitterException e) {
			return "Error";
		}
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getSecretToken() {
		return secretToken;
	}

	public void setSecretToken(String secretToken) {
		this.secretToken = secretToken;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((secretToken == null) ? 0 : secretToken.hashCode());
		result = prime * result + ((token == null) ? 0 : token.hashCode());
		result = prime * result + userId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TwitterInfo other = (TwitterInfo) obj;
		if (secretToken == null) {
			if (other.secretToken != null)
				return false;
		} else if (!secretToken.equals(other.secretToken))
			return false;
		if (token == null) {
			if (other.token != null)
				return false;
		} else if (!token.equals(other.token))
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "TwitterInfo [userId=" + userId + ", token=" + token + ", secretToken=" + secretToken + "]";
	}
	
	

}
