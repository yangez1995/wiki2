package com.yez.wiki.user.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.user.dao.UserChartMapper;
import com.yez.wiki.user.service.IUserChartService;
@Service
public class UserChartService implements IUserChartService {
	@Autowired
	private UserChartMapper userChartMapper;
	
	@Override
	public ResponseMessage getUserSexDistribution() {
		Map<String, Double> distribution = new HashMap<String, Double>();
		List<String> list = userChartMapper.getUserSex();
		double[] statistics = new double[3];
		for(String s : list) {
			switch(s) {
				case "x": {
					statistics[0]++;
					break;
				}
				case "m": {
					statistics[1]++;
					break;
				}
				case "w": {
					statistics[2]++;
					break;
				}
			}
		}
		distribution.put("x", statistics[0]);
		distribution.put("m", statistics[1]);
		distribution.put("w", statistics[2]);
		return ResponseMessage.success(distribution);
	}

	@Override
	public ResponseMessage getUserAgeDistribution() {
		
		return null;
	}

}
