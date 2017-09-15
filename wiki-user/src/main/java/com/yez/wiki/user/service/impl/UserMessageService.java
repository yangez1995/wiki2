package com.yez.wiki.user.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.user.dao.UserMessageMapper;
import com.yez.wiki.user.service.IUserMessageService;
import com.yez.wiki.util.PageUtil;


@Service
public class UserMessageService implements IUserMessageService {
	@Autowired
	private UserMessageMapper userMessageMapper;
	
	@Override
	public ResponseMessage getPage(Map<String, Object> map) {
		return ResponseMessage.success(userMessageMapper.getPage(map));
	}
	
	@Override
	public ResponseMessage getNumber(Map<String, Object> map) {
		return ResponseMessage.success(PageUtil.numberToPage(userMessageMapper.getNumber(map), 10));
	}
	
	/*@Override
	public Map<String, Double> getUserSexDistribution() {
		Map<String, Double> distribution = new HashMap<String, Double>();
		List<String> mainList = userMessageMapper.selectUserSex();
		double[] statistics = new double[4];
		for(String s : mainList) {
			if(s.equals("x")) {
				statistics[0]++;
			} else if(s.equals("m")){
				statistics[1]++;
			} else {
				statistics[2]++;
			}
			statistics[3]++;
		}
		double m = MathUtil.RetainDecimal(statistics[1]/statistics[3]*100, 2);
		double w = MathUtil.RetainDecimal(statistics[2]/statistics[3]*100, 2);
		double x = MathUtil.RetainDecimal(100 - m - w, 2);
		distribution.put("m", m);
		distribution.put("w", w);
		distribution.put("x", x);
		return distribution;
	}
	//6-,7-9,10-12,13-15,16-18,19-21,22-24,25-27,28-30,31-33,34-36,37-39,40+
	@Override
	public List<Double> getUserAgeDistribution() {
		List<Double> distribution = new ArrayList<Double>();
		List<Integer> mainList = userMessageMapper.selectUserAge();
		double[] statistics = new double[15];
		for(Integer i : mainList) {
			if(i > 0 && i <= 6) {
				statistics[1]++;
			} else if(i >= 7 && i <= 9) {
				statistics[2]++;
			} else if(i >= 10 && i <= 12) {
				statistics[3]++;
			} else if(i >= 13 && i <= 15) {
				statistics[4]++;
			} else if(i >= 16 && i <= 18) {
				statistics[5]++;
			} else if(i >= 19 && i <= 21) {
				statistics[6]++;
			} else if(i >= 22 && i <= 24) {
				statistics[7]++;
			} else if(i >= 25 && i <= 27) {
				statistics[8]++;
			} else if(i >= 28 && i <= 30) {
				statistics[9]++;
			} else if(i >= 31 && i <= 33) {
				statistics[10]++;
			} else if(i >= 34 && i <= 36) {
				statistics[11]++;
			} else if(i >= 37 && i <= 39) {
				statistics[12]++;
			} else if(i >= 40){
				statistics[13]++;
			} else {
				statistics[14]++;
			}
			statistics[0]++;
		}
		double sec = 100;
		for(int i = 1; i <= 13; i++) {
			double d = MathUtil.RetainDecimal(statistics[i]/statistics[0]*100, 2);
			distribution.add(d);
			sec -= d;
		}
		distribution.add(sec);
		return distribution;
	}*/
	
	@Override
	public String getNicknameById(int id) {
		return userMessageMapper.getNicknameById(id);
	}
}
