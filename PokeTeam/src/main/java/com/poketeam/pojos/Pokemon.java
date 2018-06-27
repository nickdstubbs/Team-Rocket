package com.poketeam.pojos;

import javax.persistence.*;

import com.poketeam.daos.PokemonImpl;

@Entity
@Table
public class Pokemon extends PokemonImpl{
	
	//Connect to database
	@Id
	@Column
	private int id;
	
	@Column(name="poke_id")
	private int pokeId;
	
	@Column
	private String name;
	
	@Column(name="p_level")
	private int level;
	
	@Column
	private String move1;
	
	@Column
	private String move2;
	
	@Column
	private String move3;
	
	@Column
	private String move4;
	
	@Column
	private int position;
	
	@Column(name="team_id")
	private int teamId;

	//Constructors
	
	public Pokemon() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Pokemon(int pokeId, String name, int level, String move1, String move2, String move3, String move4,
			int position, int team) {
		super();
		this.pokeId = pokeId;
		this.name = name;
		this.level = level;
		this.move1 = move1;
		this.move2 = move2;
		this.move3 = move3;
		this.move4 = move4;
		this.position = position;
		this.teamId = team;
	}
	
	//Getters and Setters

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
		merge();
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
		merge();
	}

	public String getmove1() {
		return move1;
	}

	public void setmove1(String move1) {
		this.move1 = move1;
		merge();
	}

	public String getmove2() {
		return move2;
	}

	public void setmove2(String move2) {
		this.move2 = move2;
		merge();
	}

	public String getmove3() {
		return move3;
	}

	public void setmove3(String move3) {
		this.move3 = move3;
		merge();
	}

	public String getmove4() {
		return move4;
	}

	public void setmove4(String move4) {
		this.move4 = move4;
		merge();
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
		merge();
	}

	public int getId() {
		return id;
	}

	public int getPokeId() {
		return pokeId;
	}

	public int getTeamId() {
		return teamId;
	}

	//Override hashCode, equals, and toString
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + level;
		result = prime * result + ((move1 == null) ? 0 : move1.hashCode());
		result = prime * result + ((move2 == null) ? 0 : move2.hashCode());
		result = prime * result + ((move3 == null) ? 0 : move3.hashCode());
		result = prime * result + ((move4 == null) ? 0 : move4.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + pokeId;
		result = prime * result + position;
		result = prime * result + teamId;
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
		Pokemon other = (Pokemon) obj;
		if (id != other.id)
			return false;
		if (level != other.level)
			return false;
		if (move1 == null) {
			if (other.move1 != null)
				return false;
		} else if (!move1.equals(other.move1))
			return false;
		if (move2 == null) {
			if (other.move2 != null)
				return false;
		} else if (!move2.equals(other.move2))
			return false;
		if (move3 == null) {
			if (other.move3 != null)
				return false;
		} else if (!move3.equals(other.move3))
			return false;
		if (move4 == null) {
			if (other.move4 != null)
				return false;
		} else if (!move4.equals(other.move4))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (pokeId != other.pokeId)
			return false;
		if (position != other.position)
			return false;
		if (teamId != other.teamId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Pokemon [id=" + id + ", pokeId=" + pokeId + ", name=" + name + ", level=" + level + ", move1=" + move1
				+ ", move2=" + move2 + ", move3=" + move3 + ", move4=" + move4 + ", position=" + position
				+ ", team=" + teamId + "]";
	}

	
	
	
}
