package com.yez.wiki.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface ActiveUserDao {
	public void todayActiveUser(@Param("number")int number, @Param("date")String date);
	public List<Integer> getRangeActiveUser(List<String> dates);
	public int getRangeAvgActiveUser(List<String> dates);
}
