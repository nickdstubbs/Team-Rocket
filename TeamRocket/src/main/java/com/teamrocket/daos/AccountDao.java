package com.teamrocket.daos;

import java.util.List;

import com.teamrocket.pojos.Account;
import com.teamrocket.pojos.Team;

public interface AccountDao{
	
	public Account login(String username, String password);
	
	public Account signUp(String username, String email, String password);
	
	public List<Team> loadTeams(int id);
	
}
