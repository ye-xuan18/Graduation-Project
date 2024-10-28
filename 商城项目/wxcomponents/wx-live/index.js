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