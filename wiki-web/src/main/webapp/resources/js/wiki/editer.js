var wikiId = 0;
var category = 0;
var chapter = {};
var childConut = 1;
$(document).ready(function() {
	/*UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	UE.Editor.prototype.getActionUrl = function(action) {
		if(action == 'imageUpload') {
			return 'http://localhost:8080/wiki/upload/imageUpload'
		} else {
			return this._bkGetActionUrl.call(this, action);
		}
	}*/
	
	$('#left-part').width($('#left-part').parent().width());
	$('#left-part').height($(window).height());
	$(window).resize(function() {
		$('#left-part').width($('#left-part').parent().width());
		$('#left-part').height($(window).height());
	});
	chapter = $.parseJSON(window.localStorage.getItem('chapter'));
	category = window.localStorage.getItem('category');
	wikiId = chapter.wikiId;
	resetPage();
	editerInit();
	resetClick();
	
	$('#add-child').click(function() {
		$('#add-child-model').modal({
			backdrop: 'static'
		});
	});
	
	$('#submit').click(function() {
		chapter = {};
		chapter.id = $('.chapter:first h4').attr('id');
		chapter.wikiId = wikiId;
		chapter.title = $('.chapter:first h4').text();
		chapter.content = $('.chapter:first .chapter-pre div').html();
		var childs = [];
		$('.chapter:gt(0)').each(function(i, part) {
			var child = {};
			child.id = $(part).find('h4').attr('id');
			child.title = $(part).find('h4').text();
			child.content = $(part).find('.chapter-pre').find('div').html();
			child.serNum = i + 1;
			child.parentId = chapter.id;
			childs.push(child);
		});
		chapter.childs = childs;
		$.ajax({
			type : 'POST',
			url : 'chapterUpdate',
			contentType : 'application/json',
			data : JSON.stringify(chapter),
			success : function() {
				window.location.href = 'wiki?wikiId=' + wikiId + '&category=' + category;
			}
		})
	});
});

function editerInit() {
	var config = {
		enterTag : 'br',
		toolbars: [[
		'bold','italic','underline','strikethrough','|', //加粗,斜体,下划线,删除线
		'spechars','subscript','superscript','touppercase','tolowercase','|', //特殊字符,下标,上标,字母大写,字母小写
		'undo','redo','|', //撤销,重做
		'justifyleft','justifyright','justifycenter','justifyjustify','indent','|', //居左对齐,居右对齐,居中对齐,两端对齐,首行缩进
		'link','unlink','|', //超链接,取消链接
		'insertorderedlist','insertunorderedlist','|', //有序列表,无序列表
		'autotypeset','selectall','removeformat','|', //自动排版,全选,清除格式
		'pasteplain','drafts','searchreplace','|', //纯文本粘贴模式,从草稿箱加载,查询替换
		'source', //源代码
		'fullscreen', //全屏
		],[
		'inserttable','deletetable','insertparagraphbeforetable','|', //插入表格,删除表格,表格前插入行
		'insertrow','insertcol','deleterow','deletecol','|', //前插入行,前插入列,删除行,删除列
		'mergeright','mergedown','splittorows','splittocols','splittocells','mergecells','|', //右合并单元格,下合并单元格,拆分成行,拆分成列,完全拆分单元格,合并多个单元格
		'edittable','edittd','|', //表格属性,单元格属性
		'simpleupload','insertimage','snapscreen','map','|', //单图上传,多图上传,截图,Baidu地图
		'imagenone','imageleft','imageright','imagecenter', //默认,左浮动,右浮动,居中
		]],
		initialFrameHeight: 300,
		autoHeightEnabled : false,
		initialFrameWidth: '100%'}
		config.initialContent = chapter.content;
		UE.getEditor('main-content-edit', config);
		$(chapter.childs).each(function(i, child) {
		var id = 'child' + (i + 1) + '-content-edit';
		config.initialContent = child.content;
		UE.getEditor(id, config);
	});
}

function resetPage() {
	$('#nav').html('');
	$('#right-part-content').html('');
	$('#nav').append('<li id="main-li"><a class="nav-a" id="#main">' + chapter.title + '</a></li>');
	$('#right-part-content').append('<div class="chapter" id="main">' + 
		'<div class="chapter-pre" id="main-pre" style="cursor: pointer;">' +
		'<h4 id="' + chapter.id + '">' + chapter.title + '</h4>' +
		'<div>' + chapter.content + '</div></div>' +
		'<div class="chapter-edit hidden" id="main-edit">' +
		'<input class="form-control" id="main-title-edit" type="text"><br/>' + 
		'<div id="main-content-edit"></div>' +
		'<button class="btn btn-primary save">保存</button></div>'
	);
	$('#main-title-edit').val(chapter.title);
	$(chapter.childs).each(function(i, child) {
		$('#nav').append('<li id="child' + (i + 1) + '-li"><a class="nav-a" id="#child' + (i + 1) + '">' + child.title + '</a>' +
			'<button class="btn pull-right" style="background: url(\'../resources/image/down32px.png\')" onclick="descending(this)"></button>' +
			'<button class="btn pull-right" style="background: url(\'../resources/image/up32px.png\')" onclick="ascending(this)"></button></li>');
		$('#right-part-content').append('<div class="chapter" id="child' + (i + 1) +'">' +
			'<div class="chapter-pre" id="child' + (i + 1) + '-pre" style="cursor: pointer;">' +
			'<h4 id="' + child.id + '">' + child.title + '</h4>' +
			'<div>' + child.content + '</div></div>' +
			'<div class="chapter-edit hidden" id="child' + (i + 1) + '-edit">' +
			'<input class="form-control" id="child' + (i + 1) + '-title-edit" type="text"><br/>' + 
			'<div id="child' + (i + 1) + '-content-edit"></div>' + 
			'<button class="btn btn-primary save">保存</button>' +
			'<button class="btn btn-danger delete">删除</button></div>'
		);
		var id = '#child' + (i + 1) + '-title-edit';
		$(id).val(child.title);
		childConut++;
	});
}

function resetClick() {
	$('.chapter-pre').click(function() {
		$('.chapter-pre').removeClass('hidden');
		$('.chapter-pre').find('h4').each(function(i, h4) {
			$(h4).text($(h4).parent().parent().find('input').val());
		});
		$('.chapter-pre').find('div').each(function(i, div) {
			$(div).html(UE.getEditor($(div).parent().parent().find('.edui-default').attr('id')).getContent());
		});
		$('.chapter-edit').addClass('hidden');
		$(this).addClass('hidden');
		$(this).parent().find('.chapter-edit').removeClass('hidden');
	});
	
	$('.save').click(function() {
		var part = $(this).parent().parent();
		$(part).find('h4').text($(part).find('input').val());
		$(part).find('.chapter-pre').find('div').html(UE.getEditor($(part).find('.edui-default').attr('id')).getContent());
		$(part).find('.chapter-pre').removeClass('hidden');
		$(part).find('.chapter-edit').addClass('hidden');
	});
	
	$('.delete').click(function() {
		var part = $(this).parent().parent();
		layer.open({
			title: '确认操作',
			content: '确认要删除该子章节吗?',
			icon: 0,
			btn: ['确认删除','取消'],
			yes: function(index) {
				var id = '#' + $(part).attr('id') + '-li';
				$(part).remove();
				$(id).remove();
				layer.close(index);
			}
		});
	});
	
	$('.nav-a').click(function() {
		var t = $('#right-part-content').find($(this).attr('id')).offset().top;
		$(window).scrollTop(t - 50);
	});
}

function addChild() {
	var title = $('#create-child-title').val();
	$('#nav').append('<li id="child' + childConut + '-li"><a class="nav-a" id="#child' + childConut + '">' + title + '</a>' +
			'<button class="btn pull-right" style="background: url(\'../resources/image/down32px.png\')" onclick="descending(this)"></button>' +
			'<button class="btn pull-right" style="background: url(\'../resources/image/up32px.png\')" onclick="ascending(this)"></button></li>');
	$('#right-part-content').append('<div class="chapter" id="child' + childConut +'">' +
			'<div class="chapter-pre" id="child' + childConut + '-pre" style="cursor: pointer;">' +
			'<h4 id="' + 0 + '">' + title + '</h4>' +
			'<div></div></div>' +
			'<div class="chapter-edit hidden" id="child' + childConut + '-edit">' +
			'<input class="form-control" id="child' + childConut + '-title-edit" type="text"><br/>' + 
			'<div id="child' + childConut + '-content-edit"></div>' + 
			'<button class="btn btn-primary save">保存</button>' +
			'<button class="btn btn-danger delete">删除</button></div>'
		);
	var id = '#child' + childConut + '-title-edit'
	$(id).val(title);
	var config = {
			enterTag : 'br',
			toolbars: [[
			'bold','italic','underline','strikethrough','|', //加粗,斜体,下划线,删除线
			'spechars','subscript','superscript','touppercase','tolowercase','|', //特殊字符,下标,上标,字母大写,字母小写
			'undo','redo','|', //撤销,重做
			'justifyleft','justifyright','justifycenter','justifyjustify','indent','|', //居左对齐,居右对齐,居中对齐,两端对齐,首行缩进
			'link','unlink','|', //超链接,取消链接
			'insertorderedlist','insertunorderedlist','|', //有序列表,无序列表
			'autotypeset','selectall','removeformat','|', //自动排版,全选,清除格式
			'pasteplain','drafts','searchreplace','|', //纯文本粘贴模式,从草稿箱加载,查询替换
			'source', //源代码
			'fullscreen', //全屏
			],[
			'inserttable','deletetable','insertparagraphbeforetable','|', //插入表格,删除表格,表格前插入行
			'insertrow','insertcol','deleterow','deletecol','|', //前插入行,前插入列,删除行,删除列
			'mergeright','mergedown','splittorows','splittocols','splittocells','mergecells','|', //右合并单元格,下合并单元格,拆分成行,拆分成列,完全拆分单元格,合并多个单元格
			'edittable','edittd','|', //表格属性,单元格属性
			'simpleupload','insertimage','snapscreen','map','|', //单图上传,多图上传,截图,Baidu地图
			'imagenone','imageleft','imageright','imagecenter', //默认,左浮动,右浮动,居中
			]],
			initialFrameHeight: 300,
			autoHeightEnabled : false,
			initialFrameWidth: '100%'}
	UE.getEditor('child' + childConut + '-content-edit', config);
	resetClick();
	$('#add-child-model').modal('hide');
	$('#create-child-title').val('');
	childConut++;
}

function ascending(e) {
	var li = $(e).parent();
	if($(li).prev().attr('id') == 'main-li') {
		alert('该行已经为最上行，无法升序');
		return false;
	}
	var ch = $('#' + $(li).attr('id').split('-')[0]);
	$(ch).prev().before(ch);
	$(li).prev().before(li); 
}

function descending(e) {
	var li = $(e).parent();
	if($(li).next().attr('id') == null) {
		alert('该行已经为最下行，无法降序');
		return false;
	}
	var ch = $('#' + $(li).attr('id').split('-')[0]);
	$(ch).next().after(ch); 
	$(li).next().after(li); 
}