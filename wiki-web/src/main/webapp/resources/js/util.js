function fromToJson(arr) {
	var json = {};
	$(arr).each(function(i, a) {
		json[a.name] = a.value;
	})
	return json;
}

function limitString(str, length) {
	str.replace('<p>', '');
	str.replace('</p>', '');
	if(str.length > length) {
		str = str.substring(0,length) + '...';
	}
	return '<p>' + str + '</p>';
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}