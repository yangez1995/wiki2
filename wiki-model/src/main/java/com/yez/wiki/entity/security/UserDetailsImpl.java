package com.yez.wiki.entity.security;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;
	private int id;//用户id,主键
	private String username;//用户名
	private String password;//密码
	private boolean locked;//帐号锁定
	private Date logTime;//最后登陆时间
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
	public boolean getLocked() {
		return locked;
	}
	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	public Date getLogTime() {
		return logTime;
	}
	public void setLogTime(Date logTime) {
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
	 * @return {@code true} 如果没有过期
	 */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	/**
	 * 判断用户帐号是否被锁定
	 * @return {@code true} 如果没有被锁定
	 */
	@Override
	public boolean isAccountNonLocked() {
		return !locked;
	}
	
	/**
	 * 判断证书是否过期
	 * @return {@code true} 如果没有过期
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * 判断用户是否被激活
	 * @return {@code true} 如果已经激活
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
