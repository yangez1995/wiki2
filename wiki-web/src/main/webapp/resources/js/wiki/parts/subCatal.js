var subCatalList = [];

function installSubCatal(div) {
	$(div).append(
		'<div class="hidden" id="sub-catal-cont" style="position: fixed;height: 300px;bottom: 75px;overflow: hidden;">' +
			'<div style="height: 300px;position: absolute; left: 5px; border-left: #CCC solid 2px;">' +
				'<div style="width: 9px;height: 9px;position: absolute; left: -6px;background: #FCFCFC;z-index: 1000;">' +
					'<img src="../resources/image/hollow.png" style="position: absolute;">' +
				'</div>' +
				'<div style="width: 9px;height: 9px;position: absolute;top: 291px; left: -6px;background: #FCFCFC;z-index: 1000;">' +
					'<img src="../resources/image/hollow.png" style="position: absolute;">' +
				'</div>' + 
			'</div>' +
			'<div class="navbar-example" id="sub-catal-scroll" style="width: 110%;height: 290px;position: absolute;top: 5px;overflow: auto;">' +
				'<dl class="sub-catal nav" id="sub-catal"></dl>' +
				'<img id="buoy" src="../resources/image/buoy.png" style="width: 18px;height: 16px;position: absolute;top:5px;">' +
			'</div>' +
		'</div>'
	);
	$('#sub-catal-cont').width($('#img-collection').width());
}

function initSubCatal(chapters) {
	$('#sub-catal').html('');
	$(chapters).each(function(i, chapter) {
		$('#sub-catal').append(
			'<dt onclick="unlockScroll()">' + 
				'<em class="pointer"></em>' + 
				'<a href="#main-title' + chapter.serNum + '">' + 
					'<span>' + chapter.serNum + '</span>' + chapter.title + 
				'</a>' + 
			'</dt>'
		);
		$(chapter.childs).each(function(i, child) {
			$('#sub-catal').append(
				'<dd onclick="unlockScroll()">' + 
					'<a href="#sub-title' + chapter.serNum + '-' + child.serNum + '">' + 
						'<span>' + chapter.serNum + '.' + child.serNum + '</span>' + child.title + 
					'</a>' + 
				'</dd>'
			);
		});
	});
	subCatalList = $('#sub-catal a');
}
