package com.yez.wiki.factory;

import com.yez.wiki.entity.user.UserMessage;

public class UserMessageFactory {
	public static UserMessage product() {
		return new UserMessage();
	}
	
	public static UserMessage product(int id, String nickname) {
		return new UserMessage(id, nickname);
	}
} 
