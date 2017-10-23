$(document).ready(function() {
	var h = $(window).height() - 50;
	if($(window).width() >= 768) {
		var w = $(window).width() - 220;
	} else {
		var w = $(window).width();
	}
	$('#left-nav').css('height', h);
	$('#content').css({'width': w,'height': h});
	$('#content').load('../resources/page/admin/userAccountManage.html');
	
	$.get('getOnLoginUserMessage', function(data) {
		$('#on-login-name').text(data.nickname);
		$('#on-login-role').text(data.role);
	});
	
	$('.nav-dl dt').click(function() {
		$('.nav-dl').removeClass('dl-act');
		$(this).parent().addClass('dl-act');
	});
	
	$('#u-account-min').click(function() {
		$('#content').load('../resources/page/admin/userAccountManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#u-account').click(function() {
		$('#content').load('../resources/page/admin/userAccountManage.html');
	});
	
	$('#u-role-min').click(function() {
		$('#content').load('../resources/page/admin/userRoleManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#u-role').click(function() {
		$('#content').load('../resources/page/admin/userRoleManage.html');
	});
	
	$('#u-msg-min').click(function() {
		$('#content').load('../resources/page/admin/userMessageManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#u-msg').click(function() {
		$('#content').load('../resources/page/admin/userMessageManage.html');
	});
	
	$('#u-chart-min').click(function() {
		$('#content').load('../resources/page/admin/userChartManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#u-chart').click(function() {
		$('#content').load('../resources/page/admin/userChartManage.html');
	});
	
	$('#r-msg-min').click(function() {
		$('#content').load('../resources/page/admin/roleMessageManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#r-msg').click(function() {
		$('#content').load('../resources/page/admin/roleMessageManage.html');
	});
	
	$('#r-auth-min').click(function() {
		$('#content').load('../resources/page/admin/roleAuthManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#r-auth').click(function() {
		$('#content').load('../resources/page/admin/roleAuthManage.html');
	});
	
	$('#auth-msg-min').click(function() {
		$('#content').load('../resources/page/admin/authorityMessageManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#auth-msg').click(function() {
		$('#content').load('../resources/page/admin/authorityMessageManage.html');
	});
	
	$('#res-msg-min').click(function() {
		$('#content').load('../resources/page/admin/resourceMessageManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#res-msg').click(function() {
		$('#content').load('../resources/page/admin/resourceMessageManage.html');
	});
	
	$('#res-type-min').click(function() {
		$('#content').load('../resources/page/admin/resourceTypeManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#res-type').click(function() {
		$('#content').load('../resources/page/admin/resourceTypeManage.html');
	});
	
	$('#res-auth-min').click(function() {
		$('#content').load('../resources/page/admin/resourceAuthManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#res-auth').click(function() {
		$('#content').load('../resources/page/admin/resourceAuthManage.html');
	});
	
	$('#wiki-msg-min').click(function() {
		$('#content').load('../resources/page/admin/wikiMessageManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#wiki-msg').click(function() {
		$('#content').load('../resources/page/admin/wikiMessageManage.html');
	});
	
	$('#wiki-category-min').click(function() {
		$('#content').load('../resources/page/admin/wikiCategoryManage.html');
		$('#min-nav-btn').trigger('click');
	});
	$('#wiki-category').click(function() {
		$('#content').load('../resources/page/admin/wikiCategoryManage.html');
	});
});	

$(window).resize(function() {
	var h = $(window).height() - 50;
	if($(window).width() >= 768) {
		var w = $(window).width() - 220;
	} else {
		var w = $(window).width();
	}
	$('#left-nav').css('height', h);
	$('#content').css({'width': w,'height': h});
});

function logout() {
	window.location.href = '../user/logout';
}

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