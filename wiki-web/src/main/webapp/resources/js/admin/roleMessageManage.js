var pageIndex = 1;
var pageMax = 1;
var updateId = 0;
var params = {};
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
	
	$('#sub-update').click(function() {
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
					$('#role-update').modal('hide');
					resetList();
				}
			}
		});
	});
	
	$('#sub-delete').click(function() {
		if($('#confirm-delete').val() == '立即删除') {
			$.post('role/message/delete', {'id' : updateId}, function(result) {
				if(result.code == '200') {
					$('#role-delete').modal('hide');
					resetList();
					resetPage();
				}
			});
		} else {
			validateErrorFrame('请确认是否正确输入"立即删除"');
		}
	});
	
	$('#sub-new').click(function() {
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
						$('#new-role').modal('hide');
						$('#new-role-name').val('');
						$('#new-role-des').val('');
						resetList();
						resetPage();
					} else if(result.code == '400') {
						validateErrorFrame(result.msg);
					}
				}
			});
		}
	});
});

function resetList() {
	$('#role-list').html('');
	params.pageIndex = pageIndex;
	$.get('role/message/getPage', params, function(result) {
		var table = '';
		$(result.data).each(function(i, roleMessage) {
			table += '<tr><td>' + roleMessage.id + '</td>' +
					 '<td>' + roleMessage.name + '</td>' +
					 '<td>' + roleMessage.describe + '</td>' +
					 '<td><button class="btn-xs btn-primary" onclick="roleUpdate(' + replaceQuotes(JSON.stringify(roleMessage)) + ')">修改</button>&nbsp;' + 
					 '<button class="btn-xs btn-danger" onclick="roleDelete(' + replaceQuotes(JSON.stringify(roleMessage)) + ')">删除</button></td></tr>'
		});
		$('#role-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.get('role/message/getNumber', params, function(result) {
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
	resetPage()
}

function roleUpdate(role) {
	updateId = role.id;
	$('#role-name').val(role.name);
	$('#role-des').val(role.describe);
	$('#role-update').modal({
		backdrop: 'static'
	});
}

function roleDelete(role) {
	updateId = role.id;
	$('#role-delete-label').text('请输入"立即删除"以确定删除角色:' + role.name)
	$('#role-delete').modal({
		backdrop: 'static'
	});
}