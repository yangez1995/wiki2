var updateId = 0;
$(document).ready(function() {
	var options = {
		table : { //表格
			title : '资源类别管理', //表格标题
			insertBtnText : '新建类别', //新建按钮内容
			column : [{
				name : 'ID'
			}, {
				name : '名称'
			}, {
				name : '选项',
				width : '100px'
			}],
			ajax : {
				url : 'resource/type/getPage', //请求地址
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					var table = '';
					$(result.data.list).each(function(i, type) {
						table += '<tr>' +
								 '<td>' + type.id + '</td>' +
								 '<td>' + type.name + '</td>' +
								 '<td><button class="btn-xs btn-primary" onclick="showUpdateModal(' + replaceQuotes(JSON.stringify(type)) + ')">修改</button>&nbsp;' + 
								 '<button class="btn-xs btn-danger" onclick="showDeleteModal(' + replaceQuotes(JSON.stringify(type)) + ')">删除</button></td>'
					});
					$('#manageUI-table-tbody').append(table);
					refreshNumber();
				}
			}
		},
		canInsert : true, 
		insertModal : {
			title : '新增资源', 
			body : '<label for="new-type-id">ID</label>' +
	        	   '<input class="form-control" id="new-type-id" type="text">' +
	        	   '<label for="new-type-name">名称</label>' +
	        	   '<input class="form-control" id="new-type-name" type="text">',
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
	        		 '<button type="button" class="btn btn-primary" onclick="insert()">新建</button>'
		},		
		canDelete : true, 
		deleteModal : {
			title : '删除资源', 
			body : '<label id="resource-delete-label" for="confirm-delete">请输入"立即删除"以确定删除资源</label>' +
		           '<input class="form-control" id="confirm-delete" type="text">', 
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-danger" onclick="deleteType()">删除</button>' 
		},
		canUpdate : true,
		updateModal : { 
			title : '修改资源', 
			body : '<label for="type-name">名称</label>' +
	        	   '<input class="form-control" id="type-name" type="text">',				   
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
					 '<button type="button" class="btn btn-primary" onclick="update()">提交更改</button>'
		},	
		easySearchParam : ['id','name'],
	}
	$('#resource-type-manageUI').manageUI(options);
});

function insert() {
	var newName = $('#new-type-name').val();
	var newId = $('#new-type-id').val();
	if(newId == '' && newId == null) {
		alert('ID不能为空！');
	} else if(newId.length != 2) {
		alert('ID为两位字符！');
	} else if(newName == '' && newName == null) {
		alert('名称不能为空！');
	} else if (newName.length >=30) {
		alert('名称过长！');
	} else {
		$.ajax({
			type : 'POST',
			url : 'resource/type/insert',
			data : {
				'id' : $('#new-type-id').val(), 
				'name' : $('#new-type-name').val()
			},
			success : function(result) {
				if(result.code == '200') {
					$('#insert').modal('hide');
					$('#new-type-name').val('');
					$('#new-type-id').val('');
					refreshPage();
				} else if(result.what == 400) {
					validateErrorFrame(result.msg);
				}
			}
		});
	}
}

function showDeleteModal(type) {
	updateId = type.id;
	$('#type-delete-label').text('请输入"立即删除"以确定删除资源:' + type.name);
	$('#delete').modal({
		backdrop: 'static'
	});
}

function deleteType() {
	if($('#confirm-delete').val() == '立即删除') {
		$.post('resource/type/delete', {'id' : updateId}, function(result) {
			if(result.code == '200') {
				$('#delete').modal('hide');
				$('#confirm-delete').val('');
				refreshPage();
			} else {
				validateErrorFrame(result.msg);
			}
		});
	} else {
		validateErrorFrame('请确认是否正确输入"立即删除"');
	}
}

function showUpdateModal(type) {
	updateId = type.id;
	$('#type-name').val(type.name);
	$('#update').modal({
		backdrop: 'static'
	});
}

function update() {
	var newName = $('#type-name').val();
	if(newName == '' && newName == null) {
		alert('名称不能为空！');
	} else if (newName.length >=30) {
		alert('名称过长！');
	}
	$.ajax({
		type : 'POST',
		url : 'resource/type/update',
		data : { 'id' : updateId, 'name' : $('#type-name').val() },
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