package com.teamrocket.controller;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teamrocket.pojos.Account;
import com.teamrocket.pojos.Pokemon;
import com.teamrocket.pojos.Team;
import com.teamrocket.pojos.TwitterInfo;

import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;

@Controller
public class AccountController {

	@Autowired
	Account account;
	
	@Autowired
	HttpSession session;
	
	//Retrieve all accounts
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/accounts")
	@ResponseBody
	public String getAccounts() {
		List<Account> accounts =new Account().getAccounts();
		return formatAccounts(accounts);
	}
	
	//Retrieve one account if exists (Login)
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/login")
	@ResponseBody	
	public String login(@RequestParam("username") String username, @RequestParam("password") String password) {
		account=account.login(username, password);
		if(account!=null) {
			session.setAttribute("loggedIn", account);
			return formatAccount(account);
		}
		else {
			return null;
		}
		
	}
	
	//End HttpSession
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/logout")
	@ResponseBody
	public void logout() {
		session.invalidate();
	}
	
	//Sign up with a new account if credientials are available
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/signup")
	@ResponseBody
	public String signup(@RequestParam("username") String username, @RequestParam("email") String email, @RequestParam("password") String password){
		
		Account newAccount = account.signUp(username, email, password);
		
		if(newAccount!=null) {
			session.setAttribute("loggedIn", newAccount);
		}
		return formatAccount(newAccount);
	}
	
	//Add team to logged account
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/teams/add")
	@ResponseBody
	public Team addTeam(@RequestParam("teamName") String teamName, @RequestParam("visibility") String visibility) {
		account=(Account) session.getAttribute("loggedIn");
		account.addTeam(teamName, visibility);
			
		return account.getTeamByName(teamName);
	}
	
	//Add pokemon to team
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/pokemon/add")
	@ResponseBody
	public Pokemon addPokemon(@RequestParam("pokedexId") int pokedexId, @RequestParam("name") String name, @RequestParam("level") int level, @RequestParam("teamId") int teamId, @RequestParam("position") int position) {
		account=(Account) session.getAttribute("loggedIn");
		Team team = account.getTeamById(teamId);
		team.addPokemon(pokedexId, name, level, null, null, null, null, teamId);
			
		return team.getPokemonByPosition(position);
	}
	
	//Get Teams for logged in account
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/teams")
	@ResponseBody
	public List<Team> getTeams() {
		account = (Account) session.getAttribute("loggedIn");
			return account.getTeams();
	}
	
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team")
	@ResponseBody
	public Team getLoggedInTeam(@RequestParam("teamId") int teamId) {
		account = (Account) session.getAttribute("loggedIn");
		return account.getTeamById(teamId);
	}
	
	//Delete Team
	@DeleteMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/delete")
	@ResponseBody
	public String removeTeam(@RequestParam("teamId") int teamId) {
		account = (Account) session.getAttribute("loggedIn");
			
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
	@GetMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/accounts/team")
	@ResponseBody
	public List<Team> getPublicTeamsById(@RequestParam("userId") int userId){
		account=new Account().accountById(userId);
		List<Team> teams = account.getTeams();
		for(Team team : account.getTeams()) {
			if(team.getVisibility()=="Public") {
				team.setPokemon(team.loadPokemon(team.getTeamId()));
				teams.add(team);
			}
		}
		return teams;
	}
	
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
	public String changeAccount(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email) {
		account= (Account) session.getAttribute("loggedIn");
		account.setEmail(email);
		account.setPassword(password);
		account.setUsername(username);
			
		return formatAccount(account);
	}
	
	//Change a teams information
	@PutMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/change-info")
	@ResponseBody
	public Team changeTeam(@RequestParam("teamId") int teamId, @RequestParam("teamName") String teamName, @RequestParam("visibility") String visibility) {
		account= (Account) session.getAttribute("loggedIn");
		Team team = account.getTeamById(teamId);
			
		team.setTeamName(teamName);
		team.setVisibility(visibility);
			
		return team;
	}
	
	@DeleteMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/team/pokemon/delete")
	@ResponseBody
	public String deletePokemon(@RequestParam("teamId") int teamId, @RequestParam("position") int position) {
		account = (Account) session.getAttribute("loggedIn");
		if(account!=null) {
			Team team = account.getTeamById(teamId);
			team.setPokemon(team.loadPokemon(team.getTeamId()));
			team.removePokemon(position);
			
			String result = "";
			team.loadPokemon(teamId);
			if(team.getPokemonByPosition(position)==null) {
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
	public Pokemon changePokemon(@RequestParam("id") int id, @RequestParam("teamId") int teamId, @RequestParam("name") String name, @RequestParam("level") int level) {
		
		account = (Account) session.getAttribute("loggedIn");
		Team team = account.getTeamById(teamId);
		Pokemon pokemon = team.getPokemonById(id);
			
		pokemon.setLevel(level);
		pokemon.setName(name);
			
		return pokemon;
		
	}
	
	
	
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/post-tweet")
	@ResponseBody
	public String postTweet(@RequestParam("message") String message) {
		Twitter twitter = TwitterFactory.getSingleton();
		account = (Account) session.getAttribute("loggedIn");
		
		//Check to see if the consumer is set
		try {
			twitter.setOAuthConsumer("HtrSNuhruRDeHsj0AP12Xqj1Q", "k2JzXoZDGiNbHHc3MUchxeae3Vn9Lt1mw4zvxngTe5QiGyZ3Za");
		} catch(Exception e) {
			
		}
		
		TwitterInfo twit = new TwitterInfo(account.getUser_id());
		if(twit.getUserId()==0) {
			try {
				RequestToken rt = twitter.getOAuthRequestToken();
				String url = rt.getAuthenticationURL();
				session.setAttribute("twitter", twitter);
				session.setAttribute("message", message);
				session.setAttribute("requestToken", rt);
				return url;
			} catch (TwitterException e) {
				return "Error";
			}
		}
		return twit.post(message, twitter);
	}
	
	@PostMapping(produces=MediaType.APPLICATION_JSON_VALUE, value="/account/new-twitter")
	@ResponseBody
	public String newTwitter(@RequestParam("pin") String pin, @RequestParam(value="save", required=false) boolean save) throws TwitterException {
		Twitter twitter = (Twitter) session.getAttribute("twitter");
		RequestToken rt = (RequestToken) session.getAttribute("requestToken");
		String message = (String) session.getAttribute("message");
		
		session.removeAttribute("twitter");
		session.removeAttribute("requestToken");
		session.removeAttribute("message");
		if(twitter != null) {
			AccessToken accessToken = twitter.getOAuthAccessToken(rt, pin);
			twitter.setOAuthAccessToken(accessToken);
			TwitterInfo twit = new TwitterInfo(account.getUser_id(), accessToken.getToken(), accessToken.getTokenSecret());
			if(save) {
				twit.save();
			}
			return twit.post(message, twitter);
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
