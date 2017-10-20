var settings = {};
var pageIndex = 1;
var pageSize = 10;
var pageNumber = 1;
var params = {};
var easySearchParam = [];

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
				url : '', //请求地址
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
		},
		easySearchParam : [], //简单搜索字段
		complexSearch : false, //是否支持复杂搜索
		complexSearchItems : [{
			name : '', //显示名
			param : '', //参数名
			type : '', //类型, string、select、number
			url : '' //当类型为select时请求url
		}]
	}
	settings = $.extend(defaults, options);
	params.pageIndex = pageIndex;
	params.pageSize = pageSize;
	
	//新建表格
	$(this).append('<div class="table-responsive"><table class="table table-striped table-bordered" id="manageUI-table"></table></div>');
	
	//表格标题部分
	if(settings.canInsert) {//是否可以新建行
		$('#manageUI-table').append('<caption class="hidden-xs">' + settings.table.title + '<button type="button" class="btn btn-primary btn-sm pull-right" onclick="showInsertModal()">' + settings.table.insertBtnText + '</button></caption>');
	} else {
		$('#manageUI-table').append('<caption class="hidden-xs">' + settings.table.title + '</caption>');
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
	
	//大型设备页码
	$(this).append(
		'<div class="hidden-xs input-group" style="width: 170px;float: left;">' +
			'<span class="page-number input-group-addon"></span>' +
			'<input type="text" class="form-control" id="page-go-index" placeholder="页数" onkeydown="onlyNum()">' +
			'<span class="input-group-btn">' +
				'<button class="btn btn-default" type="button" onclick="goToPage()">Go!</button>' +
			'</span>' +
		'</div>' +
		'<ul class="hidden-xs pagination" id="pagination" style="margin: 0px;float: right;"></ul>'
	);
	refreshNumber();
	
	//小型设备页码
	$(this).append('<ul class="pager hidden-sm hidden-md hidden-lg" id="min-pagination-btn" style="margin: 10px 0px;"></ul>');
	
	//小型设备新增按钮
	if(settings.canInsert) {
		$(this).append('<button type="button" class="btn btn-primary btn-block hidden-sm hidden-md hidden-lg" onclick="showInsertModal()" style="margin-bottom: 10px;">' + settings.table.insertBtnText + '</button>');
	}
	
	if(settings.complexSearch) {
		//简单搜索字段
		easySearchParam = settings.easySearchParam;
		//复杂搜索按钮
		$('#pagination').before('<button class="hidden-xs btn btn-default" style="float: left;margin-left: 10px;" onclick="showComplexSearchModal()">复杂搜索</button>');
		//刷新页面按钮
		$('#pagination').before('<button class="hidden-xs btn btn-default" style="float: left;margin-left: 10px;" onclick="refresh()">刷新页面</button>');
		
		//小型设备复杂搜索按钮
		$(this).append(
			'<div class="row hidden-sm hidden-md hidden-lg">' +
				'<div class="col-xs-6">' +
					'<button class="btn btn-default btn-block" onclick="showComplexSearchModal()">复杂搜索</button>' +
				'</div>' +
				'<div class="col-xs-6">' +
					'<button class="btn btn-default btn-block" onclick="refresh()">刷新页面</button>' +
				'</div>' +
			'</div>'
		);
	}
	
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
	
	//复杂搜索模态框
	if(settings.complexSearch) {
		var body = '';
		$(settings.complexSearchItems).each(function(i, obj) {
			body += '<label for="search-' + obj.param + '">' + obj.name + '</label>';
			switch(obj.type) {
			case 'string' : {
				body += '<input class="form-control" id="search-' + obj.param + '" type="text">';
				break;
			}
			case 'select' : {
				body += '<select class="form-control" id="search-' + obj.param + '">' +
							'<option value="">-- 请选择 --</option>';
				$.ajax({
					type : 'GET',
					url : obj.url,
					async : false,
					success : function(result) {
						$(result).each(function(i, map) {
							body += '<option value="' + map.value + '">' + map.name + '</option>';
						});
					}
				});
				body += '</select>';
				break;
			}
			case 'number' : {
				body += '<div class="input-group">' +
							'<input id="search-min' + obj.param + '" type="text" class="form-control" placeholder="下限">' +
							'<span class="input-group-addon">——</span>' +
							'<input id="search-max' + obj.param + '" type="text" class="form-control" placeholder="上限">' +
						'</div>';
				break;
			}
			}
		});
		var footer = '<button type="button" class="btn btn-defult" data-dismiss="modal">关闭</button>' + 
        			 '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="complexSearch(' + replaceQuotes(JSON.stringify(settings.complexSearchItems)) + ')">搜索</button>';
		$(this).append(modalCreater('complex-search', '复杂搜索', body, footer));
	}
}

function easySearchMin() {
	$('#min-nav-btn').trigger('click');
	$(easySearchParam).each(function(i, param) {
		params[param] = $('#easy-search-min').val();
	});
	refreshPage();
}

function easySearch() {
	params = {};
	$(easySearchParam).each(function(i, param) {
		params[param] = $('#easy-search').val();
	});
	pageIndex = 1;
	refreshPage();
}

function complexSearch(items) {
	params = {};
	$(items).each(function(i, item) {
		switch(item.type) {
		case 'string' : {
			params[item.param] = $('#search-' + item.param).val();
			break;
		}
		case 'select' : {
			params[item.param] = $('#search-' + item.param).val();
			break;
		}
		case 'number' : {
			params[item.param + 'Min'] = $('#search-min' + item.param).val();
			params[item.param + 'Max'] = $('#search-max' + item.param).val();
			break;
		}
		}
	});
	pageIndex = 1;
	refreshPage();
}

function refreshPage() {
	params.pageIndex = pageIndex;
	params.pageSize = pageSize;
	$('#manageUI-table-tbody').empty();
	$.ajax({
		type : 'POST',
		url : settings.table.ajax.url,
		data : params,
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
	$('#min-pagination-btn').html('');
	$('.page-number').text('共' + pageNumber + '页');
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
	
	var minPaginationBtn = '';
	if(pageIndex == 1) {
		minPaginationBtn += '<li class="previous disabled"><a>上一页</a></li>';
	} else {
		minPaginationBtn += '<li class="previous"><a onclick="changePage(' + (pageIndex - 1) + ')">上一页</a></li>';
	}
	
	minPaginationBtn += '<li><div class="btn-group dropup">' +
							'<button type="button" class="btn btn-default dropdown-toggle" id="min-pagination-select" data-toggle="dropdown" style="border-radius: 15px;">第1页</button>' +
							'<ul class="dropdown-menu" id="min-pagination" role="menu" style="overflow:scroll;max-height: 500px;left: -17px;min-width: 100px;"></ul>' +
						'<div></li>';
	
	if(pageIndex == pageNumber) {
		minPaginationBtn += '<li class="next disabled"><a>下一页 </a></li>';
	} else {
		minPaginationBtn += '<li class="next"><a onclick="changePage(' + (pageIndex + 1) + ')">下一页 </a></li>';
	}
	$('#min-pagination-btn').append(minPaginationBtn);
	
	$('#min-pagination-select').text('第' + pageIndex + '页');
	for(var i = 1; i <= pageNumber; i++) {
		$('#min-pagination').append('<li><a onclick="changePage(' + i + ')">第' + i + '页</a></li>');
	}
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

function showComplexSearchModal() {
	$('#complex-search').modal({
		backdrop: 'static'
	});
}

function refresh() {
	pageIndex = 1;
	pageSize = 10;
	params = {};
	$('#easy-search').val('');
	$('#easy-search-min').val('');
	$('#complex-search').find('.form-control').val('');
	refreshPage();
}