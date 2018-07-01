package com.poketeam.pojos;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.swing.plaf.synth.SynthSeparatorUI;

import org.hibernate.event.spi.EvictEvent;

import com.poketeam.daos.TeamImpl;

@Entity
@Table
public class Team extends TeamImpl{
	
	//Connect to the database
	@Id
	@Column(name="team_id")
	private int teamId;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="team_name")
	private String teamName;
	
	@Column
	private String visibility;
	
	@Transient
	@OneToMany(mappedBy="")
	private List<Pokemon> pokemon;

	//Constructor
	
	public Team() {
		super();
	}
	
	public Team(int id) {
		Team team = searchTeam(id);
		this.userId=team.getuserId();
		this.teamName=team.getTeamName();
		this.visibility=team.getVisibility();
		this.teamId=team.getTeamId();
		this.pokemon=loadPokemon(teamId);
	}
	
	public Team(int userId, String teamName, String visibility) {
		super();
		this.userId = userId;
		this.teamName = teamName;
		this.visibility = visibility;
	}
	
	//Mehtods
	
	public void addPokemon(int pokeId, String name, int level, String move_1, String move_2, String move_3, String move_4, int teamId) {
		if(pokemon==null || pokemon.size()<6) {
			int position=1;
			if(pokemon!=null) {
				position=pokemon.size()+1;
			}
			Pokemon poke=new Pokemon(pokeId, name, level, move_1, move_2, move_3, move_4, position, teamId);
			
			poke.save();
			pokemon=loadPokemon(this.teamId);
		}
	}
	
	public void removePokemon(int pos) {
		Pokemon remove=null;
		for(Pokemon poke : pokemon) {
			if(poke.getPosition()==pos) {
				remove=poke;
				break;
			}
		}
		if(remove!=null) {
			pokemon.remove(remove);
			remove.delete();
		}
	}
	
	//Changes the position of one pokemon to that of another within the same team
	public void switchPokemon(int pos1, int pos2) {
		Pokemon poke1=getPokemonByPosition(pos1);
		Pokemon poke2=getPokemonByPosition(pos2);
		try {
			Method setPosition = poke1.getClass().getDeclaredMethod("setPosition", int.class);	
			setPosition.setAccessible(true);
			setPosition.invoke(poke1, pos2);
			setPosition.invoke(poke2, pos1);
			
			poke1.evict();
			poke2.merge();
			poke1.update();
			
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public Pokemon getPokemonById(int id) {
		Pokemon returnPoke=null;
		for(Pokemon poke : pokemon) {
			if(poke.getId()==id) {
				returnPoke=poke;
				break;
			}
		}
		return returnPoke;
	}
	
	public Pokemon getPokemonByPosition(int pos) {
		Pokemon returnPoke=null;
		for(Pokemon poke : pokemon) {
			if(poke.getPosition()==pos) {
				returnPoke=poke;
				break;
			}
		}
		return returnPoke;
	}

	
	//Getters and Setters
	public List<Pokemon> getPokemon() {
		return pokemon;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
		this.merge();
	}

	public int getTeamId() {
		return teamId;
	}

	public int getuserId() {
		return userId;
	}

	public String getVisibility() {
		return visibility;
	}

	public void setVisibility(String visibility) {
		this.visibility = visibility;
		this.merge();
	}
	
	public void setPokemon(List<Pokemon> pokemon) {
		this.pokemon=pokemon;
	}

	//Override hashcode, equals, and toString
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((pokemon == null) ? 0 : pokemon.hashCode());
		result = prime * result + teamId;
		result = prime * result + ((teamName == null) ? 0 : teamName.hashCode());
		result = prime * result + userId;
		result = prime * result + ((visibility == null) ? 0 : visibility.hashCode());
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
		Team other = (Team) obj;
		if (pokemon == null) {
			if (other.pokemon != null)
				return false;
		} else if (!pokemon.equals(other.pokemon))
			return false;
		if (teamId != other.teamId)
			return false;
		if (teamName == null) {
			if (other.teamName != null)
				return false;
		} else if (!teamName.equals(other.teamName))
			return false;
		if (userId != other.userId)
			return false;
		if (visibility == null) {
			if (other.visibility != null)
				return false;
		} else if (!visibility.equals(other.visibility))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Team [teamId=" + teamId + ", userId=" + userId + ", teamName=" + teamName + ", visibility="
				+ visibility + ", pokemon=" + pokemon + "]";
	}

	
	
	
	
}
