function installStatistics(div) {
	$(div).append(
		'<dl style="width: 100%;margin-top: 10px;padding: 10px;background: #FAFAFA;border: #DDD solid 1px;color: #555;">' +
			'<dt style="font-size: 15px;padding-bottom: 5px;">词条统计</dt>' +
			'<dd id="wiki-level" style="font-size: 13px;line-height: 20px;">词条等级:</dd>' +
			'<dd id="wiki-version" style="font-size: 13px;line-height: 20px;">当前版本:</dd>' +
			'<dd id="wiki-update-date" style="font-size: 13px;line-height: 20px;">最近更新:</dd>' +
			'<dd id="wiki-create-date" style="font-size: 13px;line-height: 20px;">创建时间:</dd>' +
			'<dd id="wiki-create-by" style="font-size: 13px;line-height: 20px;">创建人:</dd>' +
		'</dl>'
	);
}

function initStatistics(data) {
	$('#wiki-level').text('词条等级: ' + data.level);
	$('#wiki-version').html('词条版本: ' + data.version + ' <a id="check-history" onclick="checkHistory()" style="cursor: pointer;">[版本改动]</a>');
	$('#wiki-create-date').text('创建时间: ' + timeStampToDate(data.createDate));
}

function checkHistory() {
	window.localStorage.setItem('wikiId', wikiId);
    window.location.href = 'history';
}