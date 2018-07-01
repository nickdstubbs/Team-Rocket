package com.poketeam.daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.poketeam.pojos.Pokemon;
import com.poketeam.pojos.Team;
import com.poketeam.utils.HibernateUtil;

public abstract class TeamImpl extends Transactions implements TeamDao{
	Session session;
	
	//Get all of the Pokemon related to the team identified by id
	public List<Pokemon> loadPokemon(int id){
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery("from Pokemon where teamId=:id");
		query.setInteger("id", id);
		List<Pokemon> pokemon = query.list();
		session.close();
		return pokemon;
	}
	
	//Get team by id
	public Team searchTeam(int id) {
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery("from Team where teamId=:id");
		query.setInteger("id", id);
		List<Team> teams = query.list();
		if(teams.isEmpty())
			return null;
		else
			return teams.get(0);
	}

}
