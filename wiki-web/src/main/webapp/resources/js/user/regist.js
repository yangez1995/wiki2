var isUsernameExist = 0;
$(document).ready(function() {
	//当用户名输入框失去焦点时，判断所输入用户名是否已经存在。
	$('#username').blur(function() {
		$.get('checkUsernameExist',{username:$('#username').val()},function(result) {
			if(result == '1') {
				$('#tips').html('用户名已经存在！');
				isUsernameExist = 1;
			} else {
				$('#tips').html('');
				isUsernameExist = 0;
			}
		});
	});
	
	$('#b-regist').click(function() {
		//验证用户名
		if(!isUsername($('#username').val())) {
			return false;
		}
		if(isUsernameExist) {
			validateErrorFrame('用户名已经存在！');
			return false;
		}

		//验证密码
		if(!isPassword($('#password').val())) {
			return false;
		}

		//验证确认密码
		if($('#affirm').val() != $('#password').val()) {
			validateErrorFrame('两次密码输入不同！');
			return false;
		}
		
		$.post('regist',$('#f-regist').serialize(),function(result) {
			if(result.code == '200') {
				window.location.href = 'login';
			} else {
				validateErrorFrame(result.msg);
			}
		},'json');
	});
});