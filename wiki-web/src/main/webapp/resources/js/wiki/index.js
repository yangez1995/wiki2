$(document).ready(function() {
	resultPage();
	
	$('#new-wiki').click(function() {
		window.location.href = 'newWiki';
	});
});

function resultPage() {
	$('#left-part').empty();
	var search = $('#search').val();
	if(search == '' || search == null) {
		search = '*';
	}
	var params = {};
	params.q = 'wiki_title:' + search;
	params['hl.fl'] = 'wiki_title';
	params.hl = 'on';
	params['hl.simple.pre'] = '<font color="red">';
	params['hl.simple.post'] = '</font>';
	$.post('/solr/core/select', params, function(result) {
		$(result.response.docs).each(function(i, wiki) {
			var div = '<div class="wiki-card">' + 
						  '<a href="wiki?wikiId=' + wiki.id + '&category=' + wiki.wiki_category + '">';
			if(search == '*') {
				div += wiki.wiki_title;
			} else {
				div += result.highlighting[wiki.id].wiki_title;
			}
			div += '</a><br/>';
			if(wiki.edit_time != '' && wiki.edit_time != null) {
				div += '<span class="label">更新时间:' + timeStampToDate(wiki.edit_time) + '</span>';
			} else {
				div += '<span class="label">更新时间:' + timeStampToDate(wiki.create_date) + '</span>';
			}
			div += '<span class="label">词条等级:' + wiki.level + '</span>' +
				   limitString(wiki.wiki_describe, 150) + '</div>';
			$('#left-part').append(div);
		});
	});
}