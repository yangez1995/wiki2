package com.yez.wiki.entity.security;

import org.springframework.security.access.ConfigAttribute;

public class ConfigAttributeImpl implements ConfigAttribute {
	private static final long serialVersionUID = 1L;
	private String attribute;
	
	public ConfigAttributeImpl() {}
	public ConfigAttributeImpl(String attribute) {
		this.attribute = attribute;
	}


	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	@Override
	public String getAttribute() {
		return attribute;
	}

}
