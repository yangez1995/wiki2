var settings = {};
var pageIndex = 1;
var pageSize = 10;
var pageNumber = 1;

$.fn.manageUI = function(options) {
	//默认配置
	var defaults = {
		table : { //表格
			title : '', //表格标题
			insertBtnText : '新建', //新建按钮内容
			column : [{ //列
				name : '', //列名(不能为空)
				width : '' //列宽度
				//mark : '' //数据字段名(不能为空)
			}],
			ajax : {
				type : 'GET', //请求类型
				url : '', //请求地址
				async : true, //是否异步
				dataType : 'json', //预期返回数据类型
				contentType : 'application/x-www-form-urlencoded', //内容编码类型
				data : {}, //请求数据
				success : function() {}
			}
		},
		canInsert : false, //是否可以新增
		insertModal : { //新增模态框
			title : '新增', //标题
			body : '', //内容
			footer : '' //选项
		},
		canDelete : false, //是否可删除
		deleteModal : { //删除模态框
			title : '删除', //标题
			body : '', //内容
			footer : '' //选项
		},
		canUpdate : false, //是否可修改
		updateModal : { //修改模态框
			title : '修改', //标题
			body : '', //内容
			footer : '' //选项
		}
	}
	settings = $.extend(defaults, options);
	settings.table.ajax.data.pageIndex = pageIndex;
	settings.table.ajax.data.pageSize = pageSize;
	
	//新建表格
	$(this).append('<table class="table table-striped table-bordered" id="manageUI-table"></table>');
	
	//表格标题部分
	if(settings.canInsert) {//是否可以新建行
		$('#manageUI-table').append('<caption>' + settings.table.title + '<button type="button" class="btn btn-primary btn-sm pull-right" onclick="showInsertModal()">' + settings.table.insertBtnText + '</button></caption>');
	} else {
		$('#manageUI-table').append('<caption>资源类型管理</caption>');
	}
	
	//表格列部分
	var thead = '<thead>';
	$(settings.table.column).each(function(i, column) {
		if(column.width != null && column.width != '') {
			thead += '<th width="' + column.width + '">' + column.name + '</th>';
		} else {
			thead += '<th>' + column.name + '</th>';
		}
	});
	thead += '</thead>';
	$('#manageUI-table').append(thead);
	
	//表格数据部分
	$('#manageUI-table').append('<tbody id="manageUI-table-tbody"></tbody>');
	refreshPage();
	
	//页码
	$(this).append(
		'<div class="input-group" style="width: 170px;float: left;">' +
			'<span id="page-number" class="input-group-addon"></span>' +
			'<input type="text" class="form-control" id="page-go-index" placeholder="页数" onkeydown="onlyNum()">' +
			'<span class="input-group-btn">' +
				'<button class="btn btn-default" type="button" onclick="goToPage()">Go!</button>' +
			'</span>' +
		'</div>' +
		'<ul id="pagination" class="pagination" style="margin: 0px;float: right;"></ul>'
	);
	refreshNumber();
	
	//新增模态框
	if(settings.canInsert) {
		$(this).append(modalCreater('insert', settings.insertModal.title, settings.insertModal.body, settings.insertModal.footer));
	}
	
	//删除模态框
	if(settings.canDelete) {
		$(this).append(modalCreater('delete', settings.deleteModal.title, settings.deleteModal.body, settings.deleteModal.footer))
	}
	
	//修改模态框
	if(settings.canUpdate) {
		$(this).append(modalCreater('update', settings.updateModal.title, settings.updateModal.body, settings.updateModal.footer))
	}
}

function refreshPage() {
	settings.table.ajax.data.pageIndex = pageIndex;
	settings.table.ajax.data.pageSize = pageSize;
	$('#manageUI-table-tbody').empty();
	$.ajax({
		type : settings.table.ajax.type,
		url : settings.table.ajax.url,
		async : settings.table.ajax.async,
		dataType : settings.table.ajax.dataType,
		contentType : settings.table.ajax.contentType,
		data : settings.table.ajax.data,
		success : settings.table.ajax.success
	});
}

function modalCreater(id, title, body, footer) {
	var modal = '' +
		'<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-hidden="true">' +
			'<div class="modal-dialog">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
						'<h4 class="modal-title">' + title + '</h4>' +
					'</div>' +
					'<div class="modal-body">' + body + '</div>' +
					'<div class="modal-footer">' + footer + '</div>' +
				'</div>' +
			'</div>' +
		'</div>';
	return modal;
}

function refreshNumber() {
	$('#pagination').html('');
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
}

function goToPage() {
	var p = $('#page-go-index').val();
	$('#page-go-index').val('');
	if(p < 1 || p > pageNumber) {
		alert('该页不存在！');
	} else {
		changePage(parseInt(p));
	}
}

function changePage(index) {
	pageIndex = index;
	refreshPage();
}

function showInsertModal() {
	$('#insert').modal({
		backdrop: 'static'
	});
}