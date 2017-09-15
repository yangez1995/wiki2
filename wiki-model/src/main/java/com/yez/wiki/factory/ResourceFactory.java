package com.yez.wiki.factory;

import com.yez.wiki.entity.user.Resource;

public class ResourceFactory {
	public static Resource product() {
		return new Resource();
	}
	
	public static Resource product(String name, String type, String url, String describe) {
		return new Resource(name, type, url, describe);
	}
	
	public static Resource product(int id, String name, String type, String url, String describe) {
		return new Resource(id, name, type, url, describe);
	}
}
