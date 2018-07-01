package com.teamrocket.daos;

import java.util.List;

import com.teamrocket.pojos.Pokemon;
import com.teamrocket.pojos.Team;

public interface TeamDao {
	
	public List<Pokemon> loadPokemon(int id);

}
