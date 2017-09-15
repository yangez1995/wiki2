package com.yez.wiki.exception;

public class DateFormatErrorException extends Exception {
	private static final long serialVersionUID = -2567746630996481414L;

	public DateFormatErrorException(int year, int month, int day) {
		super(year + "-" + month + "-" + day + "日期格式错误！请检查月份、天数是否在合理范围内！");
	}
}
