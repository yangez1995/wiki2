var weekNumber = 1;
var year = 2016;
var month = 1;
var nowYear = 2016;
var nowMonth = 1;

$(document).ready(function() {
	$.get('getLastWeekNumber', function(data) {
		for(var i = data; i > 0; i--) {
			$('#choose-week').append('<option value="' + i + '">第' + i + '周</option>');
		}
		weekLine();
	});
	$.get('getTodayMonth', function(data) {
		nowYear = data.year;
		nowMonth = data.month;
		for(var i = nowYear; i >= 2016; i--) {
			$('#choose-year').append('<option value="' + i + '">' + i + '年</option>');
		}
		for(var i = nowMonth; i > 0; i--) {
			$('#choose-month').append('<option value="' + i + '">' + i + '月</option>');
		}
	});
});

function changeChart() {
	clearSelect();
	switch($('#choose-chart').val()) {
	case 'week-line': {
		$('#choose-week').removeClass('hidden');
		weekLine();
		break;
	}
	case 'month-line': {
		$('#choose-year').removeClass('hidden');
		$('#choose-month').removeClass('hidden');
		monthLine();
		break;
	}
	case 'year-line': {
		$('#choose-year').removeClass('hidden');
		yearLine();
		break;
	}
	}
}

function clearSelect() {
	$('#choose-week').addClass('hidden');
	$('#choose-year').addClass('hidden');
	$('#choose-month').addClass('hidden');
}

function changeYear() {
	var cyear = $('#choose-year').val();
	$('#choose-month').html('');
	if(cyear == nowYear) {
		for(var i = nowMonth; i > 0; i--) {
			$('#choose-month').append('<option value="' + i + '">' + i + '月</option>');
		}
	} else {
		for(var i = 12; i > 0; i--) {
			$('#choose-month').append('<option value="' + i + '">' + i + '月</option>');
		}
	}
	switch($('#choose-chart').val()) {
	case 'month-line': {
		monthLine();
		break;
	}
	case 'year-line': {
		yearLine();
		break;
	}
	}
}

function weekLine() {
	weekNumber = $('#choose-week').val();
	$.get('getWeekActiveUser', {'weekNumber' : weekNumber}, function(data) {
		var weekLine = new Highcharts.Chart('chart', {
			title: {
				text: '周用户活跃图'
			},
			xAxis: {
				categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			yAxis: {
				title: {
					text: '人数'
				}
			},
			series: [{
				type: 'line',
				data: data,
				name: '用户活跃度'
			}]
		});
	});
}

function monthLine() {
	year = $('#choose-year').val();
	month = $('#choose-month').val();
	var days = new Array();
	for(var i = 1; i <= getMonthDayNumber(year, month); i++) {
		days[i - 1] = i;
	}
	$.get('getMonthActiveUser', {'year' : year, 'month' : month}, function(data) {
		var weekLine = new Highcharts.Chart('chart', {
			title: {
				text: '月用户活跃图'
			},
			xAxis: {
				categories: days
			},
			yAxis: {
				title: {
					text: '人数'
				}
			},
			series: [{
				type: 'line',
				data: data,
				name: '用户活跃度'
			}]
		});
	});
}

function yearLine() {
	year = $('#choose-year').val();
	$.get('getYearActiveUser', {'year' : year}, function(data) {
		var weekLine = new Highcharts.Chart('chart', {
			title: {
				text: '年用户活跃图'
			},
			xAxis: {
				categories: [1,2,3,4,5,6,7,8,9,10,11,12]
			},
			yAxis: {
				title: {
					text: '平均人数'
				}
			},
			series: [{
				type: 'line',
				data: data,
				name: '用户平均活跃度'
			}]
		});
	});
}

