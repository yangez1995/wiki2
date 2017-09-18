package com.yez.wiki.entity.wiki;

import java.util.List;

public class Wiki {
	protected int id;//ID
	protected String mainTitle;//主标题
	protected String synonymTitle;//同义词标题
	protected String subTitle;//副标题
	protected String describe;//描述
	protected List<Label> labels;//标签列表
	protected List<String> gene;//标识基因列表
	protected List<Chapter> chapters;//章节列表
	protected char level;//wiki完善级别
	protected int version;//当前版本
	protected int createBy;//创建人id
	protected String creatDate;//创建时间
	
	public char getLevel() {
		return level;
	}
	public void setLevel(char level) {
		this.level = level;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMainTitle() {
		return mainTitle;
	}
	public void setMainTitle(String mainTitle) {
		this.mainTitle = mainTitle;
	}
	public String getSynonymTitle() {
		return synonymTitle;
	}
	public void setSynonymTitle(String synonymTitle) {
		this.synonymTitle = synonymTitle;
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
	public List<Label> getLabels() {
		return labels;
	}
	public void setLabels(List<Label> labels) {
		this.labels = labels;
	}
	public List<String> getGene() {
		return gene;
	}
	public void setGene(List<String> gene) {
		this.gene = gene;
	}
	public List<Chapter> getChapters() {
		return chapters;
	}
	public void setChapters(List<Chapter> chapters) {
		this.chapters = chapters;
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
	public String getCreatDate() {
		return creatDate;
	}
	public void setCreatDate(String creatDate) {
		this.creatDate = creatDate;
	}
	
}
