package com.yez.wiki.main.service.imp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.main.dao.WikiCategoryMapper;
import com.yez.wiki.main.service.IWikiCategoryService;
import com.yez.wiki.util.StringUtil;
@Service
public class WikiCategoryService implements IWikiCategoryService {
	@Autowired
	private WikiCategoryMapper wikiCategoryMapper;
	
	@Override
	public ResponseMessage insert(String id, String name) {
		if(StringUtil.isEmpty(id)) {
			return ResponseMessage.fail("ID不能为空！");
		}
		if(!StringUtil.isInteger(id)) {
			return ResponseMessage.fail("ID为数字！");
		}
		if(StringUtil.isEmpty(name)) {
			return ResponseMessage.fail("名称不能为空！");
		}
		if(!StringUtil.checkLength(name, 1, 20)) {
			return ResponseMessage.fail("名称在1-20字符之间！");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		wikiCategoryMapper.insert(map);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage update(String id, String name) {
		if(StringUtil.isEmpty(id)) {
			return ResponseMessage.fail("ID不能为空！");
		}
		if(!StringUtil.isInteger(id)) {
			return ResponseMessage.fail("ID为数字！");
		}
		if(StringUtil.isEmpty(name)) {
			return ResponseMessage.fail("名称不能为空！");
		}
		if(!StringUtil.checkLength(name, 1, 20)) {
			return ResponseMessage.fail("名称在1-20字符之间！");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "name", name);
		wikiCategoryMapper.update(map);
		return ResponseMessage.success();
	}
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(MapFactory.pageAndSize(wikiCategoryMapper.getPage(map), wikiCategoryMapper.getNumber()));
	}
}
