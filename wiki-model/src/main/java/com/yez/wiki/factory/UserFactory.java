package com.yez.wiki.factory;

import com.yez.wiki.entity.user.UserAccount;

public class UserFactory {
	public static UserAccount userAccount() {
		return new UserAccount();
	}
	
	public static UserAccount userAccount(String username, String password) {
		return new UserAccount(username, password);
	}
}
