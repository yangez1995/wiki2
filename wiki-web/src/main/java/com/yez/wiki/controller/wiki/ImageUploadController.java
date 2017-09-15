package com.yez.wiki.controller.wiki;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Controller
@RequestMapping("/upload")
public class ImageUploadController {
	
	@ResponseBody
	@RequestMapping(value = "/imageUpload", method = RequestMethod.POST)
	public Map<String, String> imageUpload(@RequestParam("upfile") CommonsMultipartFile upfile, HttpServletRequest req) throws IOException {
		String fileName = upfile.getOriginalFilename();
		String path = "F:\\upload\\image\\" + fileName;
		System.out.println(path);
		File file = new File(path);
		FileCopyUtils.copy(upfile.getBytes(), file);
		Map<String, String> map = new HashMap<String, String>();
		map.put("state", "SUCCESS");
		map.put("title", fileName);
		map.put("original", fileName);
		map.put("type", fileName.substring(upfile.getOriginalFilename().lastIndexOf(".")));
		map.put("size", upfile.getSize() + "");
		map.put("url", path);
		return map;
	}
	
	@RequestMapping(value = "/getImage/{imgName}")
	public void getImage(@PathVariable("imgName") String imgName, HttpServletResponse resp) throws IOException {
		resp.setContentType("image/*");
		String path = "F:\\upload\\image\\" + imgName;
		System.out.println(path);
		File file = new File(path);
		resp.getOutputStream().write(FileUtils.readFileToByteArray(file));
		resp.getOutputStream().flush();
		resp.getOutputStream().close();
	}
}
