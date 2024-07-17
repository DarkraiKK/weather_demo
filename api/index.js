const API_KEY = '91754837c9ff43e4b7de7859cf9b22b3'; //你的和风天气key
const CITY_URL = "https://geoapi.qweather.com/v2/city/lookup"; //通过坐标获取当前城市
const NOW_WEATHER_URL = "https://devapi.qweather.com/v7/weather/now"; //通过坐标获取当前天气
const WEEK_WEATHER_URL = "https://devapi.qweather.com/v7/weather/7d"; //通过坐标获取7日天气

//获取用户当前坐标
export const getLocationApi = () => {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'wgs84', // 坐标类型，默认为wgs84，可选的值为gcj02和bd09ll
			success: res => {
				// 获取成功，经度和纬度在res.longitude和res.latitude中
				console.log('longitude:', res.longitude);
				console.log('latitude:', res.latitude);
				resolve(res)
			},
			fail: err => {
				// 获取失败，err为错误信息
				console.log('getLocation err:', err);
				uni.showModal({
					title: '当前坐标获取失败，是否发起重试？',
					// content: '这里是具体的错误信息',
					// showCancel: false ,// 用户可以点击取消按钮
					success: function(res) {
						//用户点击确定重新发起获取当前地址
						if (res.confirm) {
							getLocationApi()
							//设置连续发起重试需要等待2秒
							let timer = null;
							clearTimeout(timer);
							timer = setTimeout(() => {
								getLocationApi()
							}, 2000);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		});
	})
}

//获取当前天气
export const getNowWeather = (longitude, latitude) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: NOW_WEATHER_URL,
			data: {
				location: `${longitude},${latitude}`,
				lang: "zh-hans",
				key: API_KEY
			},
			success: ({
				data
			}) => {
				resolve(data)
			},
			fail: function(info) {
				uni.showModal({
					title: '当前天气获取失败！',
					content: info,
					showCancel: false
				});
				reject(info)
			}
		})
	})
}

//获取七日天气
export const getWeekWeather = (longitude, latitude) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: WEEK_WEATHER_URL,
			data: {
				location: `${longitude},${latitude}`,
				lang: "zh-hans",
				key: API_KEY
			},
			success: ({
				data
			}) => {
				resolve(data)
			},
			fail: function(info) {
				uni.showModal({
					title: '7日天气获取失败！',
					content: info,
					showCancel: false
				});
				reject(info)
			}
		})
	})
}

//根据坐标获取当前城市
export const getCity = (longitude, latitude) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: CITY_URL,
			data: {
				// location:"33.44,-94.04",
				location: `${longitude},${latitude}`,
				// q:"London",
				lang: "zh-hans",
				key: API_KEY
			},
			success: ({
				data
			}) => {
				resolve(data)
			},
			fail: function(info) {
				uni.showModal({
					title: '用户城市获取失败！',
					content: info,
					showCancel: false
				});
				reject(info)
			}
		})
	})
}

export default {
	getLocationApi,
	getNowWeather,
	getWeekWeather,
	getCity
}