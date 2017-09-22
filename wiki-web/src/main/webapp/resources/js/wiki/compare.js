var wikiId = 0;
var historyId = 0;

$(document).ready(function(){
	var data = $.parseJSON(window.localStorage.getItem('data'));
	wikiId = data.wikiId;
	historyId = data.historyId;
	$('#update-time').text(data.updateTime);
	$('#update-by').text(data.updateBy);
	switch(data.type) {
	case '名片': {
		typeCard();
		break;
	}
	case '标签': {
		typeLabel();
		break;
	}
	case '目录': {
		typeCatal();
		break;
	}
	case '章节': {
		typeChapter();
		break;
	}
	}
});

function typeCard() {
	$.ajax({
		type : 'GET',
		url : 'card',
		data : {'wikiId': wikiId, 'historyId' : historyId},
		success : function(result) {
			if($(result.data).length == 1) {
				var content = '<h4>' + result.data[0].subTitle + '</h4>';
				addInsertBox(content);
				addInsertBox(result.data[0].des);
			} else {
				if(result.data[0].subTitle == result.data[1].subTitle) {
					var content = '<h4>' + result.data[0].subTitle + '</h4>';
					addDefaultRow(content);
				} else {
					var old = '<h4>' + result.data[0].subTitle + '</h4>';
					var now = '<h4>' + result.data[1].subTitle + '</h4>';
					addUpdateRow(old, now);
				}
				if(result.data[0].des == result.data[1].des) {
					addDefaultRow(result.data[0].des);
				} else {
					addUpdateRow(result.data[0].des, result.data[1].des);
				}
			}
		}
	});
}

function typeLabel() {
	$.ajax({
		type : 'GET',
		url : 'label',
		data : {'wikiId': wikiId, 'historyId' : historyId},
		success : function(result) {
			$(result.data).each(function(i, msg) {
				if(msg.changeType == 3) {
					var old = '<div class="label-sernum">' + msg.oSerNum + '</div>' +
								  '<div class="label-name">' + msg.name + '</div>' +
								  '<div class="label-content">' + msg.oContent + '</div>';
					var now = '<div class="label-sernum">' + msg.serNum + '</div>' +
					  		  '<div class="label-name">' + msg.name + '</div>' +
					  		  '<div class="label-content">' + msg.content + '</div>';
					addUpdateRow(old, now);
				}
			});
			$(result.data).each(function(i, msg) {
				if(msg.changeType != 3) {
					var content = '<div class="label-sernum">' + msg.serNum + '</div>' +
								  '<div class="label-name">' + msg.name + '</div>' +
								  '<div class="label-content">' + msg.content + '</div>';
					if(msg.changeType == 1) {
						addInsertBox(content);
					} else {
						addDeleteBox(content);
					}
				}
			});
		}
	});
}

function typeCatal() {
	$.ajax({
		type : 'GET',
		url : 'catal',
		data : {'wikiId': wikiId, 'historyId' : historyId},
		success : function(result) {
			$(result.data).each(function(i, msg) {
				if(msg.changeType == 3) {
					var old = '<div class="label-sernum">' + msg.oSerNum + '</div>' +
								  '<div class="label-name">' + msg.oTitle + '</div>';
					var now = '<div class="label-sernum">' + msg.serNum + '</div>' +
					  		  '<div class="label-name">' + msg.title + '</div>';
					addUpdateRow(old, now);
				}
			});
			$(result.data).each(function(i, msg) {
				if(msg.changeType != 3) {
					var content = '<div class="label-sernum">' + msg.serNum + '</div>' +
								  '<div class="label-name">' + msg.title + '</div>';
					if(msg.changeType == 1) {
						addInsertBox(content);
					} else {
						addDeleteBox(content);
					}
				}
			});
		}
	});
}

function typeChapter() {
	$.ajax({
		type : 'GET',
		url : 'chapter',
		data : {'wikiId': wikiId, 'historyId' : historyId},
		success : function(result) {
			var chapter = result.data.chapter;
			if(chapter.changeType == 3) {
				var old = '<h4>' + chapter.oTitle + '</h4>' + chapter.oContent;
				var now = '<h4>' + chapter.title + '</h4>' + chapter.content;
				addUpdateRow(old, now);
			} else {
				var content = '<h4>' + chapter.title + '</h4>' + chapter.content;
				addDefaultRow(content);
			}
			$(result.data.childs).each(function(i, child) {
				if(child.changeType == 3) {
					var old = '<div class="label-sernum">' + child.oSerNum + '</div>' +
					  			  '<div class="label-name">' + child.oTitle + '</div>' + child.oContent;
					var now = '<div class="label-sernum">' + child.serNum + '</div>' +
		  		  			  '<div class="label-name">' + child.title + '</div>' + child.content;
					addUpdateRow(old, now);
				}
			});
			$(result.data.childs).each(function(i, child) {
				if(child.changeType != 3) {
					var content = '<div class="label-sernum">' + child.serNum + '</div>' +
								  '<div class="label-name">' + child.title + '</div>' + child.content;
					if(child.changeType == 1) {
						addInsertBox(content);
					} else {
						addDeleteBox(content);
					}
				}
			});
		}
	});
}

function addDefaultRow(content) {
	$('#delete-insert').before(
		'<div class="row">' + 
			'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 compare-box">' + defaultBoxFactory(content) + '</div>' +
			'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 compare-box">' + defaultBoxFactory(content) + '</div>' +
		'</div>'
	);
}

function addUpdateRow(old, now) {
	$('#delete-insert').before(
		'<div class="row">' + 
			'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 compare-box">' + defaultBoxFactory(old) + '</div>' +
			'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 compare-box">' + updateBoxFactory(now) + '</div>' +
		'</div>'
	);
}

function defaultBoxFactory(content) {
	return '<div class="box-label default-box">' + content + '</div>';
}

function updateBoxFactory(content) {
	var div = '<div class="box-label update-box">' +
			      '<span class="label-type">改动</span>' +
			      content +
			  '</div>';
	return div;
}

function addInsertBox(content) {
	$('#insert-compare-box').append(
		'<div class="box-label insert-box">' +
			'<span class="label-type">新增</span>' +
		    content +
		'</div>'
	);
}

function addDeleteBox(content) {
	$('#delete-compare-box').append(
		'<div class="box-label delete-box">' +
			'<span class="label-type">移除</span>' +
		    content +
		'</div>'
	);
}