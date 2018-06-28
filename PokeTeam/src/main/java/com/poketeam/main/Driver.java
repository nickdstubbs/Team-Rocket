package com.poketeam.main;

import com.poketeam.pojos.Account;
import com.poketeam.pojos.Pokemon;
import com.poketeam.pojos.Team;
import com.poketeam.utils.HibernateUtil;

public class Driver {

	public static void main(String[] args) {
//		Account account = new Account("brickdstubbs", "brickdstubbs@gmail.com", "pass", "Brick", "Stubbs");
		Account account = new Account("brickdstubbs@gmail.com", "pass");
		
		Team team1=account.getTeamByName("Team 1");
		
		Pokemon poke = team1.getPokemonByPosition(2);
		
		poke.setLevel(8);
		poke.setmove3("vine whip");
		poke.setName("Franklin");
		
		System.out.println();
		System.out.println(team1);
		System.out.println();
		
		team1.switchPokemon(1, 2);
		
		System.out.println();
		System.out.println(team1);
		System.out.println();
		
		HibernateUtil.closeSession();
	}

}
