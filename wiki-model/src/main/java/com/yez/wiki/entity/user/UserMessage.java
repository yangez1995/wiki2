package com.yez.wiki.entity.user;

/**
 * 用户信息类
 * @author 杨恩哲
 */
public class UserMessage {
	private int id;//用户id
	private String nickname;//昵称
	private int age;//年龄, -1为未设定
	private char sex;//性别 'm'男，'w'女，'x'未设定
	
	public UserMessage() {}
	public UserMessage(int id, String nickname, int age, char sex) {
		this.id = id;
		this.nickname = nickname;
		this.age = age;
		this.sex = sex;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public char getSex() {
		return sex;
	}
	public void setSex(char sex) {
		this.sex = sex;
	}
	@Override
	public String toString() {
		return "UserMessage [id=" + id + ", nickname=" + nickname + ", age=" + age + ", sex=" + sex + "]";
	}
}
