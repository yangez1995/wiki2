var updateId = 0;
$(document).ready(function() {
	var options = {
		table : { //表格
			title : '权限信息管理', //表格标题
			insertBtnText : '新建权限', //新建按钮内容
			column : [{
				name : 'ID'
			}, {
				name : '权限名'
			}, {
				name : '权限代码'
			}, {
				name : '描述'
			}, {
				name : '选项',
				width : '100px'
			}],
			ajax : {
				url : 'auth/message/getPage', //请求地址
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					var table = '';
					$(result.data.list).each(function(i, authMessage) {
						table += '<tr>' +
								 	 '<td>' + authMessage.id + '</td>' +
								 	 '<td>' + authMessage.name + '</td>' +
								 	 '<td>' + authMessage.mark + '</td>' +
								 	 '<td>' + authMessage.describe + '</td>' +
								 	 '<td>' + 
								 	 	 '<button class="btn-xs btn-primary" onclick="showUpdateModal(' + replaceQuotes(JSON.stringify(authMessage)) + ')">修改</button>&nbsp;' + 
								 	 	 '<button class="btn-xs btn-danger" onclick="showDeletemodal(' + replaceQuotes(JSON.stringify(authMessage)) + ')">删除</button>' + 
								 	 '</td>' + 
								 '</tr>'
					});
					$('#manageUI-table-tbody').append(table);
					refreshNumber();
				}
			}
		},
		canInsert : true, 
		insertModal : {
			title : '新增权限', 
			body : '<label for="new-auth-name">权限名</label>' +
	        	   '<input class="form-control" id="new-auth-name" type="text">' +
	        	   '<label for="new-auth-mark">权限代号</label>' +
	        	   '<input class="form-control" id="new-auth-mark" type="text">' +
	        	   '<label for="new-auth-des">描述</label>' +
	        	   '<textarea class="form-control" id="new-auth-des" rows="3" style="resize: none;"></textarea>', 
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
	        		 '<button type="button" class="btn btn-primary" onclick="insert()">新建权限</button>'
		},
		
		canDelete : true, 
		deleteModal : {
			title : '删除权限', 
			body : '<label id="auth-delete-label" for="confirm-delete">请输入"立即删除"以确定删除权限</label>' +
		           '<input class="form-control" id="confirm-delete" type="text">', 
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-danger" onclick="deleteAuth()">删除</button>' 
		},
		canUpdate : true,
		updateModal : { 
			title : '修改权限', 
			body : '<label for="new-auth-name">权限名</label>' +
				   '<input class="form-control" id="auth-name" type="text">' +
				   '<label for="new-auth-des">描述</label>' +
				   '<textarea class="form-control" id="auth-des" rows="3" style="resize: none;"></textarea>',				   
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
					 '<button type="button" class="btn btn-primary" onclick="update()">提交更改</button>'
		},
		easySearchParam : ['authName', 'authMark'],
		complexSearch : true,
		complexSearchItems : [{
			name : 'ID',
			param : 'id',
			type : 'string'
		}, {
			name : '权限名',
			param : 'authName',
			type : 'string'
		}, {
			name : '权限代码',
			param : 'authMark',
			type : 'string'
		}]
	}
	$('#auth-message-manageUI').manageUI(options);
});

function insert() {
	var newName = $('#new-auth-name').val();
	var newMark = $('#new-auth-mark').val();
	if(newName == '' && newName == null) {
		alert('权限名不能为空！');
	} else if (newName.length >=30) {
		alert('权限名过长！');
	} else if(newMark == '' && newName == null) {
		alert('权限代码不能为空！');
	} else if (newMark.length >=30) {
		alert('权限代码过长！');
	} else if($('#new-auth-des').val().length >= 200) {
		alert('权限描述过长！');
	} else {
		$.post('auth/message/insert', {
			'name' : $('#new-auth-name').val(), 
			'mark' : $('#new-auth-mark').val(),
			'describe' : $('#new-auth-des').val()
			}, function(result) {
				if(result.code == '200') {
					$('#insert').modal('hide');
					$('#new-auth-name').val('');
					$('#new-auth-mark').val('');
					$('#new-auth-des').val('');
					refreshPage();
				} else {
					validateErrorFrame(result.msg);
				}
			});
	}
}

function showDeletemodal(auth) {
	updateId = auth.id;
	$('#auth-delete-label').text('请输入"立即删除"以确定删除权限:' + auth.name)
	$('#delete').modal({
		backdrop: 'static'
	});
}

function deleteAuth() {
	if($('#confirm-delete').val() == '立即删除') {
		$.post('auth/message/delete', {'id' : updateId}, function(result) {
			if(result.code == '200') {
				$('#delete').modal('hide');
				refreshPage();
			}
		});
	} else {
		validateErrorFrame('请确认是否正确输入"立即删除"');
	}
}

function showUpdateModal(auth) {
	updateId = auth.id;
	$('#auth-name').val(auth.name);
	$('#auth-des').val(auth.describe);
	$('#update').modal({
		backdrop: 'static'
	});
}

function update() {
	updateParams = {};
	updateParams.id = updateId;
	updateParams.name = $('#auth-name').val();
	updateParams.describe = $('#auth-des').val();
	
	$.ajax({
		type : 'POST',
		url : 'auth/message/update',
		contentType : 'application/json',
		data : JSON.stringify(updateParams),
		success : function(result) {
			if(result.code == '200') {
				$('#update').modal('hide');
				refreshPage();
			}
		}
	});
}