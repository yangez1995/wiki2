package com.yez.wiki.factory;

import com.yez.wiki.entity.security.UserDetailsImpl;

public class UserDetailsFactory {
	public static UserDetailsImpl product() {
		return new UserDetailsImpl();
	}
}
