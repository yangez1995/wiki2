var pageIndex = 1;
var pageMax = 1;
var nowSetRoleId = 0;
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
});

function resetAll() {
	resetList();
	resetPage();
}

function resetList() {
	$('#role-auth-list').html('');
	$.get('role/auth/getPage', {'pageIndex' : pageIndex}, function(data) {
		var table = '';
		$(data).each(function(i, role) {
			table += '<tr><td>' + role.id + '</td>' +
					 '<td>' + role.name + '</td>' + 
					 '<td>';
			$(role.authorities).each(function(j, authority) {
				table += '<span class="label label-primary" style="line-height: 20px;">' + authority.name + '</span>&nbsp;';
			});
			table += '</td>' +
					 '<td><button class="btn-xs btn-primary" onclick="setAuth(' + replaceQuotes(JSON.stringify(role)) + ')">设置</button></td>'
		});
		$('#role-auth-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.get('role/auth/getCount',function(pageNumber) {
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

function setAuth(role) {
	nowSetRoleId = role.id;
	$('#set-auth-list').html('');
	var table = '';
	$(role.authorities).each(function(i, authority){
		table += '<tr id="' + authority.id + '">' + 
				 	'<td>' + authority.name + '</td>' +
				 	'<td>' + authority.mark + '</td>' +
				 	'<td><button class="btn btn-danger btn-xs" onclick="removeAuth(this)">移除</button></td>' + 
				 '</tr>'
	});
	$('#set-auth-list').html(table);
	$('#set-auth').modal({
		backdrop: 'static'
	});
}

function removeAuth(e) {
	$(e).parent().parent().remove();
}

function chooseAddAuth() {
	var ids = [];
	$('#set-auth-list').find('tr').each(function(i, tr) {
		var param = {};
		param.value = $(tr).attr('id');
		ids.push(param);
	});
	$.ajax({
		type : 'POST',
		url : 'role/auth/getOtherAuths',
		contentType:"application/json",
		data : JSON.stringify(ids),
		success : function(data) {
			$('#other-auths').html('');
			$(data).each(function(i, msg) {
				$('#other-auths').append('<option value="' + msg.id + ',' + msg.mark + '">' + msg.name + '</option>');
			});
			$('#add-auth').modal({
				backdrop: 'static'
			});
		}
	});
}

function addAuth() {
	if($('#other-auths').val() != '' && $('#other-auths').val() != null) {
		var arr = $('#other-auths').val().split(',');
		$('#set-auth-list').append(
			'<tr id="' + arr[0] + '">' + 
				'<td>' + $('#other-auths').find('option:selected').text() + '</td>' +
				'<td>' + arr[1] + '</td>' +
				'<td><button class="btn btn-danger btn-xs" onclick="removeAuth(this)">移除</button></td>' +
			'</tr>'
		);
	}
}

function updateAuth() {
	var ids = [];
	$('#set-auth-list').find('tr').each(function(i, tr) {
		ids.push($(tr).attr('id'));
	});
	var params = {};
	params.roleId = nowSetRoleId;
	params.authsId = ids;
	$.ajax({
		type : 'POST',
		url : 'role/auth/update',
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