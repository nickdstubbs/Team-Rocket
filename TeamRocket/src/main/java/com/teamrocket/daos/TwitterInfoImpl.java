package com.teamrocket.daos;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.teamrocket.pojos.TwitterInfo;
import com.teamrocket.utils.HibernateUtil;

public class TwitterInfoImpl extends Transactions{

	public TwitterInfo getTwitterInfoById(int id) {
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery("from TwitterInfo where userId=:id");
		query.setInteger("id", id);
		List<TwitterInfo> twits = query.list();
		
		session.close();
		
		if(twits.size()>0) {
			return twits.get(0);
		}
		else {
			System.out.println("Returning null");
			return null;
		}
	}
	
}
