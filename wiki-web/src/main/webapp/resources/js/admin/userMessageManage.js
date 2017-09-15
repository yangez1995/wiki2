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
		params.nickname = $('#easy-search').val();
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
	if(!isEmpty($('#search-nickname').val())) {
		params.nickname = $('#search-nickname').val();
	}
	if(!isEmpty($('#search-minAge').val())) {
		params.minAge = $('#search-minAge').val();
	}
	if(!isEmpty($('#search-maxAge').val())) {
		params.maxAge = $('#search-maxAge').val();
	}
	if(!isEmpty($('#search-sex').val())) {
		params.sex = $('#search-sex').val();
	}
	pageIndex = 1;
	resetPage();
	resetList();
}

function resetList() {
	$('#user-message-list').html('');
	params.pageIndex = pageIndex;
	$.post('user/message/getPage', params, function(result) {
		var table = '';
		$(result.data).each(function(i, userMessage) {
			table += '<tr>' +
					 '<td>' + userMessage.id + '</td>' +
					 '<td>' + userMessage.nickname + '</td>'; 
			if(userMessage.age == -1) {
				table += '<td>保密</td>';
			} else {
				table += '<td>' + userMessage.age + '</td>';
			}
			if(userMessage.sex == 'x') {
				table += '<td>保密</td>';
			} else if(userMessage.sex == 'm') {
				table += '<td>男</td>';
			} else {
				table += '<td>女</td>';
			}
		});
		$('#user-message-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.post('user/message/getNumber', params, function(result) {
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

function refresh() {
	params = {};
	pageIndex = 1;
	resetList();
	resetPage();
	$('#easy-search').val('');
	$('#search-id').val('');
	$('#search-nickname').val('');
	$('#search-minAge').val('');
	$('#search-maxAge').val('');
	$('#search-sex').val('');
}