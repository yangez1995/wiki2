function fromToJson(arr) {
	var json = {};
	$(arr).each(function(i, a) {
		json[a.name] = a.value;
	})
	return json;
}