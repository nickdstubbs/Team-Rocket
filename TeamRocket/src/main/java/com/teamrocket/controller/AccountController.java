package com.teamrocket.controller;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.teamrocket.forms.accountChange;
import com.teamrocket.forms.addPokemonForm;
import com.teamrocket.forms.addTeamForm;
import com.teamrocket.forms.deletePokemonForm;
import com.teamrocket.forms.deleteTeamForm;
import com.teamrocket.forms.loginForm;
import com.teamrocket.forms.pokemonChange;
import com.teamrocket.forms.signupForm;
import com.teamrocket.forms.teamChange;
import com.teamrocket.forms.tweetForm;
import com.teamrocket.pojos.Account;
import com.teamrocket.pojos.Pokemon;
import com.teamrocket.pojos.Team;
import com.teamrocket.pojos.TwitterInfo;

import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;

@RestController
public class AccountController {

	@Autowired
	Account account;
	
	@Autowired
	HttpSession session;
	
	//Retrieve all accounts
	@CrossOrigin(origins="/**")
	@GetMapping(value="/accounts")
	public String getAccounts() {
		List<Account> accounts =new Account().getAccounts();
		return formatAccounts(accounts);
	}
	
	//Retrieve one account if exists (Login)
	@CrossOrigin(origins="*")
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/login")
	@ResponseBody	
	public String login(@RequestBody loginForm login) {
			account = new Account().login(login.getUsername(), login.getPassword());
			if(account!=null) {
				session.setAttribute("loggedIn", account);
				return formatAccount(account);
			}
			else {
				return formatAccount(new Account());
			}
		}
	
	//End HttpSession
	@CrossOrigin(origins="/**")
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/logout")
	@ResponseBody
	public void logout() {
		session.invalidate();
	}
	
	//Sign up with a new account if credientials are available
	@CrossOrigin(origins="*")
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/signup")
	@ResponseBody
	public String signup(@RequestBody signupForm sf){
		
		Account newAccount = account.signUp(sf.getUsername(), sf.getEmail(), sf.getPassword());
		
		if(newAccount!=null) {
			session.setAttribute("loggedIn", newAccount);
			return formatAccount(newAccount);
		}
		else {
			return formatAccount(new Account());
		}
	}
	
	//Add team to logged account
	@CrossOrigin(origins="*")
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/teams/add")
	@ResponseBody
	public Team addTeam(@RequestBody addTeamForm atf) {
		account=new Account().accountById(atf.getUserId());
		if(account!=null) {
			account.addTeam(atf.getTeamName(), atf.getVisibility());
			
			return account.getTeamByName(atf.getTeamName());
		}
		else {
			return new Team();
		}
		
	}
	
	//Add pokemon to team
	@CrossOrigin(origins="*")
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/pokemon/add")
	@ResponseBody
	public Pokemon addPokemon(@RequestBody addPokemonForm apf) {
		account=new Account().accountById(apf.getUserId());
		if(account!=null) {
			Team team = account.getTeamById(apf.getTeamId());
			team.addPokemon(apf.getPokedexId(), apf.getName(), apf.getLevel(), null, null, null, null, apf.getTeamId());
				
			return team.getPokemonByPosition(apf.getPositon());
		}
		else {
			return new Pokemon();
		}
	}
	
	@CrossOrigin(origins="/**")
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/team")
	@ResponseBody
	public Team teamById(@RequestParam("teamId") int teamId) {
		Team team = new Team().searchTeam(teamId);
		return team;
	}
	
	//Get Teams for logged in account
	@CrossOrigin(origins="/**")
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/teams")
	@ResponseBody
	public List<Team> getTeams(@RequestParam("userId") int userId) {
		account = new Account().accountById(userId);
		if(account!=null) {
			return account.getTeams();
		}
		else {
			return null;
		}
	}
	
	@CrossOrigin(origins="/**")
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team")
	@ResponseBody
	public Team getLoggedInTeam(@RequestParam("userId") int userId, @RequestParam("teamId") int teamId) {
		account = new Account().accountById(userId);
		if(account!=null) {
			return account.getTeamById(teamId);
		}
		else {
			return null;
		}
	}
	
	//Delete Team
	@DeleteMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/delete")
	@ResponseBody
	public String removeTeam(@RequestBody deleteTeamForm dtf) {
		account = new Account().accountById(dtf.getUserId());
		
		if(account!=null) {
			account.removeTeamById(dtf.getTeamId());
			
			Team team = account.getTeamById(dtf.getTeamId());
			if(team==null) {
				return "Team deleted successfully";
			}
			else {
				return "Team did not delete";
			}
		}
		else {
			return null;
		}
		
	}
	
	//Get Public Teams for non logged account
	@CrossOrigin(origins="/**")
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/accounts/team")
	@ResponseBody
	public List<Team> getPublicTeamsById(@RequestParam("userId") int userId){
		account=new Account().accountById(userId);
			List<Team> teams = account.getTeams();
			for(Team team : account.getTeams()) {
				if(team.getVisibility().equals("Private")) {
					teams.remove(team);
				}
				else {
					team.setPokemon(team.loadPokemon(team.getTeamId()));
				}
			}
			return teams;
	}
	
	@CrossOrigin(origins="/**")
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/accounts/teams")
	@ResponseBody
	public List<Team> getPublicTeams(){
		List<Team> teams = new Account().getAllPublicTeams();
		for(Team team : teams) {
			team.setPokemon(team.loadPokemon(team.getTeamId()));
		}
		return teams;
	}
	
	//Change a users account information
	@PutMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/change-info")
	@ResponseBody
	public String changeAccount(@RequestBody accountChange ac) {
		account= new Account().accountById(ac.getUserId());
		if(account!=null){
			account.setEmail(ac.getEmail());
			account.setPassword(ac.getPassword());
			account.setUsername(ac.getUsername());
				
			return formatAccount(account);
		}
		else {
			return null;
		}
	}
	
	//Change a teams information
	@PutMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/change-info")
	@ResponseBody
	public Team changeTeam(@RequestBody teamChange tc) {
		account= new Account().accountById(tc.getUserId());
		if(account!=null) {
			Team team = account.getTeamById(tc.getTeamId());
			
			team.setTeamName(tc.getTeamName());
			team.setVisibility(tc.getVisibility());
				
			return team;
		}
		else {
			return null;
		}
		
	}
	
	@DeleteMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/pokemon/delete")
	@ResponseBody
	public String deletePokemon(@RequestBody deletePokemonForm dpf) {
		account = new Account().accountById(dpf.getUserId());
		if(account!=null) {
			Team team = account.getTeamById(dpf.getTeamId());
			team.setPokemon(team.loadPokemon(team.getTeamId()));
			team.removePokemon(dpf.getPosistion());
			
			String result = "";
			team.loadPokemon(dpf.getTeamId());
			if(team.getPokemonByPosition(dpf.getPosistion())==null) {
				result="Delete successful";
			}
			else {
				result="Delete failed";
			}
			return result;
		}
		
		return null;
	}
	
	//Change a Pokemon's info
	@PutMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/pokemon/change-info")
	@ResponseBody
	public Pokemon changePokemon(@RequestBody pokemonChange pc) {
		
		account = new Account().accountById(pc.getUserId());
		if(account!=null) {
			Team team = account.getTeamById(pc.getTeamId());
			Pokemon pokemon = team.getPokemonById(pc.getPokemonId());
				
			pokemon.setLevel(pc.getLevel());
			pokemon.setName(pc.getName());
				
			return pokemon;
		}
		else {
			return null;
		}
		
	}
	
	//Methods for converting Information to JSON
	
	private String formatAccounts(List<Account> accounts) {
		String json="[";
		for(Account account : accounts) {
			json+="{";
			json+=quote()+"user_id"+quote()+":"+quote()+account.getUser_id()+quote()+",";
			json+=quote()+"username"+quote()+":"+quote()+account.getUsername()+quote()+",";
			json+=quote()+"email"+quote()+":"+quote()+account.getEmail()+quote();
			//json+=quote()+"password"+quote()+":"+quote()+account.getPassword()+quote();
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
		json+=quote()+"email"+quote()+":"+quote()+account.getEmail()+quote();
		//json+=quote()+"password"+quote()+":"+quote()+account.getPassword()+quote();
		json+="}";
		
		return json;
	}
	
	private String quote() {
		return "\"";
	}
}
