package com.teamrocket.daos;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.teamrocket.utils.HibernateUtil;

public abstract class Transactions {
	
	//Persist new object
	public void save() {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.save(this);
		tx.commit();
		session.close();
	}
	
	//Detach object
	public void evict() {
		Session session = HibernateUtil.getSession();
		session.evict(this);
		session.close();
	}
	
	//Update detached object
	public void update() {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.update(this);
		tx.commit();
		session.close();
	}
	
	//Update persisted object
	public void merge() {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.merge(this);
		tx.commit();
		session.close();
	}
	
	//Remove object from database
	public void delete() {
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		session.delete(this);
		tx.commit();
		session.close();
	}
}
