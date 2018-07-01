package com.poketeam.daos;

import java.util.ArrayList;
import java.util.List;

import javax.swing.plaf.synth.SynthSeparatorUI;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.poketeam.pojos.Account;
import com.poketeam.pojos.Team;
import com.poketeam.utils.HibernateUtil;

public abstract class AccountImpl extends Transactions implements AccountDao{

	//Used to check and see if an account with given username/password credentials exists
	//If so, return a new Account object with all of the related accounts information
	public Account login(String user, String pass) {
		Account newAccount = null;
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery("from Account where (username=:user and password=:pass) or "
				+ "(email=:user and password=:pass)");
		query.setString("user", user);
		query.setString("pass", pass);
		
		List<Account> accounts=query.list();
		
		session.close();
		
		if(accounts.size()>0) {
			newAccount=accounts.get(0);
			newAccount.setTeams(loadTeams(newAccount.getUser_id()));
		}
		
		return newAccount;
	}
	
	//Used to check and see if there is no account existing with either the given username or password
	//If there is none, return a new Account object with the related account information, and create a row in the database with the info
	public Account signUp(String username, String email, String password, String first, String last) {
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery("from Account where username=:user or email=:em");
		query.setString("user", username);
		query.setString("em", email);
		
		List<Account> accounts=query.list();
		
		if(accounts.isEmpty()) {
			Account newAccount = new Account(username, email, password, first, last);
			newAccount.save();
			return newAccount;
		}
		else {
			session.close();
			return null;
		}
		
	}
	
	//Get all teams belonging to the account represented by id
	public List<Team> loadTeams(int id) {
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery("from Team where user_id=:id");
		query.setInteger("id", id);
		List<Team> teams = query.list();
		
		session.close();
		
		if(teams==null) {
			return new ArrayList<Team>();
		}
		return teams;
	}
}
