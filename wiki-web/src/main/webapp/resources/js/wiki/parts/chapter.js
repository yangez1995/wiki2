function installChapter(div) {
	$(div).append('<div id="chapter-container"></div>');
}

function initChapter(chapters) {
	$('#chapter-container').html('');
	$(chapters).each(function(i, chapter) {
		var pId = 'chapter'  + chapter.serNum;
		$('#chapter-container').append(
			'<div class="chapters" id="' + pId + '" style="margin-bottom: 30px;">' + 
				'<div class="a-chapter" id="' + chapter.id +'">' +
					'<button class="btn edit-icon chapter-edit" style="float: right;" onclick="editChapter(this)"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑</button>' +
					'<h3 class="onlisten" id="main-title' + chapter.serNum + '">' + chapter.title + '</h3><hr/>' +
					'<div class="chapter-content">' + chapter.content + '</div>' + 
				'</div>' + 
			'</div>'
		);
		pId = '#' + pId;
		$(chapter.childs).each(function(i, child) {
			$(pId).append(
				'<div class="a-child" id="' + child.id + '">' + 
					'<h4 class="onlisten" id="sub-title' + chapter.serNum + '-' + child.serNum +'">' + child.title + '</h4>' +
					'<div class="child-content">' + child.content + '</div>' + 
				'</div>'
			);
		});
	});
}

function editChapter(e) {
	var chapter = {};
	var childs = [];
	chapter.id = $(e).parent().attr('id');
	chapter.wikiId = wikiId;
	chapter.title = $(e).parent().find('h3').text();
	chapter.content = $(e).parent().find('div').html();
	var chapters = $(e).parent().parent();
	$(chapters).find('.a-child').each(function(i, c) {
		var child = {};
		child.id = $(c).attr('id');
		child.parentId = chapter.id;
		child.title = $(c).find('h4').text();
		child.content = $(c).find('div').html();
		childs.push(child);
	});
	chapter.childs = childs;
	window.localStorage.setItem('chapter', JSON.stringify(chapter));
	window.localStorage.setItem('category', category);
    window.location.href = 'editer';
}