package com.yez.wiki.user.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.user.dao.ActiveUserDao;
import com.yez.wiki.user.service.IActiveUserService;
import com.yez.wiki.util.ProjectDateUtil;
import com.yez.wiki.util.TimeUtil;

@Service
public class ActiveUserService implements IActiveUserService {
	@Autowired
	private ActiveUserDao activeUserDao;
	
	@Override
	public int getTodayActiveUser() {
		return 0;
	}

	@Override
	public List<Integer> getWeekActiveUser(int weekNumber) throws ParseException {
		return activeUserDao.getRangeActiveUser(ProjectDateUtil.getWeekStartDateList(weekNumber));
	}
	
	@Override
	public List<Integer> getMonthActiveUser(int year, int month) {
		return activeUserDao.getRangeActiveUser(TimeUtil.getMonthDayList(year, month));
	}

	@Override
	public List<Integer> getYearActiveUser(int year) {
		List<Integer> list = new ArrayList<Integer>();
		Map<String, Integer> map = TimeUtil.getTodayMonth();
		int minMonth = 1;
		int maxMonth = 1;
		if(year == map.get("year")) {
			maxMonth = map.get("month");
		} else {
			maxMonth = 12;
		}
		if(year == 2016) {
			minMonth = 7;
		}
		for(int i = minMonth; i <= maxMonth; i++) {
			list.add(activeUserDao.getRangeAvgActiveUser(TimeUtil.getMonthDayList(year, i)));
		}
		return list;
	}
}
