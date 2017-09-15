package com.yez.wiki.util;

import java.util.ArrayList;
import java.util.List;

public class WordsCompareUtil {
	public static List<String> getDecomposeString(String str) {
		if(str.equals("") || str == "") {
			return null;
		}
		List<String> list = new ArrayList<String>();
		int startIndex = 0;
		int endIndex = 0;
		for(int i = 0; i < str.length(); i++) {
			char c = str.charAt(i);
			if(c == ',' || c == '.' || c == '，' || c == '。' || c == '!'
					|| c == '！' || c == '?' || c == '？' || c == ';'
					|| c == '；' || c == ':' || c == '：') {
				endIndex = i;
				String tmp = str.substring(startIndex, endIndex);
				list.add(tmp);
				startIndex = i + 1;
			}
		}
		if(endIndex == 0) {
			list.add(str);
		}
		return list;
	}
	
	public static double getStringMatchingRate(List<String> original, List<String> now) {
		int changeSize = 0;
		int originalLen = 0;
		for(int i = 0; i < original.size(); i++) {
			int min = 10000;
			for(int j = 0; j < now.size(); j++) {
				int change = StringUtil.getStringChangeValue(original.get(i), now.get(j));
				min = min > change ? change : min;
			}
			originalLen += original.get(i).length();
			changeSize += min;
		}
		return (double)(originalLen - changeSize) / originalLen * 100;
	}
	
	/*public static double getStringChangeRate(List<String> original, List<String> now) {
		int ChangeSize = 0;
		int originalSize = 0;
		int log[] = new int[now.size()];
		for(int i = 0; i < original.size(); i++) {
			int min = 10000;
			int index = -1;
			for(int j = 0; j < now.size(); j++) {
				int levenshtein = StringUtil.getLevenshteinDistance(original.get(i), now.get(j));
				double changeRate = levenshtein/original.get(i).length();
				if(changeRate < 0.7 && min > levenshtein) {
					min = levenshtein;
					index = j;
				}
			}
			if(index == -1) {
				ChangeSize += original.get(i).length();
			} else {
				ChangeSize += min;
				log[index] = 1;
			}
			originalSize += original.get(i).length();
		}
		for(int i = 0; i < log.length; i++) {
			if(log[i] == 0) {
				ChangeSize += now.get(i).length();
			}
		}
		return (double)ChangeSize / originalSize;
	}*/
}
