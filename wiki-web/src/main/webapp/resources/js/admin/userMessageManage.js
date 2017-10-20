$(document).ready(function() {
	var options = {
		table : { //表格
			title : '用户信息管理', //表格标题
			column : [{
				name : 'ID'
			}, {
				name : '昵称'
			}, {
				name : '年龄'
			}, {
				name : '性别'
			}],
			ajax : {
				url : 'user/message/getPage', //请求地址
				success : function(result) {
					pageNumber = Math.ceil(result.data.pageNumber / pageSize);
					var table = '';
					$(result.data.list).each(function(i, userMessage) {
						table += '<tr>' +
								 '<td>' + userMessage.id + '</td>' +
								 '<td>' + userMessage.nickname + '</td>'; 
						if(userMessage.age == -1) {
							table += '<td>保密</td>';
						} else {
							table += '<td>' + userMessage.age + '</td>';
						}
						if(userMessage.sex == '0') {
							table += '<td>保密</td>';
						} else if(userMessage.sex == '1') {
							table += '<td>男</td>';
						} else {
							table += '<td>女</td>';
						}
					});
					$('#manageUI-table-tbody').append(table);
					refreshNumber();
				}
			}
		},
		easySearchParam : ['nickname'],
		complexSearch : true,
		complexSearchItems : [{
			name : 'ID',
			param : 'id',
			type : 'string'
		}, {
			name : '昵称',
			param : 'nickname',
			type : 'string'
		}, {
			name : '年龄',
			param : 'age',
			type : 'number'
		}, {
			name : '性别',
			param : 'sex',
			type : 'select',
			url : 'user/message/getSex'
		}]
	}
	$('#user-message-manageUI').manageUI(options);
});