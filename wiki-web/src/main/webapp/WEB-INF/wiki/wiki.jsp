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
	<script src="../resources/js/util/timeUtil.js"></script>
	<script src="../resources/js/wiki/parts/card.js"></script>
	<script src="../resources/js/wiki/parts/label.js"></script>
	<script src="../resources/js/wiki/parts/catal.js"></script>
	<script src="../resources/js/wiki/parts/chapter.js"></script>
	<script src="../resources/js/wiki/parts/statistics.js"></script>
	<script src="../resources/js/wiki/parts/subCatal.js"></script>
	<script src="../resources/js/wiki/wiki.js"></script>
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
		<div class="col-xs-12 col-sm-9 col-md-9 col-lg-9" id="left-part" style="padding-left: 30px;background: #FCFCFC;">
			<!-- 图册 -->
			<!-- <div style="width: 100%; height: 300px;border: #CCC solid 1px;">
				<div style="width: 100%;height: 40px;border-bottom: #CCC solid 1px;background: #EEE">
					<span style="font-size: 20px;line-height: 40px;padding-left: 15px;font-family: Microsoft YaHei;">图册</span>
				</div>
			</div>
			<div id="quote">
				<h3 style="font-size: 20px;">参考资料</h3>
				<hr style="margin-top: 10px;border-color: #CCCCCC;">
			</div> -->
		</div>
		<!-- 主要内容右侧 -->
		<div class="hidden-xs col-sm-3 col-md-3 col-lg-3" id="right-part" style="background: #FCFCFC;">
			<div id="img-collection" style="width: 100%;margin-top: 30px;overflow: hidden;border: #DDD solid 2px;cursor: pointer;">
				<img src="../resources/image/bdbk.jpg" >
				<div style="width: 100%;height: 40px;background: #F5F5F5;line-height: 40px;">
					<img src="../resources/image/img.png" style="height: 26px;width: 26px;margin-left: 5px;align-content: center;">
					<span style="color: #666;font-family: Microsoft YaHei;font-size: 15px;">图册</span>
				</div>
			</div>
			<img class="hidden" id="return-top" src="../resources/image/return-top.png" style="position: fixed; bottom:10px;width: 50px;
			height: 50px;padding: 8px;background: #DDDDDD;cursor: pointer;">
		</div>
	</div>
	<div class="row" style="height: 200px;"></div>
</div>
</body>
</html>