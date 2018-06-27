package com.poketeam.daos;

import java.util.List;

import com.poketeam.pojos.Account;
import com.poketeam.pojos.Team;

public interface AccountDao {
	
	public Account login(String username, String password);
	
	public Account signUp(String username, String email, String password, String first, String last);
	
	public List<Team> loadTeams(int id);
	
}
