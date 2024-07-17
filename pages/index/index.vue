<template>
	<view class="content">
		
		<weatherForecast></weatherForecast>
	</view>
</template>

<script>
	import weatherForecast from '@/components/weather-forecast/weather-forecast.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		},
		components:{
			weatherForecast
		}
	}
</script>

<style>
</style>
