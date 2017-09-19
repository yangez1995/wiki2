function initCard(title, subTitle, describe) {
	$('#main-title').text(title);
	$('#sub-title').html(subTitle);
	$('#main-des').html(describe);
}

function initLabel(labels) {
	var lr = true;
	$(labels).each(function(i, label) {
		if(lr) {
			$('#lab-list-left').append(
				'<dt>' + label.name + '</dt>' +
				'<dd>' + label.content + '</dd><hr/>'
			);
			lr = false;
		} else {
			$('#lab-list-right').append(
				'<dt>' + label.name + '</dt>' +
				'<dd>' + label.content + '</dd><hr/>'
			);
			lr = true;
		}
		$('#edit-label-list').append(
			'<tr id="' + label.id + '">' + 
				'<td>' + (i + 1) + '</td>' +
				'<td>' + label.name + '</td>' +
				'<td>' + label.content + '</td>' +
				'<td>' + 
					'<button class="btn btn-primary btn-xs" onclick="ascending(this)">升序</button>' +  
					'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onclick="descending(this)">降序</button>' + 
					'<button class="btn btn-primary btn-xs" style="margin-left: 5px;" onClick="editLabel(this)">编辑</button>' + 
					'<button class="btn btn-danger btn-xs" style="margin-left: 5px;" onClick="removeLabel(this)">删除</button>' + 
				'</td>' +
			'</tr>'
		);
	});
}