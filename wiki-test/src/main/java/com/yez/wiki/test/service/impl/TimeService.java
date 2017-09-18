package com.yez.wiki.test.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.test.dao.TimeMapper;
import com.yez.wiki.test.service.ITimeService;

@Service
public class TimeService implements ITimeService {
	@Autowired
	private TimeMapper timeMapper;
	
	@Override
	public void insertMap() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("time", new Date());
		timeMapper.insertMap(map);
	}
	
}
