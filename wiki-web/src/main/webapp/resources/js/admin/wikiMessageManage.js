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
				url : 'wiki/message/getPage', //请求地址
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
		},
		complexSearch : true,
		complexSearchItems : [{
			name : 'ID',
			param : 'id',
			type : 'string'
		}, {
			name : '主标题',
			param : 'title',
			type : 'string'
		}, {
			name : '副标题',
			param : 'subTitle',
			type : 'string'
		}, {
			name : '级别',
			param : 'level',
			type : 'number'
		}, {
			name : '创建人ID',
			param : 'createBy',
			type : 'string'
		},  {
			name : '创建人昵称',
			param : 'nickname',
			type : 'string'
		}, {
			name : '类别',
			param : 'category',
			type : 'select',
			url : 'wiki/message/getCategory'
		}, {
			name : '权限类型',
			param : 'auth',
			type : 'select',
			url : 'wiki/message/getAuth'
		}, ]
	}
	$('#wiki-message-manageUI').manageUI(options);
});