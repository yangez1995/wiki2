package com.yez.wiki.factory;

import com.yez.wiki.entity.user.Authority;

public class AuthorityFactory {
	public static Authority product() {
		return new Authority();
	}
	
	public static Authority product(String name, String mark, String describe) {
		return new Authority(name, mark, describe);
	}
	
	public static Authority product(int id, String name, String mark, String describe) {
		return new Authority(id, name, mark, describe);
	}
}
