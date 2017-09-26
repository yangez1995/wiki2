var step = 1;
var params = {};
var type = 0;
var auth = 0;
$(document).ready(function() {
	$("#ystep").loadStep({
	    //ystep的外观大小
	    //可选值：small,large
	    size: "large",
	    //ystep配色方案
	    //可选值：green,blue
	    color: "green",
	    //ystep中包含的步骤
	    steps: [{
	  	    //步骤名称
		    title: "类别",
		    //步骤内容(鼠标移动到本步骤节点时，会提示该内容)
		    content: "选择创建类别"
	    },{
		    title: "权限",
		    content: "选择创建权限"
	    },{
		    title: "模版",
		    content: "选择创建模版"
	    },{
		  title: "名片",
		  content: "编辑名片"
	    },{
		    title: "完成",
		    content: "完成"
	    }]
	});
	
	getPage();
});

function createWiki() {
	params.title = $('#title').val();
	params.subTitle = $('#sub-title').val();
	params.describe = '<p>' + $('#describe').val() + '</p>';
	params.category = parseInt(type) + parseInt(auth);
	$.post('newWiki', params, function(result) {
		alert(JSON.stringify(result));
	});
}

function doNext() {
	if(step == 1) {
		type = $('#type').val();
	} else if(step == 2) {
		auth = $('#auth').val();
	}
	$("#ystep").nextStep();
	step++;
	getPage();
}

function doPrev() {
	$("#ystep").prevStep();
	step--;
	getPage();
}

function getPage() {
	switch(step) {
	case 1 : {
		$('#content').load('../resources/page/wiki/newWikiType.html');
		break;
	}
	case 2 : {
		$('#content').load('../resources/page/wiki/newWikiAuth.html');
		break;
	}
	case 3 : {
		$('#content').load('../resources/page/wiki/newWikiModel.html');
		break;
	}
	case 4 : {
		$('#content').load('../resources/page/wiki/newWikiCard.html');
		break;
	}
	case 5 : {
		$('#content').load('../resources/page/wiki/newWikiFinish.html');
		break;
	}
	}
}