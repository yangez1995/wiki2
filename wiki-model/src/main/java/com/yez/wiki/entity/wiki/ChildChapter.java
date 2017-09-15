package com.yez.wiki.entity.wiki;

public class ChildChapter {
	private int id;//ID
	private int parentId;//父章节ID
	private int serNum;//序号
	private String title;//标题
	private String content;//内容
	
	public ChildChapter(){}
	public ChildChapter(int id, int parentId, int serNum, String title, String content) {
		this.id = id;
		this.parentId = parentId;
		this.serNum = serNum;
		this.title = title;
		this.content = content;
	}
	
	public boolean same(ChildChapter child) {
		if(this.serNum == child.getSerNum() && this.title.equals(child.getTitle()) && this.content.equals(child.getContent())) {
			return true;
		}
		return false;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public int getSerNum() {
		return serNum;
	}
	public void setSerNum(int serNum) {
		this.serNum = serNum;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}
