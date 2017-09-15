<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link href="../resources/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="../resources/css/wiki/history.css" rel="stylesheet">
<script src="../resources/js/jquery-3.2.1.min.js"></script>
<script src="../resources/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script src="../resources/js/wiki/history.js"></script>
<title>history</title>
</head>
<body>
<nav class="navbar navbar-default" id="nav-top" role="navigation" style="background: #7FB80E;">
	<div class="container">
    <div class="navbar-header">
        <a class="navbar-brand" href="#" style="color: #FCFCFC;">Wiki</a>
    </div>
    </div>
</nav>
<div class="container">
	<h4 style="display: inline-block;padding: 5px;font-size: 20px;">主标题</h4>
	<span class="pull-right" style="margin-top: 15px;padding-top: 2px;padding-bottom: 2px;padding-right: 15px;padding-left: 8px;font-size: 14px;color: #999;border-left: #CCC solid 1px;">共被编辑xxx次</span>
	<table class="table" style="border: #CCC solid 2px;">
		<thead style="background: #F9F9F9;">
		<tr>
		    <th>版本号</th>
		    <th>修改部分</th>
		    <th>修改人</th>
		    <th>修改时间</th>
		    <th>详细</th>
		</tr>
		</thead>
		<tbody id="list">
		<!-- <tr>
			<td>1</td>
			<td>目录</td>
			<td>test</td>
			<td>1111-11-11 11:11:11</td>
			<td><a>查看</a></td>
		</tr> -->
		</tbody>
	</table>
</div>
</body>
</html>