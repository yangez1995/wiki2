var updateId = 0;

$(document).ready(function() {
	var options = {
		table : { //表格
			title : '词条信息管理', //表格标题
			column : [{
				name : 'ID'
			}, {
				name : '主标题'
			}, {
				name : '副标题'
			}, {
				name : '类别'
			}, {
				name : '所属类别'
			}, {
				name : '级别'
			}, {
				name : '版本号'
			}, {
				name : '创建人'
			}, {
				name : '创建日期'
			}],
			ajax : {
				type : 'POST', //请求类型
				url : 'wiki/message/getPage', //请求地址
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
								'<td>' + obj.title + '</td>' +
								'<td>' + obj.subTitle + '</td>' +
								'<td>' + obj.category + '</td>' +
								'<td>' + obj.auth + '</td>' +
								'<td>' + obj.level + '</td>' +
								'<td>' + obj.version + '</td>' +
								'<td>' + obj.nickname + '</td>' +
								'<td>' + timeStampToDateTime(obj.createDate) + '</td>' +
							'</tr>'
						);
					});
					refreshNumber();
				}
			}
		}
	}
	$('#wiki-message-manageUI').manageUI(options);
});