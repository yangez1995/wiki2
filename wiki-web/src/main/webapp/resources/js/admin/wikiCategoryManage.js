$(document).ready(function() {
	var options = {
		table : { //表格
			title : '词条类别管理', //表格标题
			insertBtnText : '新建类别', //新建按钮内容
			column : [{
				name : 'ID',
				width : '60px'
			}, {
				name : '名称'
			}, {
				name : '选项',
				width : '60px'
			}],
			ajax : {
				type : 'POST', //请求类型
				url : 'wiki/category/getPage', //请求地址
				async : true, //是否异步
				dataType : 'json', //预期返回数据类型
				contentType : 'application/x-www-form-urlencoded', //内容编码类型
				data : {pageIndex : 1, pageSize : 10}, //请求数据
				success : function(result) {
					$(result.data).each(function(i, obj) {
						$('#manageUI-table-tbody').append(
							'<tr>' +
								'<td>' + obj.id + '</td>' +
								'<td>' + obj.name + '</td>' +
								'<td><button class="btn-xs btn-primary" onclick="update(' + replaceQuotes(JSON.stringify(obj)) + ')">修改</button></td>' +
							'</tr>'
						);
					});
				}
			}
		},
		canInsert : true, //是否可以新增
		insertModal : {
			title : '新增类别',
			body : '<label for="new-type-id">ID</label>' +
				   '<input class="form-control" id="insert-id" type="text" onkeydown="onlyNum()">' +
				   '<label for="new-type-name">名称</label>' +
				   '<input class="form-control" id="insert-name" type="text">',
			footer : '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
		        	 '<button type="button" class="btn btn-primary" onclick="insert()">新建</button>'
		}
	}
	$('#wiki-categoru-manageUI').manageUI(options);
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