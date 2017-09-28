package com.yez.wiki.main.util;

import java.io.IOException;
import java.util.Date;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.SolrInputDocument;

import com.yez.wiki.entity.wiki.Wiki;

public class SolrConnectUtil {
	private static String url = "http://localhost:8080/solr/core"; 
	private static SolrClient client = null;
	
	public static void addWiki(Wiki wiki) {
		client = new HttpSolrClient.Builder(url).build();
		SolrInputDocument document = new SolrInputDocument();
		loadWiki(document, wiki);
		try {
			client.add(document);
			client.commit();
		} catch (SolrServerException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void updateWiki(Wiki wiki, Date editTime) {
		client = new HttpSolrClient.Builder(url).build();
		SolrInputDocument document = new SolrInputDocument();
		loadWiki(document, wiki);
		document.addField("edit_time", editTime);
		try {
			System.out.println(client.getById("" + wiki.getId()));
			client.add(document);
			client.commit();
		} catch (SolrServerException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void deleteWiki(int id) {
		client = new HttpSolrClient.Builder(url).build();
		try {
			client.deleteById("" + id);
			client.commit();
		} catch (SolrServerException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static void loadWiki(SolrInputDocument document, Wiki wiki) {
		document.addField("id", wiki.getId());
		document.addField("wiki_title", wiki.getTitle());
		document.addField("wiki_subTitle", wiki.getSubTitle());
		document.addField("wiki_describe", wiki.getDescribe());
		document.addField("level", wiki.getLevel());
		document.addField("wiki_category", wiki.getCategory());
		document.addField("version", wiki.getVersion());
		document.addField("create_by", wiki.getCreateBy());
		document.addField("create_date", wiki.getCreateDate());
	}
}
