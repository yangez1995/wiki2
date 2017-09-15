package com.yez.wiki.util;

import java.math.BigDecimal;

public class MathUtil {
	public static double RetainDecimal(double number, int digits) {
		BigDecimal decimal = new BigDecimal(number);
		return decimal.setScale(digits, BigDecimal.ROUND_HALF_UP).doubleValue();
	}
}
