var settings = {};

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
		insertModal : {
			title : '新增',
			body : '',
			footer : ''
		}
	}
	settings = $.extend(defaults, options);
	
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
	
	//新增模态框
	if(options.canInsert) {
		$(this).append(modalCreater('insert', settings.insertModal.title, settings.insertModal.body, settings.insertModal.footer));
	}
}

function refreshPage() {
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

function showInsertModal() {
	$('#insert').modal({
		backdrop: 'static'
	});
}