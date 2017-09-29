function userLogin() {
	var url = window.location.href;
	url = url.split('localhost:8080/wiki')[1];
	window.location.href = '/wiki/user/login?url=' + url;
}