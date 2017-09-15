var pageIndex = 1;
var pageMax = 1;
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
	if(!isEmpty($('#search-name').val())) {
		params.username = $('#search-name').val();
	}
	if(!isEmpty($('#search-locked').val())) {
		params.locked = $('#search-locked').val();
	}
	pageIndex = 1;
	resetPage();
	resetList();
}

function resetList() {
	$('#user-account-list').html('');
	params.pageIndex = pageIndex;
	$.post('user/account/getPage', params, function(result) {
		var table = '';
		$(result.data).each(function(i, user) {
			table += '<tr>' +
					 '<td>' + user.id + '</td>' +
					 '<td>' + user.username + '</td>' +
					 '<td>' + user.regDate + '</td>' +
					 '<td>' + user.logTime + '</td>';
			if(user.locked == 'f') {
				table += '<td>可用</td>' +
						 '<td><button class="btn-xs btn-danger" onclick="lockUser(' + user.id + ')">锁定</button></td>' +
						 '</tr>';
			} else {
				table += '<td>禁用</td>' +
					  	 '<td><button class="btn-xs btn-primary" onclick="unlockUser(' + user.id + ')">解锁</button></td>' +
						 '</tr>';
			}
		});
		$('#user-account-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.post('user/account/getNumber', params,function(result) {
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

function lockUser(id) {
	$.post('user/account/lock', {'id' : id}, function(result) {
		if(result.code == '200') {
			resetList();
		}
	});
}

function unlockUser(id) {
	$.post('user/account/unlock', {'id' : id}, function(result) {
		if(result.code == '200') {
			resetList();
		}
	});
}

function changePage(index) {
	pageIndex = index;
	resetList();
	resetPage();
}

function refresh() {
	params = {};
	pageIndex = 1;
	resetList();
	resetPage();
	$('#easy-search').val('');
	$('#search-id').val('');
	$('#search-name').val('');
	$('#search-locked').val('');
}