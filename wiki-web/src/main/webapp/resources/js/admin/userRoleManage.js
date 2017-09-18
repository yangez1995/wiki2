var pageIndex = 1;
var pageMax = 1;
var nowSetUserId = 0;
var params = {}
$(document).ready(function() {
	resetList();
	resetPage();
	
	$('#page-go').click(function() {
		var p = $('#page-go-index').val();
		if(p < 1 || p > pageMax) {
			alert('该页不存在！');
		} else {
			pageIndex = parseInt(p);
			resetList();
			resetPage();
		}
	});
	
	$.get('user/role/getRoles', function(result) {
		$(result.data).each(function(i, role) {
			$('#search-role').append('<option value="' + role.id + '">' + role.name + '</option>');
		});
	});
});

function onEasySearch() {
	params = {};
	if(!isEmpty($('#easy-search').val())) {
		params.username = $('#easy-search').val();
	} 
	pageIndex = 1;
	resetPage();
	resetList();
}

function onComplexSearch() {
	params = {};
	if(!isEmpty($('#search-id').val())) {
		params.id = $('#search-id').val();
	}
	if(!isEmpty($('#search-username').val())) {
		params.username = $('#search-username').val();
	}
	if(!isEmpty($('#search-role').val())) {
		params.roleId = $('#search-role').val();
	}
	pageIndex = 1;
	resetPage();
	resetList();
}

function resetAll() {
	resetList();
	resetPage();
}

function resetList() {
	$('#user-role-list').html('');
	params.pageIndex = pageIndex;
	$.post('user/role/getPage', params, function(result) {
		var table = '';
		$(result.data).each(function(i, user) {
			table += '<tr>' +
					 '<td>' + user.id + '</td>' +
					 '<td>' + user.username + '</td>' + 
					 '<td>';
			$(user.roles).each(function(j, role) {
				table += '<span class="label label-primary" style="line-height: 20px;">' + role.name + '</span>&nbsp;';
			});
			table += '</td>' +
					 '<td><button class="btn-xs btn-primary" onclick="setRole(' + replaceQuotes(JSON.stringify(user)) + ')">设置</button></td>'
		});
		$('#user-role-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.post('user/role/getNumber', params, function(result) {
		pageNumber = result.data;
		pageMax = pageNumber;
		$('#page-number').text('共' + pageNumber + '页');
		var pagination = '';
		if(pageIndex >= 3) {
			pagination += '<li><a href="#" onclick="changePage(1)">&laquo;</a></li>';
		}
		if(pageIndex >= 2) {
			pagination += '<li><a href="#" onclick="changePage(' + (pageIndex - 1) + ')">&lt;</a></li>';
		}
		var startIndex = 1;
		if(pageIndex - 4 > 1) {
			startIndex = pageIndex - 4; 
		}
		var endIndex = pageNumber;
		if(pageIndex + 4 < pageNumber) {
			endIndex = pageIndex + 4;
		}
		for(var i = startIndex; i <= endIndex; i++) {
			if(i == pageIndex){
				pagination += '<li class="active"><a href="#">' + i + '</a></li>';
			} else {
				pagination += '<li><a href="#" onclick="changePage(' + i + ')">' + i + '</a></li>';
			}
		}
		if(pageIndex <= pageNumber - 1) {
			pagination += '<li><a href="#" onclick="changePage(' + (pageIndex + 1) + ')">&gt;</a></li>';
		}
		if(pageIndex <= pageNumber - 2) {
			pagination += '<li><a href="#" onclick="changePage(' + pageNumber + ')">&raquo;</a></li>';
		}
		$('#pagination').append(pagination);
	});
}

function changePage(index) {
	pageIndex = index;
	resetList();
	resetPage();
}
/**
 * 点击设置按钮，加载用户角色信息并弹出角色设置模态框
 */
function setRole(user) {
	nowSetUserId = user.id;
	$('#set-role-list').html('');
	var table = '';
	$(user.roles).each(function(i, role){
		table += '<tr id="' + role.id + '">' + 
				     '<td>' + role.name + '</td>' +
				     '<td>' + 
				         '<button class="btn btn-danger btn-xs" onclick="removeRole(this)">移除</button>' + 
				     '</td>' + 
				 '</tr>';
	});
	$('#set-role-list').html(table);
	$('#set-role').modal({
		backdrop: 'static'
	});
}
/**
 * 删除角色
 */
function removeRole(e) {
	$(e).parent().parent().remove();
}
/**
 * 选择添加角色，确定可添加角色并弹出模态框。
 */
function chooseAddRole() {
	var ids = [];
	$('#set-role-list').find('tr').each(function(i, tr) {
		var param = {};
		param.value = $(tr).attr('id');
		ids.push(param);
	});
	$.ajax({
		type : 'POST',
		url : 'user/role/getOtherRoles',
		contentType:"application/json",
		data : JSON.stringify(ids),
		success : function(result) {
			$('#other-roles').html('');
			$(result.data).each(function(i, role) {
				$('#other-roles').append('<option value="' + role.id + '">' + role.name + '</option>');
			});
			$('#add-role').modal({
				backdrop: 'static'
			});
		}
	});
}
/**
 * 添加角色
 */
function addRole() {
	if($('#other-roles').val() != '' && $('#other-roles').val() != null) {
		$('#set-role-list').append(
			'<tr id="' + $('#other-roles').val() + '">' + 
			    '<td>' + $('#other-roles').find('option:selected').text() + '</td>' +
			    '<td>' + 
			        '<button class="btn btn-danger btn-xs" onclick="removeRole(this)">移除</button>' + 
			    '</td>' + 
			'</tr>'	
		);
	}
}

function updateRoles() {
	var ids = [];
	$('#set-role-list').find('tr').each(function(i, tr){
		ids.push($(tr).attr('id'));
	});
	var params = {};
	params.id = nowSetUserId;
	params.ids = ids;
	$.ajax({
		type : 'POST',
		url : 'user/role/update',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(params),
		success : function(result) {
			if(result.code == '200') {
				resetAll();
			}
		}
	});
}

function refresh() {
	params = {};
	pageIndex = 1;
	resetList();
	resetPage();
	$('#easy-search').val('');
	$('#search-id').val('');
	$('#search-username').val('');
	$('#search-role').val('');
}