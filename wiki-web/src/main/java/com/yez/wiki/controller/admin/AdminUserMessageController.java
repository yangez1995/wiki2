package com.yez.wiki.controller.admin;

import java.util.HashMap;
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
	public ResponseMessage getPage(int pageIndex, String id, String nickname, String minAge, String maxAge, String sex) {
		Map<String, Object> map = MapFactory.pageMap(pageIndex, 10);
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "nickname", nickname);
		MapFactory.machiningInt(map, "minAge", minAge);
		MapFactory.machiningInt(map, "maxAge", maxAge);
		MapFactory.machiningInt(map, "sex", sex);
		return userMessageService.getPage(map);
	}
	
	/**
	 * 获取符合条件的用户信息数量
	 * @param id 精确查找id
	 * @param nickname 模糊查找nickname
	 * @param minAge 范围查找年龄大于minAge
	 * @param maxAge 范围查找年龄小于maxAge
	 * @param sex 精确查找sex
	 * @return int 符合条件的用户信息数量
	 */
	@ResponseBody
	@RequestMapping(value = "/getNumber", method = RequestMethod.POST)
	public ResponseMessage getNumber(String id, String nickname, String minAge, String maxAge, String sex) {
		Map<String, Object> map = new HashMap<String, Object>();
		MapFactory.machiningInt(map, "id", id);
		MapFactory.machiningString(map, "nickname", nickname);
		MapFactory.machiningInt(map, "minAge", minAge);
		MapFactory.machiningInt(map, "maxAge", maxAge);
		MapFactory.machiningInt(map, "sex", sex);
		return userMessageService.getNumber(map);
	}
}
