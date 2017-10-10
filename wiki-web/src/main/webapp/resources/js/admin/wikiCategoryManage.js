var updateId = 0;

$(document).ready(function() {
	var options = {
		table : { //表格
			title : '词条类别管理', //表格标题
			insertBtnText : '新建类别', //新建按钮内容
			column : [{
				name : 'ID'
			}, {
				name : '名称'
			}, {
				name : '选项',
				width : '55px'
			}],
			ajax : {
				type : 'POST', //请求类型
				url : 'wiki/category/getPage', //请求地址
				async : true, //是否异步
				dataType : 'json', //预期返回数据类型
				contentType : 'application/x-www-form-urlencoded', //内容编码类型
				data : {}, //请求数据
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					$(result.data.list).each(function(i, obj) {
						$('#manageUI-table-tbody').append(
							'<tr>' +
								'<td>' + obj.id + '</td>' +
								'<td>' + obj.name + '</td>' +
								'<td><button class="btn-xs btn-primary" onclick="showUpdateModal(' + replaceQuotes(JSON.stringify(obj)) + ')">修改</button></td>' +
							'</tr>'
						);
					});
					refreshNumber();
				}
			}
		},
		canInsert : true, //是否可以新增
		insertModal : {
			title : '新增类别',
			body : '<label for="insert-id">ID</label>' +
				   '<input class="form-control" id="insert-id" type="text" onkeydown="onlyNum()">' +
				   '<label for="insert-name">名称</label>' +
				   '<input class="form-control" id="insert-name" type="text">',
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-primary" onclick="insert()">新建</button>'
		},
		canUpdate : true, //是否可修改
		updateModal : { //修改模态框
			title : '修改名称', 
			body : '<label for="update-name">名称</label>' +
		           '<input class="form-control" id="update-name" type="text">',
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-primary" onclick="update()">提交更改</button>' 
		}
	}
	$('#wiki-category-manageUI').manageUI(options);
});

function insert() {
	var params = {};
	params.id = $('#insert-id').val();
	params.name = $('#insert-name').val();
	$.post('wiki/category/insert', params, function(result) {
		if(result.code == '200') {
			$('#insert-id').val('');
			$('#insert-name').val('');
			$('#insert').modal('hide');
			refreshPage();
		} else {
			validateErrorFrame(result.msg);
		}
	})
}

function showUpdateModal(obj) {
	updateId = obj.id;
	$('#update-name').val(obj.name);
	$('#update').modal({
		backdrop: 'static'
	});
}

function update() {
	var params = {};
	params.id = updateId;
	params.name = $('#update-name').val();
	$.post('wiki/category/update', params, function(result) {
		if(result.code == '200') {
			$('#update-name').val('');
			$('#update').modal('hide');
			refreshPage();
		} else {
			validateErrorFrame(result.msg);
		}
	});
}