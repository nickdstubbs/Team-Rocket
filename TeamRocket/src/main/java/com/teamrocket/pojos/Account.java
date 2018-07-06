package com.teamrocket.pojos;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;

import org.hibernate.Transaction;
import org.springframework.stereotype.Component;

import com.teamrocket.daos.AccountImpl;
import com.teamrocket.utils.HibernateUtil;

@Component
@Entity
@Table
@JsonIgnoreProperties("team")
public class Account extends AccountImpl{
	
	// Connect variables to the database
	@Id
	@Column(name="USER_ID")
	private int user_id;
	
	@Column
	private String username;
	
	@Column
	private String email;
	
	@Column
	private String password;
	
	@Transient
	@OneToMany
	private List<Team> teams;
	

	//Constructors
	public Account() {
		super();
	}
	
	public Account(int id) {
		Account account=accountById(id);
		this.user_id=account.getUser_id();
		this.email=account.getEmail();
		this.password=account.getPassword();
		this.username=account.getUsername();
		this.teams=loadTeams(this.user_id);
	}

	public Account(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.save();
		
		Account account = login(username, password);
		this.user_id=account.getUser_id();
	}
	
	public Account(String username, String password) {
		Account account = login(username, password);
		if(account!=null) {
			this.user_id=account.getUser_id();
			this.email=account.getEmail();
			this.password=account.getPassword();
			this.username=account.getUsername();
			
			this.teams=account.loadTeams(user_id);
			
			for(Team team : teams) {
				team.setPokemon(team.loadPokemon(team.getTeamId()));
			}
		}	
	}
	
	//Methods 
	
	public List<Team> getPulbicTeams(int id)
	{
		List<Team> publicTeams = this.loadTeams(id);
		for(int i=0; i<publicTeams.size();i++) {
			if(publicTeams.get(i).getVisibility().equals("Private")) {
				publicTeams.remove(i);
			}
			else {
				publicTeams.get(i).setPokemon(publicTeams.get(i).loadPokemon(publicTeams.get(i).getTeamId()));
			}
		}
		return publicTeams;
	}
	
	public void removeTeamByName(String name) {
		Team remove=null;
		for(Team team : teams) {
			if(team.getTeamName().equals(name)) {
				remove=team;
				break;
			}
		}
		if(remove!=null) {
			teams.remove(remove);
			remove.delete();
		}
	}
	
	public void removeTeamById(int id) {
		Team remove=null;
		for(Team team : teams) {
			if(team.getTeamId()==id) {
				remove=team;
				break;
			}
		}
		if(remove!=null) {
			teams.remove(remove);
			remove.delete();
		}
	}
	
	public Team getTeamByName(String teamName) {
		for(Team team : teams) {
			if(team.getTeamName().equals(teamName)) {
				return team;
			}
		}
		return null;
	}
	
	public Team getTeamById(int teamId) {
		teams=loadTeams(user_id);
		for(Team team : teams) {
			if(team.getTeamId()==teamId) {
				return team;
			}
		}
		return null;
	}
	
	public void addTeam(String teamName, String visibility) {
		Team team = new Team(user_id, teamName, visibility);
		team.save();
		teams=loadTeams(user_id);
	}
	
	
	//Getters and Setters
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
		this.merge();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
		this.merge();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
		this.merge();
	}

	public int getUser_id() {
		return user_id;
	}
	
	public List<Team> getTeams(){
		teams=loadTeams(this.user_id);
		for(Team team : teams) {
			team.setPokemon(team.loadPokemon(team.getTeamId()));
		}
		return teams;
	}
	
	public List<Team> getPulbicTeams()
	{
		List<Team> publicTeams = teams;
		for(int i=0; i<publicTeams.size();i++) {
			if(publicTeams.get(i).getVisibility().equals("Private")) {
				publicTeams.remove(i);
			}
			else {
				publicTeams.get(i).setPokemon(publicTeams.get(i).loadPokemon(publicTeams.get(i).getTeamId()));
			}
		}
		System.out.println(publicTeams);
		return publicTeams;
	}
	public void setTeams(List<Team> teams) {
		this.teams=teams;
	}
	
	//Override hashcode, equals, and toString

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((teams == null) ? 0 : teams.hashCode());
		result = prime * result + user_id;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		Account other = (Account) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (teams == null) {
			if (other.teams != null)
				return false;
		} else if (!teams.equals(other.teams))
			return false;
		if (user_id != other.user_id)
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Account [user_id=" + user_id + ", username=" + username + ", email=" + email + ", password=" + password
				+", teams=" + teams + "]";
	}


}
