package com.yez.wiki.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yez.wiki.user.security.SecurityMetadataSourceImpl;
import com.yez.wiki.user.security.SpringSecuritySessionUtil;

@Controller
public class UrlAuthorityController {
	@Autowired
	private SecurityMetadataSourceImpl securityMetadataSourceImpl;
	
	@ResponseBody
	@RequestMapping(value = "/getElementAuth", method = RequestMethod.POST)
	public Map<String, Boolean> getElementAuth(@RequestBody List<Map<String, String>> elements) {
		elements = removeDuplicate(elements);
		Map<String, Boolean> map = new HashMap<String, Boolean>();
		List<String> userAuths = SpringSecuritySessionUtil.getOnLogUserAuths();
		for(Map<String, String> element : elements) {
			String url = element.get("url");
			List<String> resourceAuths = new ArrayList<String>();
			try {
				for(ConfigAttribute ca : securityMetadataSourceImpl.getAttributes(url)) {
					resourceAuths.add(ca.getAttribute());
				}
			} catch(NullPointerException npe) {
				map.put(url, true);
				continue;
			}
			resourceAuths.retainAll(userAuths);
			if(resourceAuths.size() > 0) {
				map.put(url, true);
			} else {
				map.put(url, false);
			}
		}
		return map;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private List<Map<String, String>> removeDuplicate(List<Map<String, String>> list) {
		Set set  =   new  HashSet(list);
		list.clear();
		list.addAll(set);
		return list;
	}
}
