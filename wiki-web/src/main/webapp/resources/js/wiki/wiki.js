var params = {};
var wikiId = 1;
var maxH = 0;
var listens = [];
var category = 0;
var type = 0;
var auth = 0;
$(document).ready(function() {
	category = getUrlParam('category');
	type = Math.floor(category / 10);
	auth = category % 10;
	wikiId = getUrlParam('wikiId');
	
	//窗口大小改变事件
	var w = $('#img-collection').width();
	var h = w * 1.25;
	$('#img-collection').height(h);
	$('#img-collection img:first').height(h - 40);
	$(window).resize(function() {
		//控制图册高度变化
		var w = $('#img-collection').width();
		var h = w * 1.25;
		$('#img-collection').height(h);
		$('#img-collection img:first').height(h - 40);
		//目录样式变化
		if($(document).width() <= 768) {
			$('#catal-bar').css('margin-left','15px');
		} else {
			$('#catal-bar').css('margin-left','100px');
		}
	});
	//左侧组件
	installCard($('#left-part'));//添加名片组件
	if(type == 2 || type == 3) {
		installLabel($('#left-part'));//添加标签组件
		installCatal($('#left-part'));//添加目录组件
	}
	installChapter($('#left-part'));//添加章节组件
	//右侧组件
	installStatistics($('#right-part'));//添加词条统计组件
	if(type == 2 || type == 3) {
		installSubCatal($('#right-part'));//添加滑动目录组件
	}
	if(type == 3) {
		installAnimeRadarMap($('#right-part'));//添加评分雷达图
	}
	
	resetPage();
});

function resetPage() {
	$.post('getWiki', { 'id' : wikiId, 'category' : type }, function(result) {
		var data = result.data;
		initCard(data.title, data.subTitle, data.describe);
		initStatistics(data);
		if(type == 1) {
			initChapter(data.chapter);
		}
		if(type == 2 || type == 3) {
			initLabel(data.labels);
			initCatal(data.chapters);
			initChapter(data.chapters);
			initSubCatal(data.chapters);
		}
		if(type == 3) {
			initAnimeRadarMap(data);
		}
		maxH = $('#main-div').height() + $('#main-div').offset().top;
		listens = $('.onlisten');
	});
}

function ascending(e) {
	var tr = $(e).parent().parent();
	if($(tr).find('td:eq(0)').text() == 1) {
		alert('该行已经为最上行，无法升序');
		return false;
	}
	var serNum = $(tr).find('td:eq(0)').text();
	$(tr).find('td:eq(0)').text(serNum - 1);
	$(tr).prev().find('td:eq(0)').text(serNum);
	$(tr).prev().before(tr); 
}

function descending(e) {
	var tr = $(e).parent().parent();
	var size = 1;
	$(tr).siblings().each(function(){ size++ });
	if($(tr).find('td:eq(0)').text() == size) {
		alert('该行已经为最下行，无法降序');
		return false;
	}
	var serNum = $(tr).find('td:eq(0)').text();
	$(tr).find('td:eq(0)').text(parseInt(serNum) + 1);
	$(tr).next().find('td:eq(0)').text(serNum);
	$(tr).next().after(tr);
}

function modalCreater(id, title, body, footer) {
	var modal = '' +
		'<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-hidden="true">' +
			'<div class="modal-dialog">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
						'<h4 class="modal-title">' + title + '</h4>' +
					'</div>' +
					'<div class="modal-body">' + body + '</div>' +
					'<div class="modal-footer">' + footer + '</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	return modal;
}