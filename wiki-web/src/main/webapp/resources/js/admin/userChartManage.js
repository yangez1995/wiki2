var chart = echarts.init(document.getElementById('chart'));

$(document).ready(function() {
	sexPie();
});

function changeChart() {
	switch($('#choose-chart').val()) {
	case 'sex-pie': {
		sexPie();
		break;
	}
	}
}

function sexPie() {
	$.get('user/chart/getSexDistribution', function(result) {
		var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c}人 ({d}%)'
		    },
		    series : [
		        {
		            name: '用户性别',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{
		            	name: '男',
		            	value: result.data.m,
		            	itemStyle: {
		            		normal: {
		            			color: '#63B8FF'
		            		}
		            	}
		            },{
		            	name: '女',
		            	value: result.data.w,
		            	itemStyle: {
		            		normal: {
		            			color: '#E066FF'
		            		}
		            	}
		            },{
		            	name: '保密',
		            	value: result.data.x,
		            	itemStyle: {
		            		normal: {
		            			color: '#CCC'
		            		}
		            	}
		            }]
		        }
		    ]
		};
		
		chart.setOption(option);
	});
}