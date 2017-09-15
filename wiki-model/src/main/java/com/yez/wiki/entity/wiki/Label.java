package com.yez.wiki.entity.wiki;

public class Label {
	private int id;
	private int wikiId;
	private int serNum;
	private String name;
	private String content;
	
	public Label() {}
	public Label(int id, int wikiId, int serNum, String name, String content) {
		this.id = id;
		this.wikiId = wikiId;
		this.serNum = serNum;
		this.name = name;
		this.content = content;
	}
	
	public boolean same(Label label) {
		if(this.serNum == label.getSerNum() && this.name.equals(label.getName()) && this.content.equals(label.getContent())) {
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
	public int getWikiId() {
		return wikiId;
	}
	public void setWikiId(int wikiId) {
		this.wikiId = wikiId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getSerNum() {
		return serNum;
	}
	public void setSerNum(int serNum) {
		this.serNum = serNum;
	}
	@Override
	public String toString() {
		return "Label [id=" + id + ", wikiId=" + wikiId + ", serNum=" + serNum + ", name=" + name + ", content="
				+ content + "]";
	}
}
