package com.yez.wiki.factory;

import com.yez.wiki.entity.security.GrantedAuthorityImpl;

public class GrantedAuthorityFactory {
	public static GrantedAuthorityImpl product(String authority) {
		return new GrantedAuthorityImpl(authority);
	}
}
