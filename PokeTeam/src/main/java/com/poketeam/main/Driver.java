package com.poketeam.main;

import com.poketeam.pojos.Account;
import com.poketeam.pojos.Pokemon;
import com.poketeam.pojos.Team;
import com.poketeam.utils.HibernateUtil;

public class Driver {

	public static void main(String[] args) {
//		Account account = new Account("dickdstubbs", "dickdstubbs@gmail.com", "pass", "Nick", "Stubbs");
		Account account = new Account("nickdstubbs", "pass");
		Team t2 = account.getTeamByName("Team 2");
		
//		t2.addPoke(1, "bulbasaur", 7, "tackle", "growl", null, null, t2.getTeam_id());
//		t2.addPoke(7, "charmander", 7, "tackle", "growl", null, null, t2.getTeam_id());
		
		System.out.println(t2);
		
		t2.switchPokemon(1, 2);
		
		System.out.println(t2);
		
		HibernateUtil.closeSession();
	}

}
