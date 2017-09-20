var nowEditLabel = null;
//添加标签组件
function installLabel(div) {
	//标签组件
	$(div).append(
		'<button class="btn edit-icon" onclick="showLabelEditModal()" style="float: right;"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑标签</button>' + 
		'<div class="row" style="margin-top: 40px;">' + 
			'<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">' +
				'<dl id="lab-list-left" class="msg-lab"></dl>' + 
			'</div>' +
			'<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 msg-lab-r" style="margin-top: 0px;">' +
				'<dl id="lab-list-right" class="msg-lab"></dl>' +
			'</div>' +
		'</div>'
	);
	//编辑标签模态框
	var body = '标签' +
		'<div class="msg-label-edit" style="width: 100%;padding: 10px 15px 10px 15px;border: #CCC solid 1px;border-radius: 4px;">' +
			'<table class="table table-bordered table-striped model-table">' +
			'<thead>' + 
				'<tr>' +
					'<th width="40px">序号</th>' +
					'<th>标签名</th>' + 
					'<th>标签内容</th>' + 
					'<th width="168px">选项</th>' +
				'</tr>' +
			'</thead>' +
			'<tbody id="edit-label-list"></tbody>' +
			'</table>' +
		'</div><br/>' +
		'<div class="input-group">' +
			'<input type="text" class="form-control" id="add-label-name" placeholder="标签名">' +
			'<span class="input-group-addon">:</span>' +
			'<input type="text" class="form-control" id="add-label-content" placeholder="标签内容">' +
			'<span class="input-group-btn">' +
				'<button class="btn btn-default" type="button" onclick="newLabel()">添加标签</button>' +
			'</span>' +
		'</div>';
	var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
				 '<button type="button" class="btn btn-primary" onclick="labelUpdate()">提交更改</button>';
	$('body').append(modalCreater('label-edit-model', '编辑标签', body, footer));
	//编辑单个标签模态框
	body = '标签名称：<span id="edit-label-name"></span><br/><br/>' +
		   '标签内容<input class="form-control" id="edit-label-content" type="text" name=""><br/>';
	footer = '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' + 
			 '<button type="button" class="btn btn-primary" onclick="onEditLabel()">提交更改</button>';
	$('body').append(modalCreater('a-label-edit-model', '编辑标签', body, footer));
}
//初始化标签
function initLabel(labels) {
	$('#lab-list-left').html('');
	$('#lab-list-right').html('');
	$('#edit-label-list').html('');
	var lr = true;
	$(labels).each(function(i, label) {
		if(lr) {
			$('#lab-list-left').append(
				'<dt>' + label.name + '</dt>' +
				'<dd>' + label.content + '</dd><hr/>'
			);
			lr = false;
		} else {
			$('#lab-list-right').append(
				'<dt>' + label.name + '</dt>' +
				'<dd>' + label.content + '</dd><hr/>'
			);
			lr = true;
		}
		$('#edit-label-list').append(
			'<tr id="' + label.id + '">' + 
				'<td>' + (i + 1) + '</td>' +
				'<td>' + label.name + '</td>' +
				'<td>' + label.content + '</td>' +
				'<td>' + 
					'<button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
					'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
					'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editLabel(this)">编辑</button>' + 
					'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeLabel(this)">删除</button>' + 
				'</td>' +
			'</tr>'
		);
	});
}
//显示label编辑模态框
function showLabelEditModal() {
	$('#label-edit-model').modal({
		backdrop: 'static'
	});
}
//显示单个label编辑模态框
function editLabel(e) {
	var tr = $(e).parent().parent();
	nowEditLabel = tr;
	$('#edit-label-name').text($(tr).find('td:eq(1)').text());
	$('#edit-label-content').val($(tr).find('td:eq(2)').text());
	$('#a-label-edit-model').modal({
		backdrop: 'static'
	});
}
//确认修改单个label
function onEditLabel() {
	$(nowEditLabel).find('td:eq(2)').text($('#edit-label-content').val());
	$('#a-label-edit-model').modal('hide');
}
//确认修改label
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
//新增label事件
function newLabel() {
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
}
//删除单个标签
function removeLabel(e) {
	$(e).parent().parent().remove();
	$('#edit-label-list tr').each(function(i, tr) {
		$(tr).find('td:eq(0)').text(i + 1);
	});
}