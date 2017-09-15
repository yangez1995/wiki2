package com.yez.wiki.util;

public class PageUtil {
	/**
	 * 页码转化为起始索引
	 * @param pageIndex 页码
	 * @param pageSize 每页信息条数
	 * @return 起始索引
	 */
	public static int pageIndexToStartIndex(int pageIndex, int pageSize) {
		return (pageIndex-1)*pageSize;
	}
	/**
	 * 总信息条数转化为总页数
	 * @param number 总信息条数
	 * @param pageSize 每页信息条数
	 * @return 总页数
	 */
	public static int numberToPage(int number, int pageSize) {
		if(number == 0) {
			return 0;
		}
		if(number%pageSize == 0) {
			return number/pageSize;
		} else {
			return number/pageSize + 1;
		}
	}
}
