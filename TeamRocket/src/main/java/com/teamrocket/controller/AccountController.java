package com.teamrocket.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teamrocket.pojos.Account;
import com.teamrocket.pojos.Pokemon;
import com.teamrocket.pojos.Team;

@Controller
public class AccountController {

	@Autowired
	Account account;
	
	//Retrieve all accounts
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/accounts")
	@ResponseBody
	public String getAccounts() {
		List<Account> accounts =new Account().getAccounts();
		return formatAccounts(accounts);
	}
	
	//Retrieve one account if exists
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/login")
	@ResponseBody
	public String login(@RequestParam("username") String username, @RequestParam("password") String password) {
		return formatAccount(account.login(username, password));
	}
	
	//Sign up with a new account if credientials are available
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/signup")
	@ResponseBody
	public String signup(@RequestParam("username") String username, @RequestParam("email") String email, @RequestParam("password") String password){
		
		Account newAccount = account.signUp(username, email, password);
		
		return formatAccount(newAccount);
	}
	
	//Add team to logged account
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/addTeams")
	@ResponseBody
	public Team addTeam(@RequestParam("userId") int userId, @RequestParam("teamName") String teamName, @RequestParam("visibility") String visibility) {
		account=new Account(userId);
		account.addTeam(teamName, visibility);
		
		return account.getTeamByName(teamName);
	}
	
	//Add pokemon to team
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/addPokemon")
	@ResponseBody
	public Pokemon addPokemon(@RequestParam("pokedexId") int pokedexId, @RequestParam("name") String name, @RequestParam("level") int level, 
	@RequestParam("move1") String move1, @RequestParam("move2") String move2, @RequestParam("move3") String move3, 
	@RequestParam("move4") String move4, @RequestParam("teamId") int teamId, @RequestParam("position") int position) {
		Team team = new Team(teamId);
		team.addPokemon(pokedexId, name, level, move1, move2, move3, move4, teamId);
		
		return team.getPokemonByPosition(position);
	}
	
	//Get Teams for logged in account
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/getTeams")
	@ResponseBody
	public List<Team> getTeams(@RequestParam("userId") int id) {
		account=new Account(id);
		System.out.println(account.getTeams());
		return account.getTeams();
	}
	
	//Delete Team
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/deleteTeam")
	@ResponseBody
	public String removeTeam(@RequestParam("teamId") int teamId, @RequestParam("userId") int userId) {
		account = new Account(userId);
		
		account.removeTeamById(teamId);
		
		Team team = account.getTeamById(teamId);
		if(team==null) {
			return "Team deleted successfully";
		}
		else {
			return "Team did not delete";
		}
	}
	
	//Get Public Teams for non logged account
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/getOtherTeams")
	@ResponseBody
	public List<Team> getOthersTemas(@RequestParam("userId") int userId){
		account = new Account(userId);
		return account.getPulbicTeams();
	}
	
	
	//Change a users account information
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/changeAccount")
	@ResponseBody
	public String changeAccount(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email, @RequestParam("userId") int userId) {
		account= new Account(userId);
		account.setEmail(email);
		account.setPassword(password);
		account.setUsername(username);
		
		return formatAccount(account);
	}
	
	//Change a teams information
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/changeTeam")
	@ResponseBody
	public Team changeTeam(@RequestParam("teamId") int teamId, @RequestParam("teamName") String teamName, @RequestParam("visibility") String visibility, @RequestParam("userId") int userId) {
		account = new Account(userId);
		Team team = account.getTeamById(teamId);
		
		team.setTeamName(teamName);
		team.setVisibility(visibility);
		
		return team;
	}
	
	//Change a Pokemon's info
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/changePokemon")
	@ResponseBody
	public Pokemon changePokemon(@RequestParam("id") int id, @RequestParam("teamId") int teamId, @RequestParam("name") String name, @RequestParam("level") int level, @RequestParam("move1") String move1,
			@RequestParam("move2") String move2, @RequestParam("move3") String move3, @RequestParam("move4") String move4) {
		Team team = new Team(teamId);
		Pokemon pokemon = team.getPokemonById(id);
		
		pokemon.setLevel(level);
		pokemon.setmove1(move1);
		pokemon.setmove2(move2);
		pokemon.setmove3(move3);
		pokemon.setmove4(move4);
		pokemon.setName(name);
		
		return pokemon;
	}
	
	
	//Methods for converting Information to JSON
	
	private String formatAccounts(List<Account> accounts) {
		String json="[";
		for(Account account : accounts) {
			json+="{";
			json+=quote()+"user_id"+quote()+":"+quote()+account.getUser_id()+quote()+",";
			json+=quote()+"username"+quote()+":"+quote()+account.getUsername()+quote()+",";
			json+=quote()+"email"+quote()+":"+quote()+account.getEmail()+quote()+",";
			json+=quote()+"password"+quote()+":"+quote()+account.getPassword()+quote();
			json+="},";
		}
		json=json.substring(0,json.length()-2)+"}]";
		
		return json;
	}
	
	private String formatAccount(Account account) {
		String json="";
		json+="{";
		json+=quote()+"user_id"+quote()+":"+quote()+account.getUser_id()+quote()+",";
		json+=quote()+"username"+quote()+":"+quote()+account.getUsername()+quote()+",";
		json+=quote()+"email"+quote()+":"+quote()+account.getEmail()+quote()+",";
		json+=quote()+"password"+quote()+":"+quote()+account.getPassword()+quote();
		json+="}";
		
		return json;
	}
	
	private String quote() {
		return "\"";
	}
}
