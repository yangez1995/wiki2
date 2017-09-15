var params = {};
var wikiId = 1;
var maxH = 0;
var nowEditLabel = null;
var nowEditCatal = null;
var listens = [];
var subCatalList = [];
$(document).ready(function() {
	$('#sub-catal-cont').width($('#img-collection').width());
	
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
	
	resetPage();
	
	$('#title-edit').click(function() {
		$('#main-title-edit').val($('#main-title').text());
		$('#sub-title-edit').val($('#sub-title').text());
		var describe = '';
		$('#main-des p').each(function(i, p) {
			if(i > 0) {
				describe += '\n';
			}
			describe += $(p).text();
		});
		$('#main-des-edit').val(describe);
		$('#title-edit-model').modal({
			backdrop: 'static'
		});
	});
	
	$('#label-edit').click(function() {
		$('#label-edit-model').modal({
			backdrop: 'static'
		});
	});
	
	$('#add-label-button').click(function() {
		var nameKey = 0;
		if(isEmpty($('#add-label-name').val())) {
			alert("请输入标签名");
			return false;
		}
		if($('#add-label-name').val().length > 6) {
			alert("标签名不能超过6位");
			return false;
		}
		$('#edit-label-list tr').each(function(i, tr) {
			if($('#add-label-name').val() == $(tr).find('td:eq(1)').text()) {
				alert("已存在同名标签");
				nameKey = 1;
				return false;
			}
		});
		if(nameKey){
			return false;
		}
		if(isEmpty($('#add-label-content').val())) {
			alert("请输入标签内容");
			return false;
		}
		if($('#add-label-content').val().length > 6) {
			alert("标签内容不能超过20位");
			return false;
		}
		$('#edit-label-list').append('<tr id="' + 0 + '">' + 
			'<td>' + ($('#edit-label-list tr').length + 1) + '</td>' +	
			'<td>' + $('#add-label-name').val() + '</td>' +	
			'<td>' + $('#add-label-content').val() + '</td>' +	
			'<td><button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
			'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
			'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editLabel(this)">编辑</button>' + 
			'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeLabel(this)">删除</button></td>' +
			'</tr>'
		);
		$('#add-label-name').val('');
		$('#add-label-content').val('');
	});
	
	$('#add-catal-button').click(function() {
		var nameKey = 0;
		if(isEmpty($('#add-chapter').val())) {
			alert("请输入章节标题");
			return false;
		}
		if($('#add-chapter').val().length > 30) {
			alert("章节标题不能超过30位");
			return false;
		}
		$('#edit-catal-list tr').each(function(i, tr) {
			if($('#add-chapter').val() == $(tr).find('td:eq(1)').text()) {
				alert("已存在同名章节");
				nameKey = 1;
				return false;
			}
		});
		$('#edit-catal-list').append('<tr id="' + 0 + '">' + 
			'<td>' + ($('#edit-catal-list tr').length + 1) + '</td>' +	
			'<td>' + $('#add-chapter').val() + '</td>' +	
			'<td><button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
			'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
			'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editLabel(this)">编辑</button>' + 
			'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeLabel(this)">删除</button></td>' +
			'</tr>'
		);
		$('#add-chapter').val('');
	});
	
	$('#catal-edit').click(function() {
		$('#catal-edit-model').modal({
			backdrop: 'static'
		});
	});
});

function resetPage() {
	$.post('getWikiById', { "id" : 1 }, function(data) {
		$('#main-title').html(data.mainTitle);
		$('#sub-title').html(data.subTitle);
		$('#main-des').html(data.describe);
		$('#wiki-level').text('词条等级: ' + data.level);
		$('#wiki-version').html('词条版本: ' + data.version + ' <a id="check-history" style="cursor: pointer;">[版本改动]</a>');
		$('#wiki-create-date').text(data.createDate);
		var lr = 0;
		$('#lab-list-left').html('');
		$('#lab-list-right').html('');
		$('#edit-label-list').html('');
		$('#edit-catal-list').html('');
		$('#chapter-container').html('');
		$('#sub-catal').html('');
		$('#catal1').html('');
		$('#catal2').html('');
		$('#catal3').html('');
		$(data.labels).each(function(i, label) {
			if(lr == 0) {
				$('#lab-list-left').append('<dt>' + label.name + '</dt>' +
					'<dd>' + label.content + '</dd><hr/>'
				);
				lr = 1;
			} else {
				$('#lab-list-right').append('<dt>' + label.name + '</dt>' +
						'<dd>' + label.content + '</dd><hr/>'
					);
				lr = 0;
			}
			$('#edit-label-list').append('<tr id="' + label.id + '">' + 
				'<td>' + (i + 1) + '</td>' +
				'<td>' + label.name + '</td>' +
				'<td>' + label.content + '</td>' +
				'<td><button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
				'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
				'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editLabel(this)">编辑</button>' + 
				'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeLabel(this)">删除</button></td>' +
				'</tr>'
			);
		});
		var catalSize = 0;
		$(data.chapters).each(function(i, chapter) {
			$('#edit-catal-list').append('<tr id="' + chapter.id + '">' + 
				'<td>' + (i + 1) + '</td>' +
				'<td>' + chapter.title + '</td>' +
				'<td><button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
				'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
				'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editCatal(this)">编辑</button>' + 
				'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeCatal(this)">删除</button></td>' +
				'</tr>'
			);
			var pId = 'chapter'  + chapter.serNum;
			$('#chapter-container').append('' + 
				'<div class="chapters" id="' + pId + '" style="margin-bottom: 30px;"><div class="a-chapter" id="' + chapter.id +'">' +
				'<button class="btn edit-icon chapter-edit" style="float: right;" onclick="editChapter(this)"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑</button>' +
				'<h3 class="onlisten" id="main-title' + chapter.serNum + '">' + chapter.title + '</h3><hr/>' +
				'<div class="chapter-content">' + chapter.content + '</div></div></div>'
			);
			$('#sub-catal').append('<dt onclick="unlockScroll()"><em class="pointer"></em>' + 
				'<a href="#main-title' + chapter.serNum + '"><span>' + chapter.serNum + '</span>' + chapter.title + '</a></dt>');
			catalSize += 1.5;
			pId = '#' + pId;
			$(chapter.childs).each(function(i, child) {
				$(pId).append('<div class="a-child" id="' + child.id + '"><h4 class="onlisten" id="sub-title' + chapter.serNum + '-' + child.serNum +'">' + child.title + '</h4>' +
					'<div class="child-content">' + child.content + '</div></div>');
				$('#sub-catal').append('<dd onclick="unlockScroll()"><a href="#sub-title' + chapter.serNum + '-' + child.serNum + '"><span>' + chapter.serNum + '.' + child.serNum + '</span>' + child.title + '</a></dd>');
				catalSize += 1;
			});
		});
		initCatal(data.chapters, catalSize);
		maxH = $('#main-div').height() + $('#main-div').offset().top;
		listens = $('.onlisten');
		subCatalList = $('#sub-catal a');
		
		$('#check-history').click(function() {
			window.localStorage.setItem('wikiId', wikiId);
		    window.location.href = 'history';
		});
	});
}

function initCatal(chapters, catalSize) {
	if(catalSize <= 10) {
		$(chapters).each(function(i, chapter) {
			appendChapterCatal('#catal1', chapter);
			$(chapter.childs).each(function(j, child) {
				appendChildCatal('#catal1', chapter.serNum, child);
			})
		});
	} else if(catalSize > 10 && catalSize <= 16) {
		var catalS = 0;
		$(chapters).each(function(i, chapter) {
			if(catalS <= 8) {
				appendChapterCatal('#catal1', chapter);
				catalS += 1.5;
			} else {
				appendChapterCatal('#catal2', chapter);
			}
			$(chapter.childs).each(function(j, child) {
				if(catalS <= 8) {
					appendChildCatal('#catal1', chapter.serNum, child);
					catalS += 1;
				} else {
					appendChildCatal('#catal2', chapter.serNum, child);
				}
			})
		});
	} else {
		var everySize = 8;
		if(catalSize > 24) {
			everySize = catalSize / 3;
		}
		var catalS = 0;
		var catalS2 = 0;
		$(chapters).each(function(i, chapter) {
			if(catalS <= everySize) {
				appendChapterCatal('#catal1', chapter);
				catalS += 1.5;
			} else {
				if(catalS2 <= everySize) {
					appendChapterCatal('#catal2', chapter);
					catalS2 += 1.5;
				} else {
					appendChapterCatal('#catal3', chapter);
				}
			}
			$(chapter.childs).each(function(j, child) {
				if(catalS <= everySize) {
					appendChildCatal('#catal1', chapter.serNum, child);
					catalS += 1;
				} else {
					if(catalS2 <= everySize) {
						appendChildCatal('#catal2', chapter.serNum, child);
						catalS2 += 1;
					} else {
						appendChildCatal('#catal3', chapter.serNum, child);
					}
				}
			})
		});
	}
}

function appendChapterCatal(id, chapter) {
	$(id).append('<dt>' +
		'<span>' + chapter.serNum + '</span>' +
		'<a href="#main-title' + chapter.serNum + '">&nbsp;' + chapter.title + '</a>' +
		'</dt>'
	);
}
function appendChildCatal(id, pSerId, child) {
	$(id).append('<dd>' +
		'<span>·</span>' +
		'<a href="#sub-title' + pSerId + '-' + child.serNum + '">' + child.title + '</a>' +
		'</dd>'
	);
}

function editLabel(e) {
	var tr = $(e).parent().parent();
	nowEditLabel = tr;
	$('#edit-label-name').val($(tr).find('td:eq(1)').text());
	$('#edit-label-content').val($(tr).find('td:eq(2)').text());
	$('#a-label-edit-model').modal({
		backdrop: 'static'
	});
}

function onEditLabel() {
	var nameKey = 0;
	var list = $(nowEditLabel).parent();
	if($('#edit-label-name').val() != nowEditLabel.find('td:eq(1)').text()) {
		$(list).find('tr').each(function(i, tr) {
			if($('#edit-label-name').val() == $(tr).find('td:eq(1)').text()) {
				alert("已存在同名标签");
				nameKey = 1;
				return false;
			}
		});
	}
	if(nameKey) {
		return false;
	}
	$(nowEditLabel).find('td:eq(1)').text($('#edit-label-name').val());
	$(nowEditLabel).find('td:eq(2)').text($('#edit-label-content').val());
	$('#a-label-edit-model').modal('hide');
}

function removeLabel(e) {
	$(e).parent().parent().remove();
	$('#edit-label-list tr').each(function(i, tr) {
		$(tr).find('td:eq(0)').text(i + 1);
	});
}

function editCatal(e) {
	var tr = $(e).parent().parent();
	nowEditCatal = tr;
	$('#edit-catal-title').val($(tr).find('td:eq(1)').text());
	$('#a-catal-edit-model').modal({
		backdrop: 'static'
	});
}

function onEditCatal() {
	var nameKey = 0;
	var list = $(nowEditCatal).parent();
	if($('#edit-catal-title').val() != nowEditCatal.find('td:eq(1)').text()) {
		$(list).find('tr').each(function(i, tr) {
			if($('#edit-catal-title').val() == $(tr).find('td:eq(1)').text()) {
				alert("已存在同名目录");
				nameKey = 1;
				return false;
			}
		});
	}
	if(nameKey) {
		return false;
	}
	$(nowEditCatal).find('td:eq(1)').text($('#edit-catal-title').val());
	$('#a-catal-edit-model').modal('hide');
}

function removeCatal(e) {
	$(e).parent().parent().remove();
	$('#edit-catal-list tr').each(function(i, tr) {
		$(tr).find('td:eq(0)').text(i + 1);
	});
}

function editChapter(e) {
	var chapter = {};
	var childs = [];
	chapter.id = $(e).parent().attr('id');
	chapter.wikiId = wikiId;
	chapter.title = $(e).parent().find('h3').text();
	chapter.content = $(e).parent().find('div').html();
	var chapters = $(e).parent().parent();
	$(chapters).find('.a-child').each(function(i, c) {
		var child = {};
		child.id = $(c).attr('id');
		child.parentId = chapter.id;
		child.title = $(c).find('h4').text();
		child.content = $(c).find('div').html();
		childs.push(child);
	});
	chapter.childs = childs;
	window.localStorage.setItem('chapter', JSON.stringify(chapter));
    window.location.href = 'editer';
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

function titleUpdate() {
	params.id = wikiId;
	params.subTitle = $('#sub-title-edit').val();
	var des = $('#main-des-edit').val();
	arr = des.split('\n');
	var describe = '';
	$(arr).each(function(i, a) {
		describe += '<p>' + a + '</p>';
	});
	params.describe = describe;
	$.ajax({
		type : 'POST',
		url : 'cardUpdate',
		contentType:"application/json",
		data : JSON.stringify(params),
		success : function(result) {
			$('#title-edit-model').modal('hide');
			resetPage();
		}
	});
}

function labelUpdate() {
	var list = [];
	$('#edit-label-list tr').each(function(i, tr) {
		var label = {}
		label.id = $(tr).attr('id');
		label.wikiId = wikiId;
		label.serNum = $(tr).find('td:eq(0)').text();
		label.name = $(tr).find('td:eq(1)').text();
		label.content = $(tr).find('td:eq(2)').text();
		list.push(label);
	});
	$.ajax({
		type : 'POST',
		url : 'labelUpdate',
		contentType:"application/json",
		data : JSON.stringify(list),
		success : function(result) {
			$('#label-edit-model').modal('hide');
			resetPage();
		}
	});
}

function catalUpdate() {
	var list = [];
	$('#edit-catal-list tr').each(function(i, tr) {
		var chapter = {}
		chapter.id = $(tr).attr('id');
		chapter.wikiId = wikiId;
		chapter.serNum = $(tr).find('td:eq(0)').text();
		chapter.title = $(tr).find('td:eq(1)').text();
		list.push(chapter);
	});
	$.ajax({
		type : 'POST',
		url : 'catalUpdate',
		contentType:"application/json",
		data : JSON.stringify(list),
		success : function(result) {
			$('#catal-edit-model').modal('hide');
			resetPage();
		}
	});
}