
function installAnimeRadarMap(div) {
	$(div).append('<div id="anime-radar-map" style="width: 100%;height:220px;"></div>');
}

function initAnimeRadarMap(data) {
	var animeRadarMap = echarts.init(document.getElementById('anime-radar-map'));
	option = {
	    radar: {
	        name: {
	            textStyle: {
	                color: '#555'
	           }
	        },
	        indicator: [
	           { text: '画质', max: 10},
	           { text: '分镜', max: 10},
	           { text: '音乐', max: 10},
	           { text: '声优', max: 10},
	           { text: '剧情', max: 10},
	           { text: '热度', max: 10}
	        ]
	    },
	    series: [{
	        name: '雷达图',
	        type: 'radar',
	        // areaStyle: {normal: {}},
	        data : [{
                value : [data.source.picture, data.source.storyboard, data.source.music,
                	data.source.akira, data.source.plot, data.source.hot],
                name : '详细数据',
                symbolSize : 0,
                areaStyle : {
                    normal : {
                        opacity : 0.9,
                        color : {
                            type : 'radial',
                            x : 0.5,
                            y : 0.5,
                            r : 0.5,
                            colorStops : [{
                                offset : 0, 
                                color : 'rgba(127,158,15,0.3)'
                            }, {
                                offset : 1, 
                                color : 'rgba(127,158,15,1)'
                            }],
                            globalCoord : false 
                        }
                    }
                },
                lineStyle : {
                	normal : {
                		width : 0
                	}
                }
            },{
                value : [data.source.source, data.source.source, data.source.source, 
                	data.source.source, data.source.source, data.source.source],
                name : '评分基准线',
                symbolSize : 0,
                lineStyle : {
                	normal : {
                		color : '#6495ED',
                		type: 'dashed'
                	}
                }
            }]
	    }]
	};
	animeRadarMap.setOption(option);
}