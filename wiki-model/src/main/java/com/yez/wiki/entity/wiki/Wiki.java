package com.yez.wiki.entity.wiki;

import java.util.Date;

public class Wiki {
	protected int id;//ID
	protected String title;//标题
	protected String synonym;//同义词
	protected String subTitle;//副标题
	protected String describe;//描述
	protected int level;//wiki完善级别
	protected int version;//版本号
	protected int createBy;//创建人id
	protected Date createDate;//创建时间
	protected int category;//类型
	
	public Wiki() {}
	public Wiki(String title, String subTitle, String describe, 
			int category, int createBy, Date createDate) {
		this.title = title;
		this.subTitle = subTitle;
		this.describe = describe;
		this.category = category;
		this.createBy = createBy;
		this.createDate= createDate;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSynonym() {
		return synonym;
	}
	public void setSynonym(String synonym) {
		this.synonym = synonym;
	}
	public String getSubTitle() {
		return subTitle;
	}
	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public int getCreateBy() {
		return createBy;
	}
	public void setCreateBy(int createBy) {
		this.createBy = createBy;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
}
