//添加名片组件
function installCard(div) {
	//名片组件
	$(div).append(
		'<h2 id="main-title" style="width: auto;font-family: Microsoft YaHei;margin-bottom: 0px;"></h2>' +
		'<button class="btn edit-icon" onclick="showCardEditModal()" style="float: right;margin-top: -30px;"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑名片</button>' +
		'<h3 id="sub-title" style="font-family: Microsoft YaHei;font-size: 22px;color: #777777;margin-top: 5px;"></h3>' +
		'<div id="main-des" style="text-indent: 30px;"></div>'
	);
	//编辑名片模态框
	var body = '副标题<input class="form-control" id="sub-title-edit" type="text" name=""><br/>' +
			   '描述<textarea class="form-control" id="main-des-edit" rows="15" style="resize: none;"></textarea><br/>';	
	var footer = '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>' +
 				 '<button type="button" class="btn btn-primary" onclick="cardUpdate()">提交更改</button>';
	$('body').append(modalCreater('title-edit-model', '编辑名片', body, footer));
}

function initCard(title, subTitle, describe) {
	$('#main-title').text(title);
	$('#sub-title').html(subTitle);
	$('#main-des').html(describe);
}

//显示名片编辑模态框
function showCardEditModal() {
	$('#main-title-edit').val($('#main-title').text());
	$('#sub-title-edit').val($('#sub-title').text());
	var describe = '';
	$('#main-des p').each(function(i, p) {
		if(i > 0) {
			describe += '\n';
		}
		describe += $(p).text();
	});
	$('#main-des-edit').val(describe);
	$('#title-edit-model').modal({
		backdrop: 'static'
	});
}
//提交名片修改
function cardUpdate() {
	params.id = wikiId;
	params.subTitle = $('#sub-title-edit').val();
	var des = $('#main-des-edit').val();
	arr = des.split('\n');
	var describe = '';
	$(arr).each(function(i, a) {
		describe += '<p>' + a + '</p>';
	});
	params.describe = describe;
	$.ajax({
		type : 'POST',
		url : 'cardUpdate',
		contentType:"application/json",
		data : JSON.stringify(params),
		success : function(result) {
			$('#title-edit-model').modal('hide');
			resetPage();
		}
	});
}