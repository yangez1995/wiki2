var updateId = 0;
$(document).ready(function() {
	var options = {
		table : { //表格
			title : '资源信息管理', //表格标题
			insertBtnText : '新建资源', //新建按钮内容
			column : [{
				name : 'ID'
			}, {
				name : '资源名'
			}, {
				name : 'URL'
			}, {
				name : '类型'
			}, {
				name : '描述'
			}, {
				name : '选项',
				width : '100px'
			}],
			ajax : {
				url : 'resource/message/getPage', //请求地址
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					var table = '';
					$(result.data.list).each(function(i, resource) {
						table += '<tr>' +
								 '<td>' + resource.id + '</td>' +
								 '<td>' + resource.name + '</td>' +
								 '<td>' + resource.url + '</td>' +
								 '<td>' + resource.typeName + '</td>' +
								 '<td>' + resource.des + '</td>' +
								 '<td><button class="btn-xs btn-primary" onclick="showUpdateModal(' + replaceQuotes(JSON.stringify(resource)) + ')">修改</button>&nbsp;' + 
								 '<button class="btn-xs btn-danger" onclick="showDeleteModal(' + replaceQuotes(JSON.stringify(resource)) + ')">删除</button></td>'
					});
					$('#manageUI-table-tbody').append(table);
					refreshNumber();
				}
			}
		},
		canInsert : true, 
		insertModal : {
			title : '新增资源', 
			body : '<label for="new-resource-name">资源名</label>' +
	        	   '<input class="form-control" id="new-resource-name" type="text">' +
	        	   '<label for="new-resource-url">URL</label>' +
	        	   '<input class="form-control" id="new-resource-url" type="text">' +
	        	   '<label for="new-resource-type">类型</label>' +
	        	   '<select class="form-control" id="new-resource-type"><option value="">-- 请选择 --</option></select>' +
	        	   '<label for="new-resource-des">描述</label>' +
	        	   '<textarea class="form-control" id="new-resource-des" rows="3" style="resize: none;"></textarea>',
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
	        		 '<button type="button" class="btn btn-primary" onclick="insert()">新建资源</button>'
		},		
		canDelete : true, 
		deleteModal : {
			title : '删除资源', 
			body : '<label id="resource-delete-label" for="confirm-delete">请输入"立即删除"以确定删除资源</label>' +
		           '<input class="form-control" id="confirm-delete" type="text">', 
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-danger" onclick="deleteResource()">删除</button>' 
		},
		canUpdate : true,
		updateModal : { 
			title : '修改资源', 
			body : '<label for="resource-name">资源名</label>' +
				   '<input class="form-control" id="resource-name" type="text">' +
				   '<label for="resource-url">URL</label>' +
				   '<input class="form-control" id="resource-url" type="text">' +
				   '<label for="resource-type">类型</label>' +
				   '<select class="form-control" id="resource-type"><option value="">-- 请选择 --</option></select>' +
				   '<label for="resource-des">描述</label>' +
				   '<textarea class="form-control" id="resource-des" rows="3" style="resize: none;"></textarea>',				   
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
					 '<button type="button" class="btn btn-primary" onclick="update()">提交更改</button>'
		},
		easySearchParam : ['name', 'url'],
		complexSearch : true,
		complexSearchItems : [{
			name : 'ID',
			param : 'id',
			type : 'string'
		}, {
			name : '资源名',
			param : 'name',
			type : 'string'
		}, {
			name : 'URL',
			param : 'url',
			type : 'string'
		}, {
			name : '资源类型',
			param : 'type',
			type : 'select',
			url : 'resource/message/getTypes'
		}]
	}
	$('#resource-message-manageUI').manageUI(options);
});

function insert() {
	var newName = $('#new-resource-name').val();
	if(isEmpty($('#new-resource-type').val())) {
		alert('请选择类型！');
	} else if(newName == '' && newName == null) {
		alert('资源名不能为空！');
	} else if (newName.length >=30) {
		alert('资源名过长！');
	} else if($('#new-resource-des').val().length >= 200) {
		alert('资源描述过长！');
	} else {
		$.ajax({
			type : 'POST',
			url : 'resource/message/insert',
			data : JSON.stringify({
				'name' : $('#new-resource-name').val(), 
				'url' : $('#new-resource-url').val(), 
				'type' : $('#new-resource-type').val(), 
				'describe' : $('#new-resource-des').val()
			}),
			contentType : 'application/json',
			success : function(result) {
				if(result.code == '200') {
					$('#insert').modal('hide');
					$('#new-resource-name').val('');
					$('#new-resource-url').val('');
					$('#new-resource-type').val('');
					$('#new-resource-des').val('');
					refreshPage();
				} else {
					validateErrorFrame(result.msg);
				}
			}
		});
	}
}

function showDeleteModal(resource) {
	updateId = resource.id;
	$('#resource-delete-label').text('请输入"立即删除"以确定删除资源:' + resource.name + resource.url);
	$('#delete').modal({
		backdrop: 'static'
	});
}

function deleteResource() {
	if($('#confirm-delete').val() == '立即删除') {
		$.post('resource/message/delete', {'id' : updateId}, function(result) {
			if(result.code == '200') {
				$('#delete').modal('hide');
				refreshPage();
			} else {
				validateErrorFrame(result.msg);
			}
		});
	} else {
		validateErrorFrame('请确认是否正确输入"立即删除"');
	}
}

function showUpdateModal(resource) {
	updateId = resource.id;
	$('#resource-name').val(resource.name);
	$('#resource-url').val(resource.url);
	$('#resource-des').val(resource.des);
	$('#resource-type').val(resource.type);
	$('#update').modal({
		backdrop: 'static'
	});
}

function update() {
	$.ajax({
		type : 'POST',
		url : 'resource/message/update',
		data : JSON.stringify({
			'id' : updateId,
			'name' : $('#resource-name').val(),
			'url' : $('#resource-url').val(),
			'type' : $('#resource-type').val(),
			'describe' : $('#resource-des').val()}),
		contentType : 'application/json',
		success : function(result) {
			if(result.code == '200') {
				$('#update').modal('hide');
				refreshPage();
			} else {
				validateErrorFrame(result.msg);
			}
		}
	});
}