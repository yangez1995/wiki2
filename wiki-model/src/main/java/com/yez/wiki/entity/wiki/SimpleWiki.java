package com.yez.wiki.entity.wiki;

import java.util.List;

public class SimpleWiki extends Wiki {
	private List<String> gene;//标识基因列表
	private Chapter chapter;//章节
	
	public List<String> getGene() {
		return gene;
	}
	public void setGene(List<String> gene) {
		this.gene = gene;
	}
	public Chapter getChapter() {
		return chapter;
	}
	public void setChapter(Chapter chapter) {
		this.chapter = chapter;
	}
}
