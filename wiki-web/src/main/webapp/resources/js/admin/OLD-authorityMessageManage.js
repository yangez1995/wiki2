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
		params = {};
		params.id = updateId;
		params.name = $('#auth-name').val();
		params.describe = $('#auth-des').val();
		
		$.ajax({
			type : 'POST',
			url : 'auth/update',
			contentType : 'application/json',
			data : JSON.stringify(params),
			success : function(result) {
				if(result.code == '200') {
					$('#auth-update').modal('hide');
					resetList();
				}
			}
		});
	});
	
	$('#sub-delete').click(function() {
		if($('#confirm-delete').val() == '立即删除') {
			$.post('auth/delete', {'id' : updateId}, function(result) {
				if(result.code == '200') {
					$('#auth-delete').modal('hide');
					resetList();
					resetPage();
				}
			});
		} else {
			alert('请确认是否正确输入\"立即删除\"');
		}
	});
	
	$('#sub-new').click(function() {
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
			$.post('auth/insert', {
				'name' : $('#new-auth-name').val(), 
				'mark' : $('#new-auth-mark').val(),
				'describe' : $('#new-auth-des').val()
				}, function(result) {
					if(result.code == '200') {
						$('#new-auth').modal('hide');
						$('#new-auth-name').val('');
						$('#new-auth-mark').val('');
						$('#new-auth-des').val('');
						resetList();
						resetPage();
					} else {
						validateErrorFrame(result.msg);
					}
				});
		}
	});
});

function resetList() {
	$('#auth-list').html('');
	$.get('auth/getPage', {'pageIndex' : pageIndex}, function(result) {
		var table = '';
		$(result.data).each(function(i, authMessage) {
			table += '<tr>' +
					 	 '<td>' + authMessage.id + '</td>' +
					 	 '<td>' + authMessage.name + '</td>' +
					 	 '<td>' + authMessage.mark + '</td>' +
					 	 '<td>' + authMessage.describe + '</td>' +
					 	 '<td>' + 
					 	 	 '<button class="btn-xs btn-primary" onclick="roleUpdate(' + replaceQuotes(JSON.stringify(authMessage)) + ')">修改</button>&nbsp;' + 
					 	 	 '<button class="btn-xs btn-danger" onclick="roleDelete(' + replaceQuotes(JSON.stringify(authMessage)) + ')">删除</button>' + 
					 	 '</td>' + 
					 '</tr>'
		});
		$('#auth-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.get('auth/getNumber',function(result) {
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

function roleUpdate(auth) {
	updateId = auth.id;
	$('#auth-name').val(auth.name);
	$('#auth-des').val(auth.describe);
	$('#auth-update').modal({
		backdrop: 'static'
	});
}

function roleDelete(auth) {
	updateId = auth.id;
	$('#auth-delete-label').text('请输入"立即删除"以确定删除权限:' + auth.name)
	$('#auth-delete').modal({
		backdrop: 'static'
	});
}