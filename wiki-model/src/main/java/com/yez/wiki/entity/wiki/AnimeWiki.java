package com.yez.wiki.entity.wiki;

import java.util.List;

public class AnimeWiki extends Wiki{
	private AnimeSource source;//评分数据
	private List<Label> labels;//标签列表
	private List<String> gene;//标识基因列表
	private List<Chapter> chapters;//章节列表
	
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
	public AnimeSource getSource() {
		return source;
	}
	public void setSource(AnimeSource source) {
		this.source = source;
	}
}
