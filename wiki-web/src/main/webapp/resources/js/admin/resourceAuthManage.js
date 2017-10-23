var nowSetId = 0;
$(document).ready(function() {
	var options = {
		table : { //表格
			title : '资源权限管理', //表格标题
			column : [{
				name : 'ID'
			}, {
				name : '资源名'
			}, {
				name : 'URL'
			}, {
				name : '权限'
			}, {
				name : '选项',
				width : '55px'
			}],
			ajax : {
				url : 'resource/auth/getPage', //请求地址
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					var table = '';
					$(result.data.list).each(function(i, resource) {
						table += '<tr>' +
								 '<td>' + resource.id + '</td>' +
								 '<td>' + resource.name + '</td>' + 
								 '<td>' + resource.url + '</td>' + 
								 '<td>';
						$(resource.auths).each(function(j, auth) {
							table += '<span class="label label-primary" style="line-height: 20px;">' + auth.name + '</span>&nbsp;';
						});
						table += '</td>' +
								 '<td><button class="btn-xs btn-primary" onclick="showUpdateModal(' + replaceQuotes(JSON.stringify(resource)) + ')">设置</button></td>'
					});
					$('#manageUI-table-tbody').append(table);
					refreshNumber();
				}
			}
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
			name : '权限',
			param : 'auth',
			type : 'select',
			url : 'role/auth/getAuths'
		}],
		canUpdate : true, 
		updateModal : { 
			title : '设置角色',
			body : '<table class="table table-striped table-bordered model-table">' +
					   '<thead><tr>' + 
					   	   '<th>权限名</th>' + 
					   	   '<th>权限代码</th>' +
					   	   '<th width="43px">选项</th>' +
					   '</tr></thead>' +
					   '<tbody id="set-auth-list"></tbody>' +
				   '</table>', 
			footer : '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="updateAuths()">确认</button>' +
					 '<button type="button" class="btn btn-info" onclick="chooseAddAuth()">添加权限</button>'
		},
	}
	$('#resource-auth-manageUI').manageUI(options);
});

/**
 * 点击设置按钮，加载角色权限信息并弹出角色设置模态框
 */
function showUpdateModal(resource) {
	nowSetId = resource.id;
	$('#set-auth-list').html('');
	var table = '';
	$(resource.auths).each(function(i, auth){
		table += '<tr id="' + auth.id + '">' + 
					 '<td>' + auth.name + '</td>' +
					 '<td>' + auth.mark + '</td>' +
					 '<td>' + 
					 	 '<button class="btn btn-danger btn-xs" onclick="removeAuth(this)">移除</button>' + 
					 '</td>' + 
				 '</tr>';
	});
	$('#set-auth-list').html(table);
	$('#update').modal({
		backdrop: 'static'
	});
}
/**
 * 移除权限
 */
function removeAuth(e) {
	$(e).parent().parent().remove();
}
/**
 * 选择添加权限，确定可添加权限并弹出模态框。
 */
function chooseAddAuth() {
	var ids = [];
	$('#set-auth-list').find('tr').each(function(i, tr) {
		var param = {};
		param.value = $(tr).attr('id');
		ids.push(param);
	});
	$.ajax({
		type : 'POST',
		url : 'resource/auth/getOtherAuths',
		contentType:"application/json",
		data : JSON.stringify(ids),
		success : function(result) {
			$('#other-auths').html('');
			$(result.data).each(function(i, auth) {
				$('#other-auths').append('<option value="' + auth.id + ',' + auth.mark + '">' + auth.name + '</option>');
			});
			$('#add-auth').modal({
				backdrop: 'static'
			});
		}
	});
}
/**
 * 添加权限
 */
function addAuth() {
	if($('#other-auths').val() != '' && $('#other-auths').val() != null) {
		var arr = $('#other-auths').val().split(',');
		$('#set-auth-list').append(
			'<tr id="' + arr[0] + '">' + 
			    '<td>' + $('#other-auths').find('option:selected').text() + '</td>' +
			    '<td>' + arr[1] + '</td>' +
			    '<td>' + 
			        '<button class="btn btn-danger btn-xs" onclick="removeAuth(this)">移除</button>' + 
			    '</td>' + 
			'</tr>'	
		);
	}
}

function updateAuths() {
	var ids = [];
	$('#set-auth-list').find('tr').each(function(i, tr){
		ids.push($(tr).attr('id'));
	});
	var params = {};
	params.id = nowSetId;
	params.ids = ids;
	$.ajax({
		type : 'POST',
		url : 'resource/auth/update',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(params),
		success : function(result) {
			if(result.code == '200') {
				refreshPage();
			}
		}
	});
}