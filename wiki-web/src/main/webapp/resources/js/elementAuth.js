$(document).ready(function() {
	checkElementAuth();
});

function checkElementAuth() {
	var elements = [];
	$('security-element').each(function() {
		var element = {};
		element.url = $(this).attr('url');
		elements.push(element);
	});
	$.ajax({
		type : 'POST',
		url : '../getElementAuth',
		contentType:"application/json",
		data : JSON.stringify(elements),
		success : function(result) {
			$('security-element').each(function() {
				var url = $(this).attr('url');
				if(!result[url]) {
					$(this).remove();
				}
			});
		}
	});
}