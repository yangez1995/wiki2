package com.yez.wiki.factory;

import com.yez.wiki.entity.user.Role;

public class RoleFactory {
	public static Role product() {
		return new Role();
	}
	
	public static Role product(String name, String describe) {
		return new Role(name, describe);
	}
	
	public static Role product(int id, String name, String describe) {
		return new Role(id, name, describe);
	}
}
