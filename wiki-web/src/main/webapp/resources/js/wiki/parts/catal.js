var nowEditCatal = null;

//添加目录组件
function installCatal(div) {
	//目录组件
	$(div).append(
		'<button class="btn edit-icon" onclick="showCatalEditModal()" style="float: right;"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑目录</button>' +
		'<div style="margin-top: 30px;background: #F7F7F7;border-top: #CCCCCC solid 1px;border-bottom: #CCCCCC solid 1px;">' +
			'<h4 class="hidden-xs" style="float: left;font-family: Microsoft YaHei;margin-top: 30px;margin-left: 40px;">目录</h4>' +
			'<div class="row" id="catal-bar" style="margin-left: 100px;padding-top: 15px;padding-bottom: 15px;background: #FCFCFC;border-left: #CCCCCC solid 1px;">' +
				'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="margin-top: 0px;">' +
					'<dl id="catal1" class="catal"></dl>' +
				'</div>' +
				'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="margin-top: 0px;">' +
					'<dl id="catal2" class="catal"></dl>' +
				'</div>' +
				'<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="margin-top: 0px;">' +
					'<dl id="catal3" class="catal"></dl>' +
				'</div>' +
			'</div>' +
		'</div>'	
	);
	//编辑目录模态框
	var body = '章节目录' +
		'<div style="width: 100%;padding: 10px 15px 10px 15px;border: #CCC solid 1px;border-radius: 4px;">' +
			'<table class="table table-bordered table-striped model-table">' +
			'<thead>' +
			'<tr>' +
				'<th width="40px">序号</th>' +
				'<th>标题</th>' +
				'<th width="168px">选项</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody id="edit-catal-list"></tbody>' +
			'</table>' +
		'</div><br/>' +
		'<div class="input-group">' +
			'<input type="text" class="form-control" id="add-chapter" placeholder="章节标题">' +
			'<span class="input-group-btn">' +
				'<button class="btn btn-default" type="button" onclick="newCatal()">新建章节</button>' +
			'</span>' +
		'</div>';
	var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
 				 '<button type="button" class="btn btn-primary" onclick="catalUpdate()">提交更改</button>';
	$('body').append(modalCreater('catal-edit-model', '编辑目录', body, footer));
	//编辑单个目录模态框
	body = '标题<input class="form-control" id="edit-catal-title" type="text" name=""><br/>';
	footer = '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
			 '<button type="button" class="btn btn-primary" onclick="onEditCatal()">提交更改</button>';
	$('body').append(modalCreater('a-catal-edit-model', '编辑目录', body, footer));
}

//初始化目录
function initCatal(chapters) {
	var catalSize = 0;
	$('#catal1').html('');
	$('#catal2').html('');
	$('#catal3').html('');
	$('#edit-catal-list').html('');
	$(chapters).each(function(i, chapter) {
		$('#edit-catal-list').append(
			'<tr id="' + chapter.id + '">' + 
				'<td>' + (i + 1) + '</td>' +
				'<td>' + chapter.title + '</td>' +
				'<td>' + 
					'<button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
					'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
					'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editCatal(this)">编辑</button>' + 
					'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeCatal(this)">删除</button>' + 
				'</td>' +
			'</tr>'
		);
		catalSize += 1.5;
		$(chapter.childs).each(function() {
			catalSize += 1;
		});
	});
	
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
	$(id).append(
		'<dt>' +
			'<span>' + chapter.serNum + '</span>' +
			'<a href="#main-title' + chapter.serNum + '">&nbsp;' + chapter.title + '</a>' +
		'</dt>'
	);
}

function appendChildCatal(id, pSerId, child) {
	$(id).append(
		'<dd>' +
			'<span>·</span>' +
			'<a href="#sub-title' + pSerId + '-' + child.serNum + '">' + child.title + '</a>' +
		'</dd>'
	);
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

function showCatalEditModal() {
	$('#catal-edit-model').modal({
		backdrop: 'static'
	});
}

function newCatal() {
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
}