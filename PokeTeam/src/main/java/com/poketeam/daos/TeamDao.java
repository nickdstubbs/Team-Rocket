package com.poketeam.daos;

import java.util.List;

import com.poketeam.pojos.Pokemon;
import com.poketeam.pojos.Team;

public interface TeamDao {
	
	public List<Pokemon> loadPokemon(int id);

}
