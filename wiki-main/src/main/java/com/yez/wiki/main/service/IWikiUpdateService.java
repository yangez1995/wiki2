package com.yez.wiki.main.service;

import java.util.List;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Chapter;
import com.yez.wiki.entity.wiki.Label;
import com.yez.wiki.entity.wiki.StandardWiki;

public interface IWikiUpdateService {
	public ResponseMessage cardUpdate(StandardWiki wiki);
	public ResponseMessage updateLabels(List<Label> list);
	public ResponseMessage updateCatals(List<Chapter> list);
	public ResponseMessage updateChapter(Chapter chapter);
}
