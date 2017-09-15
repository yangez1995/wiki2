var holdSTop = 0;
var nowScroll = 0;
var scrollFloatRange = 0;
$(document).ready(function() {
	$('#sub-catal-cont').hover(function() {
		lockScroll();
	}, function() {
		holdSTop = 0;
	});
	$('#sub-catal-scroll').scroll(function() {
		lockScroll();
	});
	
	$(window).scroll(function() {
		if(holdSTop != 0) {
			$(window).scrollTop(holdSTop);
		}
		var sTop = $(document).scrollTop();
		sTop = parseInt(sTop);
		if(sTop >= 400) {
			$('#return-top').removeClass('hidden');
			$('#sub-catal-cont').removeClass('hidden');
			scrollFloatRange = $('#sub-catal').height() - 300;
			if(sTop + $(window).height() > maxH) {
				$('#return-top').css('bottom', sTop + $(window).height() - maxH + 10);
				$('#sub-catal-cont').css('bottom', sTop + $(window).height() - maxH + 75);
			} else {
				$('#return-top').css('bottom', 10);
				$('#sub-catal-cont').css('bottom', 75);
			}
		} else {
			$('#return-top').addClass('hidden');
			$('#sub-catal-cont').addClass('hidden');
		}
		var currentId = '';
		$(listens).each(function(i, listen) {
			if(sTop > ($(listen).offset().top - 50)) {
				currentId = '#' + $(listen).attr('id');
			} else {
				return false;
			}
		});
		var pTop = 0;
		$(subCatalList).each(function(i, a) {
			if($(a).attr('href') == currentId) {
				pTop = $(a).parent().position().top;
				$('#buoy').css('top', pTop + 7);
				if(scrollFloatRange > 0 && pTop > 150 && pTop < 190 + scrollFloatRange) {
					$('#sub-catal-scroll').scrollTop(pTop - 170);
				}
				unlockScroll();
			}
		});
	});
	
	$('#return-top').click(function() {
		$('body,html').animate({ scrollTop: 0 }, 200);
	});
	
	$('#add-same').click(function() {
		
	});
});

function lockScroll() {
	holdSTop = $(window).scrollTop();
}

function unlockScroll() {
	holdSTop = 0;
}