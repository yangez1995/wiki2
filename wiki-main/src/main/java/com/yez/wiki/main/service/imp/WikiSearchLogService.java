package com.yez.wiki.main.service.imp;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.main.dao.WikiSearchLogMapper;
import com.yez.wiki.main.service.IWikiSearchLogService;
import com.yez.wiki.util.StringUtil;

@Service
public class WikiSearchLogService implements IWikiSearchLogService {
	@Autowired
	private WikiSearchLogMapper wikiSearchLogMapper;
	@Override
	public ResponseMessage insert(String search, int userId) {
		if(StringUtil.isEmpty(search)) {
			return ResponseMessage.fail("搜索记录不能为空！");
		}
		if(!StringUtil.checkLength(search, 0, 30)) {
			return ResponseMessage.fail("搜索记录不能超过30字！");
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("content", search);
		map.put("searchTime", new Date());
		wikiSearchLogMapper.insert(map);
		return ResponseMessage.success();
	}

}
