function timeStampToDateTime(timestamp) {
	if(timestamp == null) {
		return '';
	}
	var date = new Date(timestamp)
	return date.getFullYear() + '-' + prefixInteger((date.getMonth() + 1), 2) + '-' + 
			   prefixInteger(date.getDate(), 2) + ' ' + prefixInteger(date.getHours(), 2) + ':' + 
			   prefixInteger(date.getMinutes(), 2) + ':' + prefixInteger(date.getSeconds(), 2);
}

function timeStampToDate(timestamp) {
	if(timestamp == null) {
		return '';
	}
	var date = new Date(timestamp)
	return date.getFullYear() + '-' + prefixInteger((date.getMonth() + 1), 2) + '-' + 
			   prefixInteger(date.getDate(), 2);
}

//当数字短于规定长度时在前方补0
function prefixInteger(num, length) {  
	return (Array(length).join('0') + num).slice(-length);  
}