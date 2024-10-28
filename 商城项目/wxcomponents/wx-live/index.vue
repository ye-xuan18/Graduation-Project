<template>
<uni-shadow-root class="wx-live-index"><view class="wx-live" v-if="liveInfo.status===2">
	
	<view class="live-icon"><image class="live-image" src="https://ccmao-b2c.oss-cn-shenzhen.aliyuncs.com/live.gif"></image></view>
	<view class="live-text">
	    <view class="nick-name">{{liveInfo.description}}</view>
	</view>
	<view class="live-btn" @click="openChannelsLive" :data-finderusername="finderUserName"> 进入直播间</view>
</view>

<view v-if="liveInfo.status===3">
	
	
	<view class="wx-replay" v-if="liveInfo.replayStatus===1">
		
	</view>
	<view class="wx-notice" v-if="noticeInfo.status===0 && noticeInfo.reservable">
	        <view class="reserve-icon">直播预告</view>
	        <view class="reserve-text">
	            <view class="nick-name">{{noticeInfo.nickname}}</view>
	            <view class="desc">{{noticeInfo.startTimeText}}后开播</view>
	        </view>
			<view class="reserve-btn" @click="reserveChannelsLive" :data-noticeid="noticeInfo.noticeId"> 预约直播</view>
		</view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'wx-live/index'
Component({
	properties: {
		// 视频号id
		finderUserName: {
			type: String,
			value: '',
		}
	},
	data: {
		liveInfo: {},
		noticeInfo: {}, //预告信息
		feedId: ''
	},

	ready() {
		var that = this;
		console.log(that.data.finderUserName);
		wx.getChannelsLiveInfo({
			finderUserName: that.data.finderUserName,
			success: res => {
				console.log(res);
				that.setData({
					liveInfo: res,
					feedId: res.feedId
				})
				// 直播结束, 获取下一场直播预告
				if (res.status === 3) {
					that.getChannelsLiveNoticeInfo(that.data.finderUserName)
				}
			},
			fail: res => {
				console.log(res);
			}
		})
	},

	methods: {

		getChannelsLiveNoticeInfo: function(finderUserName) {
			var that = this;
			wx.getChannelsLiveNoticeInfo({
				finderUserName: finderUserName,
				success: res => {
					console.log(res);
					that.setData({
						noticeInfo: res
					})
					//如果可以预约， 计算还剩多久开播
					if(res.status ===0 && res.reservable){
						this.calcTime(res.startTime);
					}
				},
				fail: res => {
					console.log(res);
				}
			})
		},
		openChannelsLive: function(e) {
			var finderUserName = e.currentTarget.dataset.finderusername;
			wx.openChannelsLive({
				finderUserName: finderUserName,
				success: res => {
					console.log(res);
				},
				fail: res => {
					console.log(res);
				}
			})
		},
		reserveChannelsLive: function(e) {
			var noticeid = e.currentTarget.dataset.noticeid;
			wx.reserveChannelsLive({
				noticeId: noticeid,
				success: res => {
					console.log(res);
				},
				fail: res => {
					console.log(res);
				}
			})
		},
		calcTime: function(timeStamp) {
			//10位timestamp
			var currentTimestamp = Math.round(new Date() / 1000);
			var remainingTimestamp = timeStamp - currentTimestamp;
			//转成日时分
			var days = parseInt(remainingTimestamp / (60 * 60 * 24));
			var hours = parseInt((remainingTimestamp % (60 * 60 * 24)) / (60 * 60));
			var minutes = parseInt((remainingTimestamp % (60 * 60)) / (60));
			var startTimeText = '';
			if (days > 0) {
				startTimeText = startTimeText + days + '天';
			}
			if (hours > 0) {
				startTimeText = startTimeText + hours + '小时';
			}
			if (minutes > 0) {
				startTimeText = startTimeText + minutes + '分';
			}
			console.log('直播' + startTimeText + '后开始');
			this.setData({
				'noticeInfo.startTimeText': startTimeText
			})
		}
	}
})
export default global['__wxComponents']['wx-live/index']
</script>
<style platform="mp-weixin">
.wx-live{
	display: flex;
	align-items: center;
	padding: 5px;
	margin: 5px;
	border-radius: 10px;
	background: #fff;
}
.live-icon{
	height: 23px;
}
.live-image{
	width: 84px;
	height: 23px;
}
.live-text{
    margin-left: 10px;
}
.live-btn{
	margin-left: auto;
	background: #fff;
	padding: 5px;
	color: #DF523D;
	border: #DF523D .5px solid;
}

.wx-replay{
	
}

.wx-notice{
	display: flex;
	align-items: center;
	padding: 5px;
	margin: 5px;
	border-radius: 10px;
	background: #fff;
}
.reserve-icon{
	background: #ffbd71;
	padding: 5px;
	color: #fff;
	border-radius: 5px;
}
.reserve-text{
    margin-left: 10px;
}
.nick-name{
	font-weight: bold;
	color: #303133;
}
.desc{
	color: #909399;
}
.reserve-btn{
	margin-left: auto;
	background: #fff;
	padding: 5px;
	color: #ffbd71;
	border: orange .5px solid;
}
</style>