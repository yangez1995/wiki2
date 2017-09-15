var pageIndex = 1;
var pageMax = 1;
var nowSetId = 0;
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
	
	$.get('resource/auth/getAllAuths', function(data) {
		$(data).each(function(i, auth) {
			$('#search-auth').append('<option value="' + auth.id + '">' + auth.name + '</option>');
		});
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
	if(!isEmpty($('#search-auth').val())) {
		params.authId = $('#search-auth').val();
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
	$('#resource-auth-list').html('');
	params.pageIndex = pageIndex;
	$.post('resource/auth/searchPage', params, function(data) {
		var table = '';
		$(data).each(function(i, resource) {
			table += '<tr>' +
					 '<td>' + resource.id + '</td>' +
					 '<td>' + resource.name + '</td>' + 
					 '<td>' + resource.url + '</td>' + 
					 '<td>';
			$(resource.auths).each(function(j, auth) {
				table += '<span class="label label-primary" style="line-height: 20px;">' + auth.name + '</span>&nbsp;';
			});
			table += '</td>' +
					 '<td><button class="btn-xs btn-primary" onclick="setAuth(' + replaceQuotes(JSON.stringify(resource)) + ')">设置</button></td>'
		});
		$('#resource-auth-list').append(table);
	});
}

function resetPage() {
	$('#pagination').html('');
	$.post('resource/auth/searchNumber', params, function(pageNumber) {
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
 * 点击设置按钮，加载资源权限信息并弹出权限设置模态框
 */
function setAuth(resource) {
	nowSetId = resource.id;
	$('#set-auth-list').html('');
	var table = '';
	$(resource.auths).each(function(i, auth){
		table += '<tr><td>' + auth.name + '</td>' +
				 '<td><button class="btn btn-danger btn-xs" onclick="removeAuth(' + resource.id + ',' + auth.id + ')">移除</button></td></tr>';
	});
	$('#set-auth-list').html(table);
	$('#set-auth').modal({
		backdrop: 'static'
	});
}
/**
 * 删除权限
 * @param userId 要删除的资源id
 * @param roleId 要删除的权限id
 */
function removeAuth(resourceId, authId) {
	$.post('resource/auth/delete', {'resourceId' : resourceId, 'authId' : authId}, function(result) {
		if(result.what == 200) {
			resetSetList(resourceId);
		}
	});
}
/**
 * 选择添加权限，确定可添加权限并弹出模态框。
 */
function chooseAddAuth() {
	$.post('resource/auth/getOtherAuths', {'id' : nowSetId}, function(data) {
		$('#other-auths').html('');
		$(data).each(function(i, auth) {
			$('#other-auths').append('<option value="' + auth.id + '">' + auth.name + '</option>');
		});
		$('#add-auth').modal({
			backdrop: 'static'
		});
	});
}
/**
 * 添加权限
 */
function addAuth() {
	if(!isEmpty($('#other-auths').val())) {
		$.post('resource/auth/insert', {'resourceId' : nowSetId, 'authId' : $('#other-auths').val()}, function(result) {
			if(result.what == 200) {
				resetSetList(nowSetId);
			}
		});
	}
}
/**
 * 重置权限设置表格
 * @param userId 当前设置中权限id
 */
function resetSetList(resourceId) {
	$.post('resource/auth/getAuthsByResourceId', {'id' : resourceId}, function(data) {
		var table = '';
		$(data).each(function(i, auth){
			table += '<tr><td>' + auth.name + '</td>' +
					 '<td><button class="btn btn-danger btn-xs" onclick="removeAuth(' + resourceId + ',' + auth.id + ')">移除</button></td></tr>';
		});
		$('#set-auth-list').html(table);
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
	$('#search-auth').val('');
}