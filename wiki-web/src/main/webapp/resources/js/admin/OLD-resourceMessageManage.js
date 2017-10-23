var pageIndex = 1;
var pageMax = 1;
var updateId = 0;
var params = {};
$(document).ready(function() {
	resetList();
	resetPage();
	$.get('resource/message/getType', function(result) {
		$(result.data).each(function(i, type) {
			$('#new-resource-type').append('<option value="' + type.id + '">' + type.name + '</option>');
			$('#resource-type').append('<option value="' + type.id + '">' + type.name + '</option>');
			$('#search-type').append('<option value="' + type.id + '">' + type.name + '</option>');
		});
	});
	
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
		$.ajax({
			type : 'POST',
			url : 'resource/message/update',
			data : JSON.stringify({
				'id' : updateId,
				'name' : $('#resource-name').val(),
				'url' : $('#resource-url').val(),
				'type' : $('#resource-type').val(),
				'describe' : $('#resource-des').val()}),
			contentType : 'application/json',
			success : function(result) {
				if(result.code == '200') {
					$('#resource-update').modal('hide');
					resetList();
				} else {
					alert(result.object);
				}
			}
		});
	});
	
	$('#sub-delete').click(function() {
		if($('#confirm-delete').val() == '立即删除') {
			$.post('resource/message/delete', {'id' : updateId}, function(result) {
				if(result.code == '200') {
					$('#resource-delete').modal('hide');
					resetList();
					resetPage();
				}
			});
		} else {
			alert('请确认是否正确输入"立即删除"');
		}
	});
	
	$('#sub-new').click(function() {
		var newName = $('#new-resource-name').val();
		if(isEmpty($('#new-resource-type').val())) {
			alert('请选择类型！');
		} else if(newName == '' && newName == null) {
			alert('资源名不能为空！');
		} else if (newName.length >=30) {
			alert('资源名过长！');
		} else if($('#new-resource-des').val().length >= 200) {
			alert('资源描述过长！');
		} else {
			$.ajax({
				type : 'POST',
				url : 'resource/message/insert',
				data : JSON.stringify({
					'name' : $('#new-resource-name').val(), 
					'url' : $('#new-resource-url').val(), 
					'type' : $('#new-resource-type').val(), 
					'describe' : $('#new-resource-des').val()
				}),
				contentType : 'application/json',
				success : function(result) {
					if(result.code == '200') {
						$('#new-resource').modal('hide');
						$('#new-resource-name').val('');
						$('#new-resource-url').val('');
						$('#new-resource-type').val('');
						$('#new-resource-des').val('');
						resetList();
						resetPage();
					} else {
						alert(result.object);
					}
				}
			});
		}
	});
});

function onEasySearch() {
	params = {};
	if(!isEmpty($('#easy-search').val())) {
		params.name = $('#easy-search').val();
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
		params.name = $('#search-name').val();
	}
	if(!isEmpty($('#search-url').val())) {
		params.url = $('#search-url').val();
	}
	if(!isEmpty($('#search-type').val())) {
		params.type = $('#search-type').val();
	}
	pageIndex = 1;
	resetPage();
	resetList();
}

function resetList() {
	$('#resource-list').html('');
	params.pageIndex = pageIndex;
	$.post('resource/message/getPage', params, function(result) {
		var table = '';
		$(result.data).each(function(i, resource) {
			table += '<tr>' +
					 '<td>' + resource.id + '</td>' +
					 '<td>' + resource.name + '</td>' +
					 '<td>' + resource.url + '</td>' +
					 '<td>' + resource.typeName + '</td>' +
					 '<td>' + resource.des + '</td>' +
					 '<td><button class="btn-xs btn-primary" onclick="roleUpdate(' + replaceQuotes(JSON.stringify(resource)) + ')">修改</button>&nbsp;' + 
					 '<button class="btn-xs btn-danger" onclick="roleDelete(' + replaceQuotes(JSON.stringify(resource)) + ')">删除</button></td>'
		});
		$('#resource-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.post('resource/message/getNumber', params, function(result) {
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

function roleUpdate(resource) {
	updateId = resource.id;
	$('#resource-name').val(resource.name);
	$('#resource-url').val(resource.url);
	$('#resource-des').val(resource.des);
	$('#resource-type').val(resource.type);
	$('#resource-update').modal({
		backdrop: 'static'
	});
}

function roleDelete(resource) {
	updateId = resource.id;
	$('#resource-delete-label').text('请输入"立即删除"以确定删除资源:' + resource.name + resource.url);
	$('#resource-delete').modal({
		backdrop: 'static'
	});
}

function refresh() {
	params = {};
	pageIndex = 1;
	resetList();
	resetPage();
	$('#easy-search').val('');
	$('#search-id').val('');
	$('#search-name').val('');
	$('#search-url').val('');
	$('#search-type').val('');
}