package com.yez.wiki.entity.wiki;

import java.util.List;

public class AnimeWiki extends Wiki{
	private double source;//评分
	private double picture;//画质
	private double storyboard;//分镜
	private double music;//音乐
	private double akira;//声优
	private double plot;//剧情
	private double hot;//热度
	private List<Label> labels;//标签列表
	private List<String> gene;//标识基因列表
	private List<Chapter> chapters;//章节列表
	
	public double getSource() {
		return source;
	}
	public void setSource(double source) {
		this.source = source;
	}
	public double getPicture() {
		return picture;
	}
	public void setPicture(double picture) {
		this.picture = picture;
	}
	public double getStoryboard() {
		return storyboard;
	}
	public void setStoryboard(double storyboard) {
		this.storyboard = storyboard;
	}
	public double getMusic() {
		return music;
	}
	public void setMusic(double music) {
		this.music = music;
	}
	public double getAkira() {
		return akira;
	}
	public void setAkira(double akira) {
		this.akira = akira;
	}
	public double getPlot() {
		return plot;
	}
	public void setPlot(double plot) {
		this.plot = plot;
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
	public double getHot() {
		return hot;
	}
	public void setHot(double hot) {
		this.hot = hot;
	}
}
