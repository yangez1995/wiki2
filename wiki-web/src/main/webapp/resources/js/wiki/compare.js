var wikiId = 0;
var historyId = 0;

$(document).ready(function(){
	var data = $.parseJSON(window.localStorage.getItem('data'));
	wikiId = data.wikiId;
	historyId = data.historyId;
	switch(data.type) {
	case '名片': {
		typeCard();
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
				addInsertBox($('#now-compare-box'), content);
				addInsertBox($('#now-compare-box'), result.data[0].des);
			} else {
				var content = '<h4>' + result.data[0].subTitle + '</h4>';
				addDefaultBox($('#old-compare-box'), content);
				addDefaultBox($('#old-compare-box'), result.data[0].des);
				if(result.data[0].subTitle != result.data[1].subTitle) {
					content = '<h4>' + result.data[1].subTitle + '</h4>';
					addUpdateBox($('#now-compare-box'), content);
				} else {
					addDefaultBox($('#now-compare-box'), content);
				}
				if(result.data[0].des != result.data[1].des) {
					addUpdateBox($('#now-compare-box'), result.data[1].des);
				} else {
					addDefaultBox($('#now-compare-box'), result.data[1].des);
				}
			}
		}
	});
}

function addDefaultBox(div, content) {
	$(div).append('<div class="box-label default-box">' + content + '</div>');
}

function addInsertBox(div, content) {
	$(div).append(
		'<div class="box-label insert-box">' +
			'<span>新增</span>' +
			content +
		'</div>'
	);
}

function addDeleteBox(div, content) {
	$(div).append(
		'<div class="box-label delete-box">' +
			'<span>移除</span>' +
			content +
		'</div>'
	);
}

function addUpdateBox(div, content) {
	$(div).append(
		'<div class="box-label update-box">' +
			'<span>改动</span>' +
			content +
		'</div>'
	);
}