<template>
	<head>
		<!-- 引入字体样式 -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qweather-icons@1.3.0/font/qweather-icons.css">
	</head>
	<view class="page" v-if="coordinates && now.temp">
		<view class="nav dp-flex-center">
			<!-- 当前城市 -->
			{{city}}
		</view>
		<view class="" style="font-weight: bold;">
			<view class="dp-flex-center wt-temp" style="margin-top: 140rpx;">
				<text style="font-size: 200rpx">
					<!-- 当前温度 -->
					{{now.temp}}
				</text>
				℃
			</view>
			<view class="dp-flex-center" style="margin-top: 60rpx;">
				<i :class="'qi-'+now.icon" style="margin:0 6px;"></i>
				<text>
					<!-- 当前天气 -->
					{{now.text }}
				</text>
			</view>
		</view>
		<view class="dp-flex-around">
			<view class="wt-info">
				<!-- 当前风向-->
				<image src="/static/icon-fengxiang.png" mode=""></image>
				{{now.windDir}}
			</view>
			<view class="wt-info">	
				<!-- 当前风速-->
				<image src="/static/icon-fengsu.png" mode=""></image>
				{{now.windSpeed}} km/h
			</view>
			<view class="wt-info">
				<!-- 当前湿度-->
				<image src="/static/icon-shidu.png" mode=""></image>
				{{now.humidity}}%
			</view>
		</view>
		<view class="wt-all" style="">
			<!-- 七日天气-->
			<view v-if="forecast.length>0" @click="current=i" :class="{'item-act':current==i}"
				class="dp-flex-between wt-all-item" v-for="(item,i) in forecast">
				<view class="">
					<!-- 日期 -->
					{{item.fxDate}}
				</view>
				<view class="">
					<!-- 天气-->
					<i :class="'qi-'+item.iconDay" style="margin:0 6px;"></i>
					{{item.textDay}}
				</view>
				<view class="">
					<!-- 温度范围-->
					{{item.tempMin}}°~{{item.tempMax }}°
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/index.js' //把获取坐标、查询城市、查询当前天气、查询七日天气的api传入到组件
	export default {
		data() {
			return {
				coordinates: "", //用户坐标
				city: '', //用户当前城市
				now: {}, //当时天气数据
				forecast: [], //7日天气数据
				current: 0, //当前选择的日期
				errorCode: ["400", '401', '402', '403', '404', '429', '500'] //和风天气api提供的错误码
			};
		},
		mounted() {
			this.getInfo()
			uni.showLoading()
		},
		methods: {
			//天气信息查询的总函数
			getInfo() {
				uni.showLoading()
				let _this = this
				api.getLocationApi().then(res => {
					this.coordinates = `${res.longitude},${res.latitude}`
					//通过promiseall发起查询当前城市、查询当前天气、查询七日天气的请求，如果一个报错就提示错误
					Promise.all([api.getCity(res.longitude, res.latitude), api.getNowWeather(res.longitude, res
							.latitude), api.getWeekWeather(res.longitude, res.latitude)])
						.then(values => {
							// 当所有 promise 都成功解决后，这里的 values 是一个数组，包含了每个 promise 的结果
							//只要其中一个请求返回错误码就提示错误，用户可选择重新发起申请
							if (values.some(value => this.errorCode.includes(value.code))) {
								uni.showModal({
									title: '天气信息获取失败，是否发起重试？',
									success: function(res) {
										//用户点击确定重新发起获取当前地址
										if (res.confirm) {
											//设置连续发起重试需要等待2秒
											let timer = null;
											clearTimeout(timer);
											timer = setTimeout(() => {
												_this.getInfo()
											}, 2000);
										} else if (res.cancel) {
											uni.hideLoading()
											console.log('用户点击取消');
										}
									}
								});
							} else if (values.some(value => value === "204")) {
								//如果请求成功却当前位置api不支持查询就拒绝用户再次发起请求
								uni.showModal({
									title: '抱歉，当前您的位置暂时无法获取到天气信息',
									showCancel: false, // 用户可以点击取消按钮
								});
								uni.hideLoading()
							} else {
								this.city = values[0].location[0].adm1 //设置当前城市
								this.now = values[1].now //设置当前天气信息
								this.forecast = values[2].daily //设置7日天气信息
								uni.hideLoading()
							}
						})
						.catch(error => {
							// 如果任何一个 promise 失败，这里会捕获到错误
							uni.showModal({
								title: '天气信息获取失败，是否发起重试？',
								content: error,
								success: function(res) {
									//用户点击确定重新发起获取当前地址
									if (res.confirm) {
										//设置联系发起重试需要等待2秒
										let timer = null;
										clearTimeout(timer);
										timer = setTimeout(() => {
											_this.getInfo()
										}, 2000);
									} else if (res.cancel) {
										uni.hideLoading()
										console.log('用户点击取消');
									}
								}
							});
						});
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav {
		font-size: 38rpx;
		height: 100rpx;
	}

	.dp-flex-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}


	.dp-flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.dp-flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.page {
		height: 100vh;
		background: linear-gradient(15deg, #0000db, #237aec, #00d5ec);
		color: #FFFFFF;
	}

	.wt-info {
		margin-top: 160rpx;
		display: flex;
		align-items: center;

		image {
			width: 42rpx;
			height: 36rpx;
			margin-right: 10rpx;
		}
	}

	.wt-temp {
		line-height: 1;
		align-items: stretch;
	}

	.wt-all {
		box-sizing: border-box;
		margin-top: 80rpx;
		width: 100%;
		padding: 76rpx 42rpx;
		background-color: #FFFFFF;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0px 0px;
		color: #666666;
	}

	.wt-all-item:not(:last-child) {
		margin-bottom: 70rpx;
	}

	.item-act {
		color: #017EFF;
	}
</style>