package com.yez.wiki.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class ProjectDateUtil {
	//private static final String FIRST_WEEK_DATE = "2016-07-04";
	private static final long FIRST_WEEK_LONG = 1467561600000L;
	//private static final String FIRST_MONTH_DATE = "2016-07-01";
	//private static final long FIRST_MONTH_LONG = 1467302400000L;
	private static final SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
	//private static final SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");	
	
	public static int getWeekNumber() throws ParseException {
		Calendar calendar = Calendar.getInstance();
		Date nowDate = sdfDate.parse(TimeUtil.getNowDate());
		calendar.setTime(nowDate);
		long nowLong = calendar.getTime().getTime();
		int weekNumber = (int) ((nowLong - FIRST_WEEK_LONG) / (1000 * 60 * 60 * 24 * 7));
		return weekNumber;
	}
	
	public static String getWeekStartDate(int weekNumber) {
		long weekStartLong = FIRST_WEEK_LONG + (long) (weekNumber - 1) * (1000 * 60 * 60 * 24 * 7);
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(weekStartLong);
		return TimeUtil.stampToDate(calendar.getTime());
	}
	
	public static List<String> getWeekStartDateList(int weekNumber) {
		List<String> list = new ArrayList<String>();
		long weekStartLong = FIRST_WEEK_LONG + (long) (weekNumber - 1) * (1000 * 60 * 60 * 24 * 7);
		Calendar calendar = Calendar.getInstance();
		for(int i = 0; i < 7; i++) {
			calendar.setTimeInMillis(weekStartLong + i * (1000 * 60 * 60 * 24));
			list.add(TimeUtil.stampToDate(calendar.getTime()));
		}
		return list;
	}
}
