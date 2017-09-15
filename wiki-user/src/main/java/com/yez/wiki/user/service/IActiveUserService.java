package com.yez.wiki.user.service;

import java.text.ParseException;
import java.util.List;

public interface IActiveUserService {
	public int getTodayActiveUser();
	public List<Integer> getWeekActiveUser(int weekNumber) throws ParseException;
	public List<Integer> getMonthActiveUser(int year, int month);
	public List<Integer> getYearActiveUser(int year);
}
