package com.yez.wiki.main.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.yez.wiki.entity.wiki.Chapter;
import com.yez.wiki.entity.wiki.ChildChapter;
import com.yez.wiki.entity.wiki.Label;

public interface WikiUpdateMapper {
	public int getWikiVersion(@Param("id")int id);
	public void wikiUpgrade(@Param("id")int id);
	public void insertWikiHistory(Map<String, Object> map);
	
	public void cardUpdate(Map<String, Object> map);
	public Map<String, Object> getWikiCard(@Param("id")int id);
	public int getCardVersion(@Param("wikiId")int wikiId);
	public void insertCardHistory(Map<String, Object> map);
	
	public List<Label> getWikiLabels(@Param("wikiId")int wikiId);
	public void updateLabel(Label label);
	public void insertLabel(Label label);
	public void deleteLabel(Map<String, Object> map);
	public int selectLabelVersion(@Param("labelId")int labelId);
	public void insertLabelHistory(Map<String, Object> map);
	
	public List<Chapter> getWikiChapters(@Param("wikiId")int wikiId);
	public void updateCatal(Chapter chapter);
	public void insertCatal(Chapter chapter);
	public void deleteCatal(Map<String, Object> map);
	public int selectChapterVersion(@Param("chapterId")int chapterId);
	public void insertChapterHistory(Map<String, Object> map);
	
	public Chapter getChapter(@Param("id")int id);
	public void updateChapter(Chapter chapter);
	public void updateChildChapter(ChildChapter child);
	public void insertChildChapter(ChildChapter child);
	public void deleteChildChapter(Map<String, Object> map);
	public void insertChildHistory(Map<String, Object> map);
}
