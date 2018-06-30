package com.teamrocket.main;

import com.teamrocket.pojos.Account;
import com.teamrocket.pojos.Pokemon;
//import com.teamrocket.pojos.Team;
import com.teamrocket.utils.HibernateUtil;

public class Driver {

	public static void main(String[] args) {
//		Account account = new Account("brickdstubbs", "brickdstubbs@gmail.com", "pass", "Brick", "Stubbs");
		Account account = new Account("brickdstubbs@gmail.com", "pass");
		
		System.out.println(account.getAccounts());
		
		HibernateUtil.closeSession();
	}

}
