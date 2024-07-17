## api
 - 本demo使用的"和风天气"提供的免费api获取天气信息，如果密钥过期可从官网"https://dev.qweather.com/"重新申请,密钥可通过配置"@/api/index.js"中的API_KEY进行修改。

## 权限
 - 本demo需要申请获取用户当前位置的权限，请在浏览器或app上通过权限申请
 
##  配置 
 - 接口配置:所有api都配置在"@/api/index.js"中，如果需要增加请求或者增加请求参数可以在文件中自行配置，已把现有接口注册到全局可以通过"this.$api"进行调用
 - 工具配置:工具函数都配置在"@/utils/utils.js"中，如果需要增加工具可以在该文件中配置导出。
 - 全局配置：可在main.js中增加需要提供到全局的函数或变量

## 样式 
 ### SASS:天气组件内样式均通过sass渲染，运行前需确认是否安装
 - 如何确认："sass --version"
 - 如何安装：
 - windows:
 - - npm:"npm install -g sass"
 - - Chocolatey:choco install sass"
 -  MacOS 或 Linux 上安装:
 - - brew: "brew install sass/sass/sass"
 ### 图标字体
 - 本demo使用的天气图标均是和风天气提供的图标字体，如何使用？
```vue
 - <html>
	<head>
		<!-- 引入字体样式 -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qweather-icons@1.3.0/font/qweather-icons.css">
	</head>
	<body>
		<div>
			<!-- 试试大雨和寒冷 -->
			It's raining <i class="qi-307"></i> and cold <i class="qi-901"></i>
		</div>
	</body>
	</html>
```

## 如何使用组件
- 在pages文件中引用
- 引入组件
 - import weatherForecast from '@/components/weather-forecast/weather-forecast.vue'
- 注册组件
- components:{
-     weatherForecast
- }
- 模板中使用
- 	
```vue
-	<template>
		<view class="content">
			<weatherForecast></weatherForecast>		
		</view>
	</template>
	<script>
		import weatherForecast from '@/components/weather-forecast/weather-forecast.vue'
		
	</script>
```
