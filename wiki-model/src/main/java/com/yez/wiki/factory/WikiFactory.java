package com.yez.wiki.factory;

import java.util.Date;

import com.yez.wiki.entity.wiki.Wiki;

public class WikiFactory {
	public static Wiki product() {
		return new Wiki();
	}
	
	public static Wiki product(String title, String subTitle, String describe, 
			int category, int createBy, Date createDate) {
		return new Wiki(title, subTitle, describe, category, createBy, createDate);
	}
}
