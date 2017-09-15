<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>editer</title>
<link href="../resources/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="../resources/css/public.css" rel="stylesheet">
<link href="../resources/css/wiki/editer.css" rel="stylesheet">
<script src="../resources/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../resources/plugin/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="../resources/plugin/ueditor/ueditor.all.js"></script>
<script type="text/javascript" src="../resources/plugin/layer/layer.js"></script>
<script type="text/javascript" src="../resources/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../resources/js/wiki/editer.js"></script>
</head>
<body style="background: #EEE;">
<div class="container">
<nav class="navbar navbar-default navbar-fixed-top" id="nav-top" role="navigation" style="background: #7FB80E;">
	<div class="container">
    <div class="navbar-header">
        <a class="navbar-brand" href="#" style="color: #FCFCFC;">Wiki</a>
    </div>
    </div>
</nav>
<div class="row " style="margin-top: 52px;">
	<div class="hidden-xs col-sm-3 col-md-3 col-lg-3">
		<div id="left-part" style="position: fixed;background: #FCFCFC;border: #DFDFDF solid 1px;overflow: auto;">
			<div style="width: 100%; height: 36px; border-bottom: #DFDFDF solid 1px;">
				<span style="padding-left: 15px;font-size: 15px;line-height: 36px;font-weight: 600;">章节信息</span>
				<button class="btn hol-but pull-right" id="add-child" style="margin-top: 6px;margin-right: 10px;">+子章节</button>
			</div>
			<ul class="nav" id="nav"></ul>
		</div>
	</div>
	<div class="col-xs-12 col-sm-9 col-md-9 col-lg-9" style="background: #FCFCFC;">
		<div style="width: 100%; height: 60px; padding-left: 15px; padding-right: 15px;">
			<h4 style="display: inline-block;font-weight: 600;padding-top: 10px;">点击段落开始编辑</h4>
			<button type="button" class="btn btn-primary pull-right" id="submit" style="margin-top: 15px;">提交</button>
		</div>
		<div id="right-part-content" style="padding-bottom: 30px;"></div>
	</div>
</div>
</div>
<!-- 新子章节模态框 -->
<div class="modal fade" id="add-child-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             	<h4 class="modal-title" id="myModalLabel">新建子章节</h4>
			</div>
			<div class="modal-body">
				标题<input class="form-control" id="create-child-title" type="text" name=""><br/>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
         		<button type="button" class="btn btn-primary" onclick="addChild()">新建子章节</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>