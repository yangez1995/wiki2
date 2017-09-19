package com.yez.wiki.entity.user;

import java.util.Date;

/**
 * 用户帐号类
 * @author 杨恩哲
 */
public class UserAccount {
	private int id;//用户id,主键
	private String username;//用户名
	private String password;//密码
	private boolean locked;//用户锁定
	private Date registDate;//注册日期
	private Date lastLoginTime;//最后登录日期
	
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
	public boolean getLocked() {
		return locked;
	}
	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	public Date getRegistDate() {
		return registDate;
	}
	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}
	public Date getLastLoginTime() {
		return lastLoginTime;
	}
	public void setLastLoginTime(Date logTime) {
		this.lastLoginTime = logTime;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "UserAccount [id=" + id + ", username=" + username + ", locked=" + locked + ", registDate=" + registDate
				+ ", lastLoginTime=" + lastLoginTime + "]";
	}
}
