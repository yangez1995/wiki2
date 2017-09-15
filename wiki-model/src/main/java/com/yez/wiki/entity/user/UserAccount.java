package com.yez.wiki.entity.user;

/**
 * 用户帐号类
 * @author 杨恩哲
 */
public class UserAccount {
	private int id;//用户id
	private String username;//用户名
	private String password;//密码
	private char locked;//用户锁定
	private String regDate;//注册日期
	private String logTime;//最后登录日期
	
	public UserAccount() {}
	public UserAccount(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public char getLocked() {
		return locked;
	}
	public void setLocked(char locked) {
		this.locked = locked;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getLogTime() {
		return logTime;
	}
	public void setLogTime(String logTime) {
		this.logTime = logTime;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "UserAccount [id=" + id + ", username=" + username + ", locked=" + locked + ", regDate=" + regDate
				+ ", logTime=" + logTime + "]";
	}
}
