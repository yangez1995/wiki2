package com.yez.wiki.entity.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;
	private int id;//用户id,primary key
	private String username;//用户名
	private String password;//密码
	private char locked;//帐号锁定
	private String logTime;//最后登陆时间
	private Collection<? extends GrantedAuthority> authorities;//用户权限集合
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	public char getLocked() {
		return locked;
	}
	public void setLocked(char locked) {
		this.locked = locked;
	}
	public String getLogTime() {
		return logTime;
	}
	public void setLogTime(String logTime) {
		this.logTime = logTime;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return username;
	}
	/**
	 * 判断用户帐号是否过期
	 * @return ture 如果没有过期
	 */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	/**
	 * 判断用户帐号是否被锁定
	 * @return true 如果没有被锁定
	 */
	@Override
	public boolean isAccountNonLocked() {
		if(locked == 't') {
			return false;
		}
		return true;
	}
	
	/**
	 * 判断证书是否过期
	 * @return true 如果没有过期
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * 判断用户是否被激活
	 * @return true 如果已经激活
	 */
	@Override
	public boolean isEnabled() {
		return true;
	}
	
	@Override
	public String toString() {
		return "UserDetailsImpl [id=" + id + ", username=" + username + ", password=" + password + ", locked=" + locked
				+ ", logTime=" + logTime + ", authorities=" + authorities + "]";
	}
}
