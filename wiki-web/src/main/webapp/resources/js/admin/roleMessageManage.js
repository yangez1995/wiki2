var updateId = 0;
$(document).ready(function() {
	var options = {
		table : { //表格
			title : '角色信息管理', //表格标题
			insertBtnText : '新建角色', //新建按钮内容
			column : [{
				name : 'ID'
			}, {
				name : '角色名'
			}, {
				name : '描述'
			}, {
				name : '选项',
				width : '100px'
			}],
			ajax : {
				url : 'role/message/getPage', //请求地址
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					var table = '';
					$(result.data.list).each(function(i, roleMessage) {
						table += '<tr><td>' + roleMessage.id + '</td>' +
								 '<td>' + roleMessage.name + '</td>' +
								 '<td>' + roleMessage.describe + '</td>' +
								 '<td><button class="btn-xs btn-primary" onclick="showUpdateModal(' + replaceQuotes(JSON.stringify(roleMessage)) + ')">修改</button>&nbsp;' + 
								 '<button class="btn-xs btn-danger" onclick="showDeletemodal(' + replaceQuotes(JSON.stringify(roleMessage)) + ')">删除</button></td></tr>'
					});
					$('#manageUI-table-tbody').append(table);
					refreshNumber();
				}
			}
		},
		canInsert : true, 
		insertModal : {
			title : '新增角色', 
			body : '<label for="new-role-name">角色名</label>' +
	        	   '<input class="form-control" id="new-role-name" type="text">' +
	        	   '<label for="new-role-des">描述</label>' +
	        	   '<textarea class="form-control" id="new-role-des" rows="3" style="resize: none;"></textarea>', 
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
	        		 '<button type="button" class="btn btn-primary" onclick="insert()">新建角色</button>'
		},
		canDelete : true, 
		deleteModal : {
			title : '删除角色', 
			body : '<label id="role-delete-label" for="confirm-delete">请输入"立即删除"以确定删除角色</label>' +
		           '<input class="form-control" id="confirm-delete" type="text">', 
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-danger" onclick="deleteRole()">删除</button>' 
		},
		canUpdate : true,
		updateModal : { 
			title : '修改角色', 
			body : '<label for="role-name">角色名</label>' +
				   '<input class="form-control" id="role-name" type="text">' +
				   '<label for="role-des">描述</label>' +
				   '<textarea class="form-control" id="role-des" rows="3" style="resize: none;"></textarea>',
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
					 '<button type="button" class="btn btn-primary" onclick="update()">提交更改</button>'
		},
		easySearchParam : ['roleName'],
		complexSearch : true,
		complexSearchItems : [{
			name : 'ID',
			param : 'id',
			type : 'string'
		}, {
			name : '角色名',
			param : 'roleName',
			type : 'string'
		}]
	}
	$('#role-message-manageUI').manageUI(options);
});

function insert() {
	var newName = $('#new-role-name').val();
	if(newName == '' && newName == null) {
		validateErrorFrame('角色名不能为空！');
	} else if (newName.length >=30) {
		validateErrorFrame('角色名过长！');
	} else if($('#new-role-des').val().length >= 200) {
		validateErrorFrame('描述过长！');
	} else {
		$.ajax({
			type : 'POST',
			url : 'role/message/insert',
			data : {
				'name' : $('#new-role-name').val(), 
				'describe' : $('#new-role-des').val()
			},
			success : function(result) {
				if(result.code == '200') {
					$('#insert').modal('hide');
					$('#new-role-name').val('');
					$('#new-role-des').val('');
					refreshPage();
				} else if(result.code == '400') {
					validateErrorFrame(result.msg);
				}
			}
		});
	}
}

function showDeletemodal(role) {
	updateId = role.id;
	$('#role-delete-label').text('请输入"立即删除"以确定删除角色:' + role.name)
	$('#delete').modal({
		backdrop: 'static'
	});
}

function deleteRole() {
	if($('#confirm-delete').val() == '立即删除') {
		$.post('role/message/delete', {'id' : updateId}, function(result) {
			if(result.code == '200') {
				$('#delete').modal('hide');
				refreshPage();
			}
		});
	} else {
		validateErrorFrame('请确认是否正确输入"立即删除"');
	}
}

function showUpdateModal(role) {
	updateId = role.id;
	$('#role-name').val(role.name);
	$('#role-des').val(role.describe);
	$('#update').modal({
		backdrop: 'static'
	});
}

function update() {
	var role = {};
	role.id = updateId;
	role.name = $('#role-name').val();
	role.describe = $('#role-des').val();
	$.ajax({
		type : 'POST',
		url : 'role/message/update',
		contentType : 'application/json',
		data : JSON.stringify(role),
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