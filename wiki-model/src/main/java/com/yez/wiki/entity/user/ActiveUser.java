package com.yez.wiki.entity.user;

public class ActiveUser {
	private int id;
	private int number;
	private String date;
	
	public ActiveUser() {}
	public ActiveUser(int number, String date) {
		this.number = number;
		this.date = date;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	@Override
	public String toString() {
		return "ActiveUser [id=" + id + ", number=" + number + ", date=" + date + "]";
	}
}
