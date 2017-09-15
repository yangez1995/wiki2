package com.yez.wiki.entity.wiki;

import java.util.List;

import com.yez.wiki.util.StringUtil;

public class Chapter {
	private int id;//ID
	private int wikiId;//所属wikiId
	private int serNum;//序号
	private String title;//标题
	private String content;//内容
	private List<ChildChapter> childs;//子章节列表
	
	public Chapter() {}
	public Chapter(int id, int wikiId, int serNum, String title, String content) {
		this.id = id;
		this.wikiId = wikiId;
		this.serNum = serNum;
		this.title = title;
		this.content = content;
	}
	
	public boolean sameCatal(Chapter chapter) {
		if(this.serNum == chapter.getSerNum() && this.title.equals(chapter.getTitle())) {
			return true;
		}
		return false;
	}
	public boolean same(Chapter chapter) {
		if(!StringUtil.isEmpty(this.content) && this.title.equals(chapter.getTitle()) && this.content.equals(chapter.getContent())) {
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
	public List<ChildChapter> getChilds() {
		return childs;
	}
	public void setChilds(List<ChildChapter> childs) {
		this.childs = childs;
	}
}
