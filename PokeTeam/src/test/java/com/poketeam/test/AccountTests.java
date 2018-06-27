package com.poketeam.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.poketeam.pojos.Account;

public class AccountTests {

	@Test
	public void usernameLoginTest() {
		Account account = new Account().login("nickdstubbs", "solo60");
		assertNotNull(account);
		
		account = new Account().login("dick", "polo");
		assertNull(account);
	}
	
	@Test
	public void emailLoginTest() {
		Account account = new Account();
		account = account.login("nickdstubbs", "solo60");
		assertNotNull(account);
		
		account = account.login("dick", "polo");
		assertNull(account);
	}
	
	@Test
	public void signUpTest() {
		Account account = new Account().signUp("nickdstubbs","nickdstubbs@gmail.com", "solo60", "Nick", "Stubbs");
		assertNotNull(account);
		
		account = new Account().signUp("nickdstubbs", "solo", "nick@gmail.com", "Nick", "Stubbs");
		assertNull(account);
		
		account = new Account().signUp("George", "solo", "nickdstubbs.com", "George", "OfTheJungle");
		assertNull(account);
	}

}
