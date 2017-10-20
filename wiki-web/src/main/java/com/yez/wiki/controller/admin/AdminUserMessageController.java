package com.yez.wiki.controller.admin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.factory.MapFactory;
import com.yez.wiki.user.service.IUserMessageService;

@Controller
@RequestMapping("/admin/user/message")
public class AdminUserMessageController {
	private static List<Map<String, String>> sexList;
	static {
		sexList = new ArrayList<Map<String, String>>();
		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("value", "0");
		map1.put("name", "保密");
		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("value", "1");
		map2.put("name", "男");
		Map<String, String> map3 = new HashMap<String, String>();
		map3.put("value", "2");
		map3.put("name", "女");
		sexList.add(map1);
		sexList.add(map2);
		sexList.add(map3);
	}
	
	@Autowired
	private IUserMessageService userMessageService;

	/**
	 * 获取页数对应的用户个人信息
	 * @param pageIndex 要获取的用户个人信息页数
	 * @param id 精确查找id
	 * @param nickname 模糊查找nickname
	 * @param minAge 范围查找年龄大于minAge
	 * @param maxAge 范围查找年龄小于maxAge
	 * @param sex 精确查找sex
	 * @return List<Object> 用户对应个人信息列表
	 */
	@ResponseBody
	@RequestMapping(value = "/getPage", method = RequestMethod.POST)
	public ResponseMessage getPage(int pageIndex, String id, String nickname, String ageMin, String ageMax, String sex) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "nickname", nickname);
		MapFactory.machiningInt(map, "ageMin", ageMin);
		MapFactory.machiningInt(map, "ageMax", ageMax);
		MapFactory.machiningInt(map, "sex", sex);
		return userMessageService.getPage(map);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getSex", method = RequestMethod.GET)
	public List<Map<String, String>> getSex() {
		return sexList;
	}
}
