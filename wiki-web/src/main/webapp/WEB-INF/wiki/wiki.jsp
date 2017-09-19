<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>wiki</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link href="../resources/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="../resources/css/wiki/wiki.css">
	<link rel="stylesheet" type="text/css" href="../resources/css/public.css">
	<script src="../resources/js/jquery-3.2.1.min.js"></script>
	<script src="../resources/bootstrap-3.3.7/js/bootstrap.min.js"></script>
	<script src="../resources/js/wiki/wiki.js"></script>
	<script src="../resources/js/wiki/wikiInit.js"></script>
	<script src="../resources/js/wiki/wikiScroll.js"></script>
	<script src="../resources/js/validate.js"></script>
</head>
<body style="background: #EEEEEE;" data-spy="scroll" data-target=".navbar-example" data-offset="0">
<nav class="navbar navbar-default" id="nav-top" role="navigation" style="background: #7FB80E;">
	<div class="container">
    <div class="navbar-header">
        <a class="navbar-brand" href="#" style="color: #FCFCFC;">Wiki</a>
    </div>
    </div>
</nav>
<div class="container">
	<!-- 相关作品部分 -->
	<div class="row" style="background: #FCFCFC;border: #DDDDDD solid 1px;">
		<div style="width: 100%;height: 36px;border-bottom: #CCCCCC solid 1px;">
			<span style="margin-left: 30px;line-height: 36px;font-weight: 600;color: #777777;">相关作品(共n项)</span>
			<button class="btn hol-but pull-right" id="add-same" style="margin-top: 6px;margin-right: 20px;">+添加作品</button>
		</div>
		<div style="padding-left: 20px;padding-right: 20px;padding-top: 5px;padding-bottom: 5px;">
			<!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
				<li class="nav-li"><a href="#">试一试长一点会怎么样，再长一点，再长一点</a></li>
			</div> -->
		</div>
	</div>
	<div class="row" id="main-div" style="margin-top: 10px;background: #FCFCFC;border: #DDDDDD solid 1px;">
		<!-- 主要内容左侧 -->
		<div class="col-xs-12 col-sm-9 col-md-9 col-lg-9" style="padding-left: 30px;background: #FCFCFC;">
			<h2 id="main-title" style="width: auto;font-family: Microsoft YaHei;margin-bottom: 0px;">我是主标题</h2>
			<button class="btn edit-icon" id="title-edit" style="float: right;margin-top: -30px;"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑名片</button>
			<h3 id="sub-title" style="font-family: Microsoft YaHei;font-size: 22px;color: #777777;margin-top: 5px;"><!-- (我是副标题) --></h3>
			<!-- 描述 -->
			<div id="main-des" style="text-indent: 30px;"></div>
			<!-- 基本信息 -->
			<button class="btn edit-icon" id="label-edit" style="float: right;"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑标签</button>
			<div class="row" style="margin-top: 40px;">
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<dl id="lab-list-left" class="msg-lab"></dl>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 msg-lab-r" style="margin-top: 0px;">
					<dl id="lab-list-right" class="msg-lab"></dl>
				</div>
			</div>
			<!-- 目录 -->
			<button class="btn edit-icon" id="catal-edit" style="float: right;"><i class="glyphicon glyphicon-pencil"></i>&nbsp;&nbsp;编辑目录</button>
			<div style="margin-top: 30px;background: #F7F7F7;border-top: #CCCCCC solid 1px;border-bottom: #CCCCCC solid 1px;">
				<h4 class="hidden-xs" style="float: left;font-family: Microsoft YaHei;margin-top: 30px;margin-left: 40px;">目录</h4>
				<div class="row" id="catal-bar" style="margin-left: 100px;padding-top: 15px;padding-bottom: 15px;background: #FCFCFC;border-left: #CCCCCC solid 1px;">
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="margin-top: 0px;">
						<dl id="catal1" class="catal"></dl>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="margin-top: 0px;">
						<dl id="catal2" class="catal"></dl>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" style="margin-top: 0px;">
						<dl id="catal3" class="catal"></dl>
					</div>
				</div>
			</div>
			<!-- 章节部分 -->
			<div id="chapter-container"></div>
			<!-- 图册 -->
			<div style="width: 100%; height: 300px;border: #CCC solid 1px;">
				<div style="width: 100%;height: 40px;border-bottom: #CCC solid 1px;background: #EEE">
					<span style="font-size: 20px;line-height: 40px;padding-left: 15px;font-family: Microsoft YaHei;">图册</span>
				</div>
			</div>
			<div id="quote">
				<h3 style="font-size: 20px;">参考资料</h3>
				<hr style="margin-top: 10px;border-color: #CCCCCC;">
			</div>
		</div>
		<!-- 主要内容右侧 -->
		<div class="hidden-xs col-sm-3 col-md-3 col-lg-3" style="background: #FCFCFC;">
			<div id="img-collection" style="width: 100%;margin-top: 30px;overflow: hidden;border: #DDD solid 2px;cursor: pointer;">
				<img src="../resources/image/bdbk.jpg" >
				<div style="width: 100%;height: 40px;background: #F5F5F5;line-height: 40px;">
					<img src="../resources/image/img.png" style="height: 26px;width: 26px;margin-left: 5px;align-content: center;">
					<span style="color: #666;font-family: Microsoft YaHei;font-size: 15px;">图册</span>
				</div>
			</div>
			<dl style="width: 100%;margin-top: 10px;padding: 10px;background: #FAFAFA;border: #DDD solid 1px;color: #555;">
				<dt style="font-size: 15px;padding-bottom: 5px;">词条统计</dt>
				<dd id="wiki-level" style="font-size: 13px;line-height: 20px;">词条等级: 1</dd>
				<dd id="wiki-version" style="font-size: 13px;line-height: 20px;">当前版本: 123<a id="check-history" style="cursor: pointer;"> [历史版本]</a></dd>
				<dd id="wiki-update-date" style="font-size: 13px;line-height: 20px;">最近更新: 2017-8-24</dd>
				<dd id="wiki-create-date" style="font-size: 13px;line-height: 20px;">创建时间: 2017-7-3</dd>
				<dd id="wiki-create-by" style="font-size: 13px;line-height: 20px;">创建人: test</dd>
			</dl>
			<div class="hidden" id="sub-catal-cont" style="position: fixed;height: 300px;bottom: 75px;overflow: hidden;">
				<div style="height: 300px;position: absolute; left: 5px; border-left: #CCC solid 2px;">
					<div style="width: 9px;height: 9px;position: absolute; left: -6px;background: #FCFCFC;z-index: 1000;">
						<img src="../resources/image/hollow.png" style="position: absolute;">
					</div>
					<div style="width: 9px;height: 9px;position: absolute;top: 291px; left: -6px;background: #FCFCFC;z-index: 1000;">
						<img src="../resources/image/hollow.png" style="position: absolute;">
					</div>
				</div>
				<div class="navbar-example" id="sub-catal-scroll" style="width: 110%;height: 290px;position: absolute;top: 5px;overflow: auto;">
					<dl class="sub-catal nav" id="sub-catal">
					</dl>
					<img id="buoy" src="../resources/image/buoy.png" style="width: 18px;height: 16px;position: absolute;top:5px;">
				</div>
			</div>
			<img class="hidden" id="return-top" src="../resources/image/return-top.png" style="position: fixed; bottom:10px;width: 50px;
			height: 50px;padding: 8px;background: #DDDDDD;cursor: pointer;">
		</div>
	</div>
	<div class="row" style="height: 200px;"></div>
</div>
<!-- 修改名片模态框 -->
<div class="modal fade" id="title-edit-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             	<h4 class="modal-title" id="myModalLabel">编辑名片</h4>
			</div>
			<div class="modal-body">
				副标题<input class="form-control" id="sub-title-edit" type="text" name=""><br/>
				描述<textarea class="form-control" id="main-des-edit" rows="15" style="resize: none;"></textarea><br/>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             	<button type="button" class="btn btn-primary" onclick="titleUpdate()">提交更改</button>
			</div>
		</div>
	</div>
</div>
<!-- 修改标签模态框 -->
<div class="modal fade" id="label-edit-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             			<h4 class="modal-title" id="myModalLabel">编辑词条</h4>
			</div>
			<div class="modal-body">
				标签
				<div class="msg-label-edit" style="width: 100%;padding: 10px 15px 10px 15px;border: #CCC solid 1px;border-radius: 4px;">
					<table class="table table-bordered table-striped model-table">
					<thead>
					<tr>
						<th width="40px">序号</th>
					    <th>标签名</th>
					    <th>标签内容</th>
					    <th width="168px">选项</th>
					</tr>
					</thead>
					<tbody id="edit-label-list"></tbody>
					</table>
				</div><br/>
				<div class="input-group">
			        <input type="text" class="form-control" id="add-label-name" placeholder="标签名">
		        	<span class="input-group-addon">:</span>
			        <input type="text" class="form-control" id="add-label-content" placeholder="标签内容">
			        <span class="input-group-btn">
                   			    <button class="btn btn-default" type="button" id="add-label-button">添加标签</button>
                 			</span>
		        </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             			<button type="button" class="btn btn-primary" onclick="labelUpdate()">提交更改</button>
			</div>
		</div>
	</div>
</div>
<!-- 编辑标签模态框 -->
<div class="modal fade" id="a-label-edit-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             	<h4 class="modal-title" id="myModalLabel">编辑标签</h4>
			</div>
			<div class="modal-body">
				标签名<input class="form-control" id="edit-label-name" type="text" name=""><br/>
				标签内容<input class="form-control" id="edit-label-content" type="text" name=""><br/>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             			<button type="button" class="btn btn-primary" onclick="onEditLabel()">提交更改</button>
			</div>
		</div>
	</div>
</div>
<!-- 修改目录模态框 -->
<div class="modal fade" id="catal-edit-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             	<h4 class="modal-title" id="myModalLabel">编辑词条</h4>
			</div>
			<div class="modal-body">
				章节目录
				<div style="width: 100%;padding: 10px 15px 10px 15px;border: #CCC solid 1px;border-radius: 4px;">
					<table class="table table-bordered table-striped model-table">
					<thead>
					<tr>
						<th width="40px">序号</th>
					    <th>标题</th>
					    <th width="168px">选项</th>
					</tr>
					</thead>
					<tbody id="edit-catal-list"></tbody>
					</table>
				</div><br/>
				<div class="input-group">
			        <input type="text" class="form-control" id="add-chapter" placeholder="章节标题">
			        <span class="input-group-btn">
                		<button class="btn btn-default" type="button" id="add-catal-button">新建章节</button>
             		</span>
		        </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
             	<button type="button" class="btn btn-primary" onclick="catalUpdate()">提交更改</button>
			</div>
		</div>
	</div>
</div>
<!-- 编辑目录模态框 -->
<div class="modal fade" id="a-catal-edit-model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
             	<h4 class="modal-title" id="myModalLabel">编辑目录</h4>
			</div>
			<div class="modal-body">
				标题<input class="form-control" id="edit-catal-title" type="text" name=""><br/>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
         		<button type="button" class="btn btn-primary" onclick="onEditCatal()">提交更改</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>