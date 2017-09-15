package com.yez.wiki.user.service;

import com.yez.wiki.entity.ResponseMessage;

public interface IUserChartService {
	public ResponseMessage getUserSexDistribution();
	public ResponseMessage getUserAgeDistribution();
}
