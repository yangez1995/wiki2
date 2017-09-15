<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="../resources/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="../resources/css/public.css" rel="stylesheet">
<link href="../resources/css/admin/index.css" rel="stylesheet"> 
<script src="../resources/js/jquery-3.2.1.min.js"></script>
<script src="../resources/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script src="../resources/js/admin/index.js"></script>
<script src="../resources/plugin/echarts.min.js"></script>
<script src="../resources/plugin/layer/layer.js"></script>
<script src="../resources/js/validate.js"></script>
<script src="../resources/js/customLayer.js"></script>
<title>admin</title>
</head>
<body lang="zh-CN">
<div class="container-fluid" style="padding: 0px;">
  <div style="width: 100%; height: 50px; background: var(--mcolor);">
    <div style="width: 200px; height: 100%; float: left;border-right: var(--mcolor-shallow) solid 1px;">
      <img src="../resources/image/default-head.png" style="width: 30px;height: 30px;margin-left: 10px;margin-top: 10px;border-radius: 15px;float: left;">
      <div style="float: left;margin-left: 10px;margin-top: 6px;width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
        <span id="on-login-name" style="color: #EEE;">用户昵称</span><br/>
        <span id="on-login-role" style="color: #CCC;font-size: 11px;">角色名</span>
      </div>
      <span id="logout" style="color: #EEE;line-height: 50px;cursor: pointer;" onMouseOver="this.style.color='#CCC'" onMouseOut="this.style.color='#EEE'">[注销]</span>
    </div>
    <div class="input-group" style="float: right;width: 240px;margin-top: 8px;margin-right: 20px;">
      <input class="form-control" id="easy-search" type="text">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" onclick="onEasySearch()">搜索</button>
      </span>
    </div>
  </div>
  <div id="left-nav" style="width: 200px; float:left; background: var(--mcolor-shallow);">
    <dl class="nav-dl dl-act">
      <dt>用户管理</dt>
      <dd id="u-account">· 用户帐号管理</dd>
      <dd id="u-role">· 用户角色管理</dd>
      <dd id="u-msg">· 用户信息管理</dd>
      <dd id="u-chart">· 用户图表</dd>
      <dd id="au-chart">· 用户活跃图表</dd>
    </dl>
    <dl class="nav-dl">
      <dt>角色管理</dt>
      <dd id="r-msg">· 角色信息管理</dd>
      <dd id="r-auth">· 角色权限管理</dd>
    </dl>
    <dl class="nav-dl">
      <dt>权限管理</dt>
      <dd id="auth-msg">· 权限信息管理</dd>
    </dl>
    <dl class="nav-dl">
      <dt>资源管理</dt>
      <dd id="res-msg">· 资源信息管理</dd>
      <dd id="res-type">· 资源类型管理</dd>
      <dd id="res-auth">· 资源权限管理</dd>
    </dl>
  </div>
  <div id="content" style="margin-left: 220px;padding: 20px;"></div>
</body>
</html>