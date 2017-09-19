package com.yez.wiki.entity.wiki;

import java.util.List;

public class StandardWiki extends Wiki{
	protected List<Label> labels;//标签列表
	protected List<String> gene;//标识基因列表
	protected List<Chapter> chapters;//章节列表
	
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
}
