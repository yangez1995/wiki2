$(document).ready(function() {
	var h = $(window).height() - 50;
	var w = $(window).width() - 220;
	$('#left-nav').css('height', h);
	$('#content').css({'width': w,'height': h});
	$('#content').load('../resources/page/admin/userAccountManage.html');
	
	$.get('getOnLoginUserMessage', function(data) {
		$('#on-login-name').text(data.nickname);
		$('#on-login-role').text(data.role);
	});
	
	$('#logout').click(function() {
		window.location.href = '../user/logout';
	});
	
	$('.nav-dl dt').click(function() {
		$('.nav-dl').removeClass('dl-act');
		$(this).parent().addClass('dl-act');
	});
	
	$('#u-account').click(function() {
		$('#content').load('../resources/page/admin/userAccountManage.html');
	});
	$('#u-role').click(function() {
		$('#content').load('../resources/page/admin/userRoleManage.html');
	});
	$('#u-msg').click(function() {
		$('#content').load('../resources/page/admin/userMessageManage.html');
	});
	$('#u-chart').click(function() {
		$('#content').load('../resources/page/admin/userChartManage.html');
	});
	$('#au-chart').click(function() {
		$('#content').load('../resources/page/admin/activeUserChartManage.html');
	});
	$('#r-msg').click(function() {
		$('#content').load('../resources/page/admin/roleManage.html');
	});
	$('#r-auth').click(function() {
		$('#content').load('../resources/page/admin/roleAuthManage.html');
	});
	$('#auth-msg').click(function() {
		$('#content').load('../resources/page/admin/authorityManage.html');
	});
	$('#res-msg').click(function() {
		$('#content').load('../resources/page/admin/resourceMessageManage.html');
	});
	$('#res-type').click(function() {
		$('#content').load('../resources/page/admin/resourceTypeManage.html');
	});
	$('#res-auth').click(function() {
		$('#content').load('../resources/page/admin/resourceAuthManage.html');
	});
	$('#wiki-category').click(function() {
		$('#content').load('../resources/page/admin/wikiCategoryManage.html');
	});
});	

$(window).resize(function() {
	var h = $(window).height() - 50;
	var w = $(window).width() - 220;
	$('#left-nav').css('height', h);
	$('#content').css({'width': w,'height': h});
});

function onlyNum() 
{ 
	if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||event.keyCode == 8)) {
		event.returnValue=false; 
	}
}

function replaceQuotes(str) {
	var newStr = '';
	for(var i = 0; i < str.length; i++) {
		if(str[i] == '\"') {
			newStr += '\''; 
		} else {
			newStr += str[i];
		}
	}
	return newStr;
}

function getMonthDayNumber(year, month) {
	if(month == 4 || month == 6 || month == 9 || month == 11) {
		return 30;
	} else if(month == 2) {
		if(year % 100 == 0) {
			return 28;
		} else {
			if(year % 4 == 0) {
				return 29;
			} else {
				return 28;
			}
		}
	} else {
		return 31;
	}
}