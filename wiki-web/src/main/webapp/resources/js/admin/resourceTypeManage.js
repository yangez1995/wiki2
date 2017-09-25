var pageIndex = 1;
var pageMax = 1;
var updateId = 0;
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
		var newName = $('#type-name').val();
		if(newName == '' && newName == null) {
			alert('名称不能为空！');
		} else if (newName.length >=30) {
			alert('名称过长！');
		}
		$.ajax({
			type : 'POST',
			url : 'resource/type/update',
			data : { 'id' : updateId, 'name' : $('#type-name').val() },
			success : function(result) {
				if(result.what == 200) {
					$('#type-update').modal('hide');
					resetList();
				} else if(result.what == 400) {
					alert(result.object);
				}
			}
		});
	});
	
	$('#sub-delete').click(function() {
		if($('#confirm-delete').val() == '立即删除') {
			$.post('resource/type/delete', {'id' : updateId}, function(result) {
				if(result.what == 200) {
					$('#type-delete').modal('hide');
					$('#confirm-delete').val('');
					resetList();
					resetPage();
				}
			});
		} else {
			alert('请确认是否正确输入"立即删除"');
		}
	});
	
	$('#sub-new').click(function() {
		var newName = $('#new-type-name').val();
		var newId = $('#new-type-id').val();
		if(newId == '' && newId == null) {
			alert('ID不能为空！');
		} else if(newId.length != 2) {
			alert('ID为两位字符！');
		} else if(newName == '' && newName == null) {
			alert('名称不能为空！');
		} else if (newName.length >=30) {
			alert('名称过长！');
		} else {
			$.ajax({
				type : 'POST',
				url : 'resource/type/insert',
				data : {
					'id' : $('#new-type-id').val(), 
					'name' : $('#new-type-name').val()
				},
				success : function(result) {
					if(result.what == 200) {
						$('#new-type').modal('hide');
						$('#new-type-name').val('');
						$('#new-type-id').val('');
						resetList();
						resetPage();
					} else if(result.what == 400) {
						alert(result.object);
					}
				}
			});
		}
	});
});

function resetList() {
	$('#resource-type-list').html('');
	$.post('resource/type/getPage', {'pageIndex' : pageIndex}, function(result) {
		var table = '';
		$(result.data).each(function(i, type) {
			table += '<tr>' +
					 '<td>' + type.id + '</td>' +
					 '<td>' + type.name + '</td>' +
					 '<td><button class="btn-xs btn-primary" onclick="typeUpdate(' + replaceQuotes(JSON.stringify(type)) + ')">修改</button>&nbsp;' + 
					 '<button class="btn-xs btn-danger" onclick="typeDelete(' + replaceQuotes(JSON.stringify(type)) + ')">删除</button></td>'
		});
		$('#resource-type-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.get('resource/type/getNumber',function(result) {
		var pageNumber = result.data;
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

function typeUpdate(type) {
	updateId = type.id;
	$('#type-name').val(type.name);
	$('#type-update').modal({
		backdrop: 'static'
	});
}

function typeDelete(type) {
	updateId = type.id;
	$('#type-delete-label').text('请输入"立即删除"以确定删除资源:' + type.name);
	$('#type-delete').modal({
		backdrop: 'static'
	});
}