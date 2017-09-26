package com.yez.wiki.main.service;

import com.yez.wiki.entity.ResponseMessage;
import com.yez.wiki.entity.wiki.Wiki;

public interface IWIkiCreateService {
	public ResponseMessage newSimpleWiki(Wiki wiki);
	public ResponseMessage newStandardWiki(Wiki wiki);
	public ResponseMessage newAnimeWiki(Wiki wiki);
}
