package com.yez.wiki.main.service.imp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Chapter;
import com.yez.wiki.entity.wiki.ChildChapter;
import com.yez.wiki.entity.wiki.Label;
import com.yez.wiki.entity.wiki.StandardWiki;
import com.yez.wiki.factory.ChapterFactory;
import com.yez.wiki.factory.ChildChapterFactory;
import com.yez.wiki.factory.LabelFactory;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.main.dao.WikiUpdateMapper;
import com.yez.wiki.main.service.IWikiUpdateService;
import com.yez.wiki.util.StringUtil;
@Service
public class WikiUpdateService implements IWikiUpdateService {
	@Autowired
	private WikiUpdateMapper wikiUpdateMapper;

	/**
	 * 修改wiki名片信息，包括副标题和简介。
	 * 修改后添加到wiki改动历史、名片改动历史记录中。
	 * @param wiki 封装了wiki改动信息
	 * @return 响应信息
	 */
	@Override
	public ResponseMessage cardUpdate(StandardWiki wiki) {
		//验证副标题
		if(StringUtil.isEmpty(wiki.getSubTitle())) {
			return ResponseMessage.fail("副标题不能为空！");
		}
		if(StringUtil.checkLength(wiki.getSubTitle(), 1, 30)) {
			return ResponseMessage.fail("副标题不能超过30字！");
		}
		//验证简介
		if(StringUtil.isEmpty(wiki.getDescribe())) {
			return ResponseMessage.fail("简介不能为空！");
		}
		if(StringUtil.checkLength(wiki.getDescribe(), 1, 500)) {
			return ResponseMessage.fail("简介不能超过500字！");
		}
		//获取当前名片信息
		Map<String, Object> nowCard = wikiUpdateMapper.getWikiCard(wiki.getId());
		//验证提交信息与当前信息是否相同
		if(wiki.getSubTitle().equals((String) nowCard.get("subTitle")) 
				&& wiki.getDescribe().equals((String) nowCard.get("des"))) {
			return ResponseMessage.fail("提交的信息没有做任何更改！");
		}
		//更新Wiki版本号
		wiki.setVersion(((int) nowCard.get("version")) + 1);
		
		//修改名片
		Map<String, Object> map = MapFactory.standardWikiMap(wiki);
		wikiUpdateMapper.cardUpdate(map);
		
		//记录wiki改动历史
		Map<String, Object> wikiHistory = MapFactory.wikiHistoryMap(wiki.getId(), wiki.getVersion(), "card", 1);
		wikiUpdateMapper.insertWikiHistory(wikiHistory);
		
		//记录名片改动历史
		map.put("version", wikiUpdateMapper.getCardVersion(wiki.getId()) + 1);
		map.put("historyId", wikiHistory.get("historyId"));
		wikiUpdateMapper.insertCardHistory(map);
		return ResponseMessage.success();
	}

	@Override
	public ResponseMessage updateLabels(List<Label> list) {
		//获取修改的wikiId
		int wikiId = list.get(0).getWikiId();
		//获取版本号
		int version = wikiUpdateMapper.getWikiVersion(wikiId) + 1;
		//获取当前标签列表
		List<Label> nowLabels = new LinkedList<Label>();
		nowLabels = wikiUpdateMapper.getWikiLabels(wikiId);
		
		Map<String, Object> history = new HashMap<String, Object>();
		Map<String, Object> wikiHistory = MapFactory.wikiHistoryMap(wikiId, version, "label", 1);
		boolean isChange = false;
		
		for(Label label : list) {
			if(label.getId() == 0) {
				wikiUpdateMapper.insertLabel(label);
				if(!isChange) {
					wikiUpdateMapper.insertWikiHistory(wikiHistory);
					history.put("historyId", wikiHistory.get("historyId"));
					isChange = true;
				}
				history.putAll(LabelFactory.decomposeHistory(label));
				history.put("labelId", label.getId());
				history.put("changeType", 1);
				history.put("version", 1);
				wikiUpdateMapper.insertLabelHistory(history);
			} else {
				for(int i = 0; i < nowLabels.size(); i++) {
					if(nowLabels.get(i).getId() == label.getId()) {
						if(!nowLabels.get(i).same(label)) {
							wikiUpdateMapper.updateLabel(label);
							if(!isChange) {
								wikiUpdateMapper.insertWikiHistory(wikiHistory);
								history.put("historyId", wikiHistory.get("historyId"));
								isChange = true;
							}
							history.putAll(LabelFactory.decomposeHistory(label));
							history.put("changeType", 3);
							history.put("version", wikiUpdateMapper.selectLabelVersion(label.getId()) + 1);
							wikiUpdateMapper.insertLabelHistory(history);
						}
						nowLabels.remove(i);
						break;
					}
				}
			}
		}
		if(nowLabels.size() != 0) {
			if(!isChange) {
				wikiUpdateMapper.insertWikiHistory(wikiHistory);
				history.put("historyId", wikiHistory.get("historyId"));
				isChange = true;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("wikiId", wikiId);
			List<Integer> deleteList = new ArrayList<Integer>();
			for(Label label : nowLabels) {
				deleteList.add(label.getId());
				history.putAll(LabelFactory.decomposeHistory(label));
				history.put("changeType", 2);
				history.put("version", wikiUpdateMapper.selectLabelVersion(label.getId()) + 1);
				wikiUpdateMapper.insertLabelHistory(history);
			}
			map.put("list", deleteList);
			wikiUpdateMapper.deleteLabel(map);
		}
		if(isChange) {
			wikiUpdateMapper.wikiUpgrade(wikiId);
			return ResponseMessage.success();
		}
		return ResponseMessage.fail();
	}
	
	@Override
	public ResponseMessage updateCatals(List<Chapter> list) {
		int wikiId = list.get(0).getWikiId();
		int version = wikiUpdateMapper.getWikiVersion(wikiId) + 1;
		List<Chapter> nowCatals = new LinkedList<Chapter>();
		nowCatals = wikiUpdateMapper.getWikiChapters(wikiId);
		Map<String, Object> history = new HashMap<String, Object>();
		Map<String, Object> wikiHistory = MapFactory.wikiHistoryMap(wikiId, version, "catal", 1);
		boolean isChange = false;
		
		for(Chapter chapter : list) {
			if(chapter.getId() == 0) {
				chapter.setContent("记得为该章节填写内容哦~");
				wikiUpdateMapper.insertCatal(chapter);
				if(!isChange) {
					wikiUpdateMapper.insertWikiHistory(wikiHistory);
					history.put("historyId", wikiHistory.get("historyId"));
					isChange = true;
				}
				history.putAll(ChapterFactory.decomposeHistory(chapter));
				history.put("changeType", "1");
				history.put("chapterId", chapter.getId());
				history.put("version", 1);
				wikiUpdateMapper.insertCatalHistory(history);
			} else {
				for(int i = 0; i < nowCatals.size(); i++) {
					if(nowCatals.get(i).getId() == chapter.getId()) {
						if(!nowCatals.get(i).sameCatal(chapter)) {
							if(!isChange) {
								wikiUpdateMapper.insertWikiHistory(wikiHistory);
								history.put("historyId", wikiHistory.get("historyId"));
								isChange = true;
							}
							wikiUpdateMapper.updateCatal(chapter);
							history.putAll(ChapterFactory.decomposeHistory(chapter));
							history.put("content", nowCatals.get(i).getContent());
							history.put("changeType", "3");
							history.put("version", wikiUpdateMapper.selectChapterVersion(chapter.getId()) + 1);
							wikiUpdateMapper.insertCatalHistory(history);
						}
						nowCatals.remove(i);
						break;
					}
				}
			}
		}
		if(nowCatals.size() != 0) {
			if(!isChange) {
				wikiUpdateMapper.insertWikiHistory(wikiHistory);
				history.put("historyId", wikiHistory.get("historyId"));
				isChange = true;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("wikiId", wikiId);
			List<Integer> deleteList = new ArrayList<Integer>();
			for(Chapter chapter : nowCatals) {
				deleteList.add(chapter.getId());
				history.putAll(ChapterFactory.decomposeHistory(chapter));
				history.put("changeType", "2");
				history.put("version", wikiUpdateMapper.selectChapterVersion(chapter.getId()) + 1);
				wikiUpdateMapper.insertCatalHistory(history);
			}
			map.put("list", deleteList);
			wikiUpdateMapper.deleteCatal(map);
		}
		if(isChange) {
			wikiUpdateMapper.wikiUpgrade(wikiId);
			return ResponseMessage.success();
		}
		return ResponseMessage.fail();
	}
	
	@Override
	public ResponseMessage updateChapter(Chapter chapter) {
		int parentId = chapter.getId();
		int wikiId = chapter.getWikiId();
		int version = wikiUpdateMapper.getWikiVersion(chapter.getWikiId()) + 1;
		Chapter nowChapter = wikiUpdateMapper.getChapter(parentId);
		List<ChildChapter> nowChilds = new LinkedList<ChildChapter>();
		nowChilds = nowChapter.getChilds();
		Map<String, Object> history = new HashMap<String, Object>();
		Map<String, Object> wikiHistory = MapFactory.wikiHistoryMap(wikiId, version, "chapter", 1);
		boolean isChange = false;
		
		for(ChildChapter child : chapter.getChilds()) {
			if(child.getId() == 0) {
				if(!isChange) {
					history.put("historyId", wikiHistory.get("historyId"));
					history.put("version", setUpdateChapter(nowChapter, chapter, history, wikiHistory));
					isChange = true;
				}
				wikiUpdateMapper.insertChildChapter(child);
				history.putAll(ChildChapterFactory.decomposeHistory(child));
				history.put("changeType", 1);
				history.put("version", wikiUpdateMapper.selectChildVersion(child.getId()) + 1);
				wikiUpdateMapper.insertChildHistory(history);
			} else {
				for(int i = 0; i < nowChilds.size(); i++) {
					if(nowChilds.get(i).getId() == child.getId()) {
						if(!nowChilds.get(i).same(child)) {
							if(!isChange) {
								history.put("historyId", wikiHistory.get("historyId"));
								history.put("version", setUpdateChapter(nowChapter, chapter, history, wikiHistory));
								isChange = true;
							}
							wikiUpdateMapper.updateChildChapter(child);
							history.putAll(ChildChapterFactory.decomposeHistory(child));
							history.put("changeType", 3);
							history.put("version", wikiUpdateMapper.selectChildVersion(child.getId()) + 1);
							wikiUpdateMapper.insertChildHistory(history);
						}
						nowChilds.remove(i);
						break;
					}
				}
			}
		}
		if(nowChilds.size() != 0) {
			if(!isChange) {
				history.put("historyId", wikiHistory.get("historyId"));
				history.put("version", setUpdateChapter(nowChapter, chapter, history, wikiHistory));
				isChange = true;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("parentId", parentId);
			List<Integer> deleteList = new ArrayList<Integer>();
			for(ChildChapter child : nowChilds) {
				deleteList.add(child.getId());
				history.putAll(ChildChapterFactory.decomposeHistory(child));
				history.put("changeType", 2);
				history.put("version", wikiUpdateMapper.selectChildVersion(child.getId()) + 1);
				wikiUpdateMapper.insertChildHistory(history);
			}
			map.put("list", deleteList);
			wikiUpdateMapper.deleteChildChapter(map);
		}
		
		if(!isChange && !nowChapter.same(chapter)) {
			setUpdateChapter(nowChapter, chapter, history, wikiHistory);
			wikiUpdateMapper.wikiUpgrade(chapter.getWikiId());
			return ResponseMessage.success();
		}
		
		if(isChange) {
			wikiUpdateMapper.wikiUpgrade(chapter.getWikiId());
			return ResponseMessage.success();
		}
		return ResponseMessage.fail();
	}
	private int setUpdateChapter(Chapter nowChapter, Chapter chapter, Map<String, Object> history, Map<String, Object> wikiHistory) {
		wikiUpdateMapper.updateChapter(chapter);
		wikiUpdateMapper.insertWikiHistory(wikiHistory);
		history.put("historyId", wikiHistory.get("historyId"));
		history.putAll(ChapterFactory.decomposeHistory(chapter));
		history.put("serNum", nowChapter.getSerNum());
		int version = wikiUpdateMapper.selectChapterVersion(chapter.getId()) + 1;
		history.put("version", version);
		if(!nowChapter.same(chapter)) {
			history.put("changeType", 3);
		} else {
			history.put("changeType", 4);
		}
		wikiUpdateMapper.insertChapterHistory(history);
		return version;
	}
}
