var params = {};
var wikiId = 1;
var maxH = 0;
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
	
	installLabel($('#left-part'));
	installCatal($('#left-part'));
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
});

function resetPage() {
	$.post('getWikiById', { "id" : 1 }, function(data) {
		initCard(data.title, data.subTitle, data.describe)
		$('#wiki-level').text('词条等级: ' + data.level);
		$('#wiki-version').html('词条版本: ' + data.version + ' <a id="check-history" style="cursor: pointer;">[版本改动]</a>');
		$('#wiki-create-date').text(data.createDate);
		$('#edit-catal-list').html('');
		$('#chapter-container').html('');
		$('#sub-catal').html('');
		$('#catal1').html('');
		$('#catal2').html('');
		$('#catal3').html('');
		initLabel(data.labels);
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
			'</div>'+
		'</div>';
	return modal;
}