$(document).ready(function() {
	resultPage();
	
	$('#new-wiki').click(function() {
		window.location.href = 'newWiki';
	});
});

function resultPage() {
	$.post('getPage', {'pageIndex' : 1}, function(result) {
		$(result.data).each(function(i, wiki) {
			$('#left-part').append(
				'<div class="wiki-card">' + 
					'<a href="wiki?wikiId=' + wiki.id + '&category=' + wiki.category + '">' + wiki.title + '</a><br/>' + 
					'<span class="label">更新时间:' + timeStampToDate(wiki.editTime) + '</span>' + 
					'<span class="label">词条等级:' + wiki.level + '</span>' +
					limitString(wiki.des, 100) +
				'</div>'
			);
		});
	});
}