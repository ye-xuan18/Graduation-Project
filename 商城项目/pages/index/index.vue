<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box" :style="{ top: searchBarTop + 'px', height: searchBarHeight + 'px'}">
			<input class="ser-input" :style="{height: searchBarHeight + 'px'}" type="text"
				value="创创猫" disabled @click="navSearch" />
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background"></view>
			<swiper :autoplay="true" :interval="3000" class="carousel" :class="'carousel-'+activeLayout.swiperMode" circular>
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item"
					@click="navSwiper(item)">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
		</view>

		<view class="announcement-section" v-if="announcement.length>0">
			<uni-notice-bar scrollable="true" showIcon="true" showClose="false" showGetMore="true"
				:text="announcement[0].title" single="true" moreText="查看" @getmore="navAnnouncement"></uni-notice-bar>
		</view>
		<!-- 视频号直播 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="live-section" v-for="(liveWechatFinderUserName,index) in liveWechatFinderUserNameArray"
			v-if="applicationConfig.liveWechatPublicEnabled">
			<wx-live :finderUserName="liveWechatFinderUserName.trim()"></wx-live>
		</view>
		<!-- #endif -->

		<view class="cate-section" v-if="activeLayout.cateDisplayedHome && cates.length>0">
		<!-- 商品分类少于等于8个，二行显示 -->
		<scroll-view scroll-x="true" scroll-left="120" class="cate-section" v-if="cates.length>8">
			<view class="cate-item" v-for="(cate,index) in cates" :key="index" v-if="index*2<cates.length">
				<view @click="navToCate(cates[index*2].productCateUuid)">
					<view><image :src="cates[index*2].catePicUrl"></image></view>
					<view><text>{{cates[index*2].cateName}}</text></view>
				</view>
				<view @click="navToCate(cates[index*2+1].productCateUuid)" class="cate-item-child-b"
					v-if="index*2+1<cates.length">
					<view><image :src="cates[index*2+1].catePicUrl"></image></view>
					<view><text>{{cates[index*2+1].cateName}}</text></view>
				</view>
			</view>
		</scroll-view>
		<!-- 商品分类少于等于8个，一行显示 -->
		<scroll-view scroll-x="true" scroll-left="120" class="cate-section" v-if="cates.length<=8">
			<view class="cate-item" v-for="(cate,index) in cates" :key="index" v-if="index<cates.length">
				<view @click="navToCate(cates[index].productCateUuid)">
					<view><image :src="cates[index].catePicUrl"></image></view>
					<view><text>{{cates[index].cateName}}</text></view>
				</view>
			</view>
		</scroll-view>
		</view>
		<!-- 上下轮播的广告 -->
		<div class="ad-section">
			<swiper :autoplay="true" :interval="3000" class="ad-carousel" :class="'ad-carousel-'+activeLayout.adMode" circular v-if="ads.length>0">
				<swiper-item v-for="(ad, index) in ads" :key="index" class="carousel-item" @click="navAD(ad)">
					<image @click="navAD(ad)" :src="ad.url" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</div>
		<!-- 领券、积分 -->
		<view class="function-section" v-if="activeLayout.functionDisplayedHome">
			<view class="left-wrapper" @click="navCoupon"></view>
			<view class="right-wrapper">
				<view class="sign-on" v-if="signSetting.enabled" @click="navSign"></view>
				<view class="sign-point" @click="navPoint"></view>
				<view class="live-room" @click="navLiveRooms" v-if="applicationConfig.liveWechatPrivateEnabled"></view>
			</view>
		</view>
		<!-- 团购、秒杀 -->
		<view class="s-g-section">
			<!-- 秒杀楼层 -->
			<view class="s-wrapper"  @click="navSecKill()" :class="'s-wrapper-'+activeLayout.sCols" v-if="secKills.length>0">
				<view class="s-header">
					<image class="s-img" src="/static/image/secskill-img.jpg" mode="widthFix"></image>
					<uni-countdown v-if="secKillFlag ==''" class="countdown" :day="secKillCountDown.days"
						:hour="secKillCountDown.hours" :minute="secKillCountDown.minutes"
						:second="secKillCountDown.seconds" color="#FFFFFF" background-color="#333333" />
					<text class="end" v-if="secKillFlag=='END'">已结束</text>
					<text class="end" v-if="secKillFlag=='START'">秒杀中</text>
					<uni-icons type="right" style="margin-left:auto"></uni-icons>
				</view>
				<view class="seckill-section" v-if="secKills.length>0">
					<swiper class="s-swiper" :autoplay="true" :interval="3000" vertical="true" circular>
						<swiper-item class="s-swiper-item" v-if="index%activeLayout.sProductCols === 0"
							v-for="(item, index) in secKills" :key="index">
							<view class="s-item" :class="'s-item-'+activeLayout.sProductCols"
								v-if="(index+i)<secKills.length" v-for="(n,i) in activeLayout.sProductCols">
								<image :src="secKills[index+i].productDTO.productMainImage.url" mode="aspectFill"></image>
								<view class="t-box">
									<text class="title clamp">{{secKills[index+i].productDTO.productName}}</text>
									<view class="price-box">
										<text class="price">{{secKills[index+i].unitPrice}}</text>
										<text class="m-price">{{secKills[index+i].productDTO.unitPrice}}</text>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 团购楼层 -->
			<view class="g-wrapper" :class="'g-wrapper-'+activeLayout.gCols" v-if="groupBuys.length>0">
				<view class="f-header">
					<image src="/static/image/pintuan.png"></image>
					<view class="tit-box">
						<text class="tit">精品团购</text>
					</view>
					<uni-icons type="right" @click="navGroupBuy()"></uni-icons>
				</view>
				<view class="group-section" v-if="groupBuys.length>0">
					<swiper class="g-swiper" :class="'g-swiper-'+activeLayout.gProductCols" :autoplay="true"
						:interval="4000">
						<swiper-item class="g-swiper-item" v-if="index%activeLayout.gProductCols === 0"
							v-for="(item, index) in groupBuys" :key="index">
							<view class="g-item" :class="'g-item-'+activeLayout.gProductCols"
								v-if="(index+i)<groupBuys.length" v-for="(n,i) in activeLayout.gProductCols">
								<image :src="groupBuys[index+i].productDTO.productMainImage.url" mode="aspectFill"
									@click="navGroupBuyDetail(index+i)"></image>
								<view class="t-box">
									<text class="title clamp">{{groupBuys[index+i].productDTO.productName}}</text>
									<view class="price-box">
										<text class="price">{{groupBuys[index+i].unitPrice}}</text>
										<text
											class="m-price">{{groupBuys[index+i].productDTO.unitPrice}}</text>
									</view>
									<view class="pro-box">
										<view class="progress-box">
											<progress percent="72" active stroke-width="6" />
										</view>
										<text>{{groupBuys[index+i].minUserCount}}人团</text>
									</view>
								</view>
							</view>
						</swiper-item>

					</swiper>
				</view>
			</view>
		</view>
		<!-- 商品分组楼层 -->
		<view class="group-product-section">
			<!-- 新人专区 -->
			<view :class="'group-wrapper-'+activeLayout.fCols" v-if="giftProductList.length>0" @click="navToNewCustomerProductPage">
				<view class="f-header">
					<image src="/static/image/new-customer-price.png"></image>
					<view class="tit-box">
						<text class="tit">新人专享</text>
						<text class="tit2">超低价0.01元起</text>
					</view>
				</view>
				<view class="hot-floor">
					<view class="floor-img-box">
						<!-- <image class="floor-img" :src="group.backgroundUrl" mode="scaleToFill"></image> -->
					</view>
					<view class="floor-list">
						<scroll-view scroll-x>
							<view class="scoll-wrapper">
								<view v-for="giftProduct in giftProductList" class="floor-item">
									<image :src="giftProduct.productDTO.productMainImage.url" mode="aspectFill"></image>
									<text class="title clamp">{{giftProduct.productDTO.productName}}</text>
									<span class="price">￥{{giftProduct.productUnitPrice}}</span>
									<span class="list-price">￥{{giftProduct.productDTO.unitPriceStandard}}</span>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view v-for="group in productGroups" :class="'group-wrapper-'+activeLayout.fCols">
				<view class="f-header" @click="navToGroupPage(group)">
					<image :src="group.iconUrl" v-if="group.iconUrl"></image>
					<view class="tit-box">
						<text class="tit">{{group.groupName}}</text>
						<text class="tit2">{{group.groupDescription}}</text>
					</view>
				</view>
				<view class="hot-floor">
					<view class="floor-img-box">
						<image class="floor-img" :src="group.backgroundUrl" mode="scaleToFill"></image>
					</view>
					<view class="floor-list">
						<scroll-view scroll-x>
							<view class="scoll-wrapper">
								<view v-for="product in group.productList" class="floor-item"
									@click="navToDetailPage(product)">
									<image :src="product.productMainImage.url" mode="aspectFill"></image>
									<text class="title clamp">{{product.productName}}</text>
									<text class="price">￥{{product.unitPrice}}</text>
									<span class="list-price">￥{{product.unitPriceStandard}}</span>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐、热卖、新品 -->
		<view class="product-section">
			<view class="tab-swiper-wrapper">
				<u-tabs-swiper ref="uTabs" name="tabName" :show-bar="true" :list="tabBars" :active-color="uiConfig.baseColor" :is-scroll="true" :current="tabCurrentIndex"
					@change="changeTab"></u-tabs-swiper>
			</view> 
			<swiper :current="swiperCurrentIndex" @transition="transition" @animationfinish="animationfinish" style="height:100vh">
				<swiper-item v-for="tabItem in tabBars">
					<scroll-view scroll-y scroll-x="false" :show-scrollbar="false" style="height: 100vh;" @scrolltolower="loadMoreProduct">
					<product-list :productList="tabItem.productList" :cols="activeLayout.productCols"></product-list>
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 快捷功能浮动按钮 -->
		<uni-fab v-if="activeLayout.fabDisplayedHome" ref="fab" :pattern="pattern" :content="content"
			horizontal="right" vertical="bottom" direction="horizontal" @trigger="trigger" @fabClick="fabClick" />
		<!-- 新人优惠券领取 -->
		<u-mask :show="showGift" :mask-click-able="false">
			<view class="gift-wrapper">
				<image :src="giftImageUrl" class="gift-image" @click="receiveProfitWelfare"></image>
				<view class="gift-close">
					<u-icon size="80" name="close-circle" @click="showGift=false"></u-icon>
				</view>
			</view>
		</u-mask>
		<!-- 意见反馈 -->
		<u-mask :show="showFeedback" :mask-click-able="false">
			<view class="feedback">
				<view class="feedback-title">意见反馈</view>
				<view class="feedback-desc">感谢访问，如果您有好的建议，可以反馈在这里，我们会努力改善产品和服务。</view>
				<view class="feedback-action"><button type="default" open-type="feedback">马上反馈</button></view>
			</view>
			<view class="feedback-close"><u-icon size="60" name="close-circle" @click="showFeedback=false"></u-icon></view>
		</u-mask>
		<!-- 商务咨询 -->
		<u-mask :show="showSales" :mask-click-able="false">
			<view class="sales"><view class="sales-title">商务咨询</view>
				<view class="sales-desc" v-if="applicationConfig.applicationSalesQrcode">长按识别二维码添加商务微信</view>
				<view v-if="applicationConfig.applicationSalesQrcode">
					<image :show-menu-by-longpress="true" :src="applicationConfig.applicationSalesQrcode" mode="aspectFill" style="width:100%"></image>
				</view>
				<view class="sales-action" v-if="applicationConfig.applicationSalesPhone"><button type="default" @click="call(applicationConfig.applicationSalesPhone)">拨打{{applicationConfig.applicationSalesPhone}}</button></view>
			</view>
			<view class="sales-close"><u-icon size="60" name="close-circle" @click="showSales=false"></u-icon></view>
		</u-mask>
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	import productList from '@/components/product-list.vue'
	// #ifdef MP-WEIXIN
	import wxLive from '@/wxcomponents/wx-live/index'
	// #endif
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		onShareAppMessage(res) {
			return {
				title: this.applicationConfig.applicationName,
				path: '/pages/index/index'
			}
		},
		onShareTimeline() {
			return {
				title: this.applicationConfig.applicationName,
				path: '/pages/index/index'
			}
		},
		components: {
			uniCountdown,
			uniNoticeBar,
			uniGrid,
			uniGridItem,
			uniBadge,
			uniIcons,
			uniFab,
			productList,
			// #ifdef MP-WEIXIN
			wxLive
			// #endif
		},
		data() {
			return {
				searchBarTop: 0,
				searchBarHeight: 0,
				liveWechatFinderUserNameArray: [], //视频号id
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				signSetting: {}, //是否开启签到领积分
				cates: [], //页面顶部分类显示
				secKills: [],
				secKillCountDown: {},
				groupBuys: [],
				productGroups: [],
				ads: [],
				notice: [],
				announcement: [],
				articleList: [], //图文, 音视频列表
				secKillFlag: 'END', //秒杀结束标志符(END表示已结束)
				tabBars:[],	//推荐、热卖、新品产品可滑动tabbar
				tabCurrentIndex: 0, //当前选项卡索引
				swiperCurrentIndex: 0, //选项卡下当前swiper索引
				pageSize: 10,
				goodsList: [],
				showGift: false, //新人礼物弹窗
				giftList: [],
				giftProductList:[],	//新人专享商品
				giftCouponList:[],	//新人可领取优惠券
				giftPoint:{},		//新人可领取积分
				giftImageUrl:'https://ccm-b2c.oss-cn-beijing.aliyuncs.com/bg_welfare.png',
				receiveLoading: false,
				showFeedback: false, //意见反馈弹窗
				showSales: false, //商务联系弹窗
				pattern: {
					color: '#909399',
					backgroundColor: '#fff',
					selectedColor: '#909399',
					icon: 'headphones',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/image/question.png',
						selectedIconPath: '/static/image/question.png',
						text: '帮助中心',
						active: false
					},
					{
						iconPath: '/static/image/phone.png',
						selectedIconPath: '/static/image/phone.png',
						text: '商务咨询',
						active: false
					},
					// #ifdef MP-WEIXIN
					{
						iconPath: '/static/image/feedback.png',
						selectedIconPath: '/static/image/feedback.png',
						text: '意见反馈',
						active: false
					}
					// #endif
				]
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig', 'uiConfig']),
			activeLayout: function() {
				return this.uiConfig.activeLayout;
			}
		},
		onLoad() {
			this.loadData();
			// #ifdef MP-WEIXIN
			this.getTopIconDistance();
			// #endif

		},
		onShow() {
			//登录后如果没有领取优惠券和积分, 每次首页都会弹窗提示领取
			if(this.hasLogin && !this.userInfo.profitWelfareReceived){
				if(this.giftPoint.welfareType == 'POINT' || this.giftCouponList.length>0){
					this.receiveGiftMessage = '';
					this.showGift = true;//有待领取新人福利, 打开领取弹窗
				}
				
			}
		},
		mounted() {
			let liveWechatFinderUserName = this.applicationConfig.liveWechatFinderUserName;
			console.log('视频号ID：' + liveWechatFinderUserName);
			if (liveWechatFinderUserName) {
				this.liveWechatFinderUserNameArray = liveWechatFinderUserName.split(',');
			}
		},
		methods: {
			getTopIconDistance() {
				uni.getSystemInfo({
					success: (res) => {
						// 获取手机顶部状态栏的高度
						const statusBarHeight = res.statusBarHeight || 0;
						// 获取导航栏的高度（手机状态栏高度 + 胶囊高度 + 胶囊的上下间距）
						const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
						const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) *2;
						this.searchBarTop = menuButtonInfo.top;
						this.searchBarHeight = menuButtonInfo.height;
					},
					fail: (err) => {
						console.error('获取系统信息失败:', err);
					},
				});
			},
			//初始化首页tabbar
			loadTabBars(){
				this.tabBars = [];
				this.tabBars.push({
					'tabName':'推荐',
					'productList':[],
					'pageNo':1,
					'loaded':false,
					'loadingType':'more'
				});
				this.tabBars.push({
					'tabName':'热卖',
					'productList':[],
					'pageNo':1,
					'loaded':false,
					'loadingType':'more'
				});
				this.tabBars.push({
					'tabName':'新品',
					'productList':[],
					'pageNo':1,
					'loaded':false,
					'loadingType':'more'
				});
				this.searchProductByTabBar(this.tabBars[this.tabCurrentIndex]);	
				this.tabBars[this.tabCurrentIndex].loaded = true;
			},
			changeTab(index){
				this.swiperCurrentIndex = index; 
				if(!this.tabBars[this.tabCurrentIndex].loaded){
					this.searchProductByTabBar(this.tabBars[this.tabCurrentIndex]);
					this.tabBars[this.tabCurrentIndex].loaded = true;
				}
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrentIndex = current;
				this.tabCurrentIndex = current;
				if(!this.tabBars[this.tabCurrentIndex].loaded){
					this.searchProductByTabBar(this.tabBars[this.tabCurrentIndex]);
					this.tabBars[this.tabCurrentIndex].loaded = true;
				}
			},
			loadMoreProduct(){
				let tabItem = this.tabBars[this.tabCurrentIndex];
				if(tabItem.loadingType == 'more'){
					tabItem.pageNo = tabItem.pageNo + 1;
					this.searchProductByTabBar(tabItem);
				}
			},
			searchProductByTabBar(tabItem) {
				//加载中
				tabItem.loadingType = 'loading';
				var keyArray = [];
				keyArray.push('ON_SALE');
				if(this.tabCurrentIndex==0) keyArray.push('RECOMMEND');
				else if(this.tabCurrentIndex==1) keyArray.push('HOT');
				else if(this.tabCurrentIndex==2) keyArray.push('NEW');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'hot': true,
					'new': true,
					'recommend': true,
					'startIndex': (tabItem.pageNo - 1) * this.pageSize,
					'pageSize': this.pageSize,
				};
				this.$api.request.goodsList(searchData, res => {
					if (res.body.status.statusCode === '0') {
						let productList = res.body.data.products;
						let total = res.body.data.total;
						tabItem.productList = tabItem.productList.concat(productList);
						tabItem.loadingType = tabItem.productList.length >= total ? 'noMore': 'more';
						console.log(tabItem);
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			navToCate(tid) {
				uni.navigateTo({
					url: '/pages/product/list?cateId=' + tid
				})
			},
			async loadData() {
				this.loadTabBars();
				this.homeData();
				this.getSignSetting();
				this.inquiryProfitWelfare();
			},
			//查询新人福利
			inquiryProfitWelfare() {
				let that = this;
				this.$api.request.inquiryProfitWelfare({}, res => {
					if (res.body.status.statusCode === '0') {
						this.giftList = res.body.data.welfares;
						var giftProductList = [];
						var giftCouponList = [];
						this.giftList.forEach(function(gift,index){
							if(gift.welfareType == 'PRODUCT'){
								giftProductList.push(gift);
							}else if(gift.welfareType == 'COUPON'){
								giftCouponList.push(gift);
							}else if(gift.welfareType == 'POINT'){
								that.giftPoint = gift;
							}
						})
						this.giftProductList = giftProductList;
						this.giftCouponList = giftCouponList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//领取新人福利
			receiveProfitWelfare() {
				this.receiveLoading = true;
				this.$api.request.receiveProfitWelfare({
					userUuid: this.userInfo.userUuid
				}, res => {
					this.receiveLoading = false;
					if (res.body.status.statusCode === '0') {
						this.$api.msg('领取成功');
						this.showGift = false;
						//标记新人福利已领取
						this.userInfo.profitWelfareReceived = true;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//首页数据
			homeData() {
				let that = this;
				this.$api.request.home({}, res => {
					if (res.body.status.statusCode === '0') {
						this.carouselList = res.body.data.swipers;
						this.swiperLength = this.carouselList.length;
						this.ads = res.body.data.ads;
						this.announcement = res.body.data.articles;
						this.cates = res.body.data.cates;
						this.groupBuys = res.body.data.groupBuys;
						this.productGroups = res.body.data.groups;
						this.secKills = res.body.data.secKills;
						this.setSecKillStatus(this.secKills);
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			setSecKillStatus(secKills){
				let that = this;
				//用最近的秒杀商品作为秒杀倒计时数据
				if (secKills.length > 0) {
					for (var i = 0; i < secKills.length; i++) {
						var endTimeStr = secKills[i].endTime;
						var endTime = new Date(Date.parse(endTimeStr.replace(/-/g, "/")));
						var startTimeStr = secKills[i].startTime;
						var startTime = new Date(Date.parse(startTimeStr.replace(/-/g, "/")));
						if (endTime >= new Date()) { //未开始或者秒杀中
							var diff = that.$api.util.getCountDownTimes(secKills[i].startTime);
							that.secKillCountDown = {
								days: diff[0],
								hours: diff[1],
								minutes: diff[2],
								seconds: diff[3]
							}
							that.secKillFlag = startTime <= new Date() ? 'START' : '';
							break;
						}
					}
				}
			},
			//获取签到设置
			getSignSetting() {
				let searchOptions = {

				};
				this.$api.request.signSetting(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						this.signSetting = res.body.data;
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			//详情页
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id=' + id
				})
			},
			navToNewCustomerProductPage(){
				uni.navigateTo({
					url: '/pages/product/newcustomer'
				})
			},
			//轮播图链接
			navSwiper(item) {
				this.$api.util.navSwiper(item);
			},
			//广告链接
			navAD(item) {
				this.$api.util.navAD(item);
			},
			//商品列表页
			navToGroupPage(group) {
				let groupId = group.groupUuid;
				uni.navigateTo({
					url: '/pages/product/group?groupId=' + groupId
				})
			},
			//领券中心
			navCoupon() {
				uni.navigateTo({
					url: '/pages/coupon/list'
				})
			},
			//积分兑换
			navPoint() {
				uni.navigateTo({
					url: '/pages/point/product-list'
				})
			},
			//积分签到
			navSign() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '/pages/public/login'
					})
				} else {
					uni.navigateTo({
						url: '/pages/point/sign'
					})
				}
			},
			//客服中心
			navCustomerService() {
				uni.navigateTo({
					url: '/pages/help/help'
				})
			},
			//直播间
			navLiveRooms() {
				uni.navigateTo({
					url: '/pages/live/room-list'
				})
			},
			//限时秒杀
			navSecKill() {
				uni.navigateTo({
					url: '/pages/product/seckillList'
				})
			},
			//精品团购
			navGroupBuy() {
				uni.navigateTo({
					url: '/pages/product/groupbuyList'
				})
			},
			//团购详情页
			navGroupBuyDetail(index) {
				let id = this.groupBuys[index].groupBuyProductUuid;
				uni.navigateTo({
					url: `/pages/product/groupbuy?id=${id}`
				})
			},
			//商品列表页
			navToList(tid) {
				uni.navigateTo({
					url: '/pages/product/list?cateId=' + tid
				})
			},
			//导航至官方资讯页面
			navAnnouncement: function() {
				var announcement = JSON.stringify(this.announcement);
				announcement = encodeURIComponent(announcement);
				uni.navigateTo({
					url: '/pages/notice/notice?data=' + announcement
				});
			},
			//跳转到发现页
			navFind: function() {
				uni.switchTab({
					url: '/pages/content/index'
				})
			},
			// #ifdef MP
			//小程序环境下点击搜索框
			navSearch() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			},
			// #endif
			trigger(e) {
				if (e.index === 0) {
					this.navCustomerService();
				} else if (e.index === 1) {
					//后台基础设置配置了联系电话或者联系微信
					if (this.applicationConfig.applicationSalesPhone || this.applicationConfig.applicationSalesQrcode)
						this.showSales = true;
				} else if (e.index === 2) {
					this.showFeedback = 1;
				}
			},
			call(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: phoneNumber
				});
			},
			fabClick() {
				//点击悬浮按钮事件
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/index/search'
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				// this.$api.msg('点击了扫描');
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: '/pages/content/webView?src=' + res.result
						})
					}
				})
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/list'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		z-index: 9;
		width: 80%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.carousel-section {
			padding: 0;

			.titleNview-placing {
				height: var(--status-bar-height);
				padding-top: 80px;
				box-sizing: content-box;
			}

			.carousel {
				width: 90%;
				margin: 0 5%;

				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	page {
		background: $page-color-base;
	}

	.container {
		width:100%;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			background: linear-gradient(to bottom, $light-color, #ffffff00);
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		width: 100%;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 $page-row-spacing;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.carousel-l{
		height: 200px;
	}
	.carousel-p{
		height: 600px;
	}

	/* 通知区域 */
	.announcement-section {
		margin-top: 5upx;
	}

	/* 视频号直播间区域 */
	.live-section {
		margin-top: 5upx;
	}

	/* 分类区域 */
	.cate-section {
		overflow: hidden;
		margin: $page-row-spacing;
		padding: 30upx 0;
		background: #fff;
		white-space: nowrap;

		.cate-item {
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			display: inline-block;
			width: 19%;
			text-align: center;
			vertical-align: top;

			.cate-item-child-b {
				margin-top: 30upx;
			}
		}

		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx $light-color;
		}
	}

	.ad-section {
		margin: $page-row-spacing;

		.ad-carousel {
			width: 100%;

			.carousel-item {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}

			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
		.ad-carousel-s {
			height: 100px;
		}
		.ad-carousel-m {
			height: 200px;
		}
		.ad-carousel-l {
			height: 600px;
		}
	}

	.function-section {
		margin: $page-row-spacing;
		height: 250upx;
		display: flex;
		flex-direction: row;
		background: #ffffff;

		image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.left-wrapper {
			background-image: url('https://ccm-b2c.oss-cn-beijing.aliyuncs.com/bg_coupon.jpg');
			background-size: cover;
			background-position: center;
			flex: 1;
			text-align: center;
			margin: 0 4upx;
		}

		.right-wrapper {
			flex: 1;
			text-align: center;
			display: flex;
			flex-direction: column;
			margin: 0 4upx;

			.sign-on {
				flex: 1;
				width: 100%;
				margin: 4upx;
				background-image: url('https://ccm-b2c.oss-cn-beijing.aliyuncs.com/bg_sign.jpg');
				background-size: cover;
				background-position: center;
				margin: 2upx;
			}

			.sign-point {
				flex: 1;
				width: 100%;
				margin: 4upx;
				background-image: url('https://ccm-b2c.oss-cn-beijing.aliyuncs.com/bg_point.jpg');
				background-size: cover;
				background-position: center;
				margin: 2upx;
			}

			.live-room {
				flex: 1;
				width: 100%;
				margin: 4upx;
				background-image: url('https://ccm-b2c.oss-cn-beijing.aliyuncs.com/bg_live.jpg');
				background-size: cover;
				background-position: center;
				margin: 2upx;
			}
		}
	}

	

	.s-g-section {
		display: flex;
		flex-wrap: wrap;
		margin: $page-row-spacing;
		.s-wrapper {
			background: #ffffff;
			/* 秒杀专区 */
			.s-header {
				display: flex;
				align-items: center;
				height: 92upx;
				line-height: 1;
				padding: 0 15upx;
			
				.s-img {
					width: 140upx;
					height: 30upx;
				}
			
				.tip {
					font-size: $font-base;
					color: $font-color-light;
					margin: 0 20upx 0 40upx;
				}
			
				.countdown {
					margin: 0 20upx 0 40upx;
				}
			
				.timer {
					display: inline-block;
					width: 40upx;
					height: 36upx;
					text-align: center;
					line-height: 36upx;
					margin-right: 14upx;
					font-size: $font-sm+2upx;
					color: #ffffff;
					border-radius: 2px;
					background: rgba(0, 0, 0, .8);
				}
			
				.end {
					font-size: 12px;
					margin-left: 20px;
					background-color: #333;
					color: #ffffff;
					padding: 5px;
					border-radius: 5px;
				}
			
				.icon-you {
					font-size: $font-lg;
					color: $font-color-light;
					flex: 1;
					text-align: right;
					margin-left: auto;
				}
			}
			.seckill-section {
				background: #fff;
			
				.s-swiper {
					height: 280upx;
				}
			
				.s-swiper-item {
					width: 100%;
					display: flex;
				}
			
				.s-item {
					display: flex;
					flex-direction: column;
					overflow: hidden;
					margin-right: 24upx;
					width: 160upx;
			
					image {
						width: 160upx;
						height: 160upx;
						border-radius: 4px;
					}
			
					.t-box {
						padding-top: 20upx;
						font-size: $font-base;
						color: $font-color-dark;
			
						.price {
							color: $price-color;
							font-weight: bold;
						}
			
						.m-price {
							font-size: $font-sm+2upx;
							text-decoration: line-through;
							color: $font-color-light;
							margin-left: 8upx;
						}
					}
				}
			}
		}

		.s-wrapper-1 {
			width: 50%;
		}

		.s-wrapper-2 {
			width: 100%;
		}

		.g-wrapper {
			background: #ffffff;
			/* 团购楼层 */
			.group-section {
				background: #fff;
			
				.g-swiper {
					height: 320upx;
					padding-bottom: 30upx;
				}
			
				.g-swiper-item {
					width: 100%;
					display: flex;
				}
			
				.g-item {
					display: flex;
					flex-direction: column;
					overflow: hidden;
					margin-right: 24upx;
					width: 160upx;
			
					image {
						width: 160upx;
						height: 160upx;
						border-radius: 4px;
					}
			
					.t-box {
						padding-top: 20upx;
						font-size: $font-base;
						color: $font-color-dark;
			
						.price {
							color: $price-color;
							font-weight: bold;
						}
			
						.m-price {
							font-size: $font-sm+2upx;
							text-decoration: line-through;
							color: $font-color-light;
							margin-left: 8upx;
						}
			
						.pro-box {
							display: flex;
							align-items: center;
							margin-top: 10upx;
							font-size: $font-sm;
							color: $font-color-base;
							padding-right: 10upx;
						}
			
						.progress-box {
							flex: 1;
							border-radius: 10px;
							overflow: hidden;
							margin-right: 8upx;
						}
					}
				}
			
			}
		}

		.g-wrapper-1 {
			width: 50%;
		}

		.g-wrapper-2 {
			width: 100%;
		}
	}

	.group-product-section {
		display: flex;
		flex-wrap: wrap;
		margin: $page-row-spacing;
		/* 分类推荐楼层 */
		.hot-floor {
			width: 100%;
			overflow: hidden;
			margin-bottom: 20upx;
		
			.floor-img-box {
				width: 100%;
				height: 320upx;
				position: relative;
		
				&:after {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(rgba(255, 255, 255, .06) 30%, #f8f8f8);
				}
			}
		
			.floor-img {
				width: 100%;
				height: 100%;
			}
		
			.floor-list {
				white-space: nowrap;
				padding: 20upx;
				border-radius: 6upx;
				margin-top: -300upx;
				margin-left: 20upx;
				margin-right: 20upx;
				background: #fff;
				box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
				position: relative;
				z-index: 1;
			}
		
			.scoll-wrapper {
				display: flex;
				align-items: flex-start;
			}
		
			.floor-item {
				width: 180upx;
				margin-right: 24upx;
				font-size: $font-sm+2upx;
				color: $font-color-dark;
				line-height: 1.8;
		
				image {
					width: 180upx;
					height: 180upx;
					border-radius: 6upx;
				}
		
				.price {
					color: $price-color;
					font-weight: bold;
				}
			}
			.more {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				flex-shrink: 0;
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
				background: $page-color-light;
				font-size: $font-base;
				color: $font-color-light;
				text:first-child {
					margin-bottom: 4upx;
				}
			}
		}
		.group-wrapper-1 {
			width: 50%;
		}
		.group-wrapper-2 {
			width: 100%;
		}
	}
	.f-header {
		display: flex;
		align-items: center;
		height: 92upx;
		line-height: 1;
		padding: 0 15upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 60upx;
			height: 60upx;
			margin-right: 20upx;
		}
		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}
		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 1;
		}
		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-top:10upx;
		}
		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	.product-section{
		margin: $page-row-spacing;
		.tab-swiper-wrapper{
			position: sticky;
			top: 44px;
			z-index: 1;
		}
	}
	//新人福利
	.gift-wrapper {
		width:100%;
		height:100%;
		text-align:center
	}
	.gift-close {
		display: flex;
		justify-content: center;
		margin-top:20%;
		color: #ffffff
	}
	.gift-image{
		margin-left: 10%;
		margin-right: 10%;
		margin-top: 240px;
	}

	.feedback {
		margin: 35% 17% 10% 17%;
		padding: 15px;
		background-color: #ffffff;
		border-radius: 10px;

		.feedback-title {
			color: $font-color-dark;
			font-size: $font-lg;
			font-weight: 700;
			text-align: center;
		}

		.feedback-desc {
			color: $font-color-base;
			font-size: $font-base;
			text-align: left;
			margin: 20px 0;
		}

		.feedback-action {
			margin-top: 30px;
			text-align: center;

			button {
				background-color: $base-color;
				color: #ffffff;
				height: 35px;
				line-height: 35px;
				font-size: $font-base;
				font-weight: 700;
			}
		}
	}
	.feedback-close {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		color: #ffffff;
	}
	.sales {
		margin: 30% 17% 10% 17%;
		padding: 15px;
		background-color: #ffffff;
		border-radius: 10px;
		.sales-title {
			color: $font-color-dark;
			font-size: $font-lg;
			font-weight: 700;
			text-align: center;
		}
		.sales-desc {
			color: $font-color-light;
			font-size: $font-sm;
			text-align: center;
			margin: 20px 0;
		}
		.sales-action {
			margin-top: 30px;
			text-align: center;

			button {
				background-color: $base-color;
				color: #ffffff;
				height: 35px;
				line-height: 35px;
				font-size: $font-base;
				font-weight: 700;
			}
		}
	}
	.sales-close {
		display: flex;
		justify-content: center;
		margin-top: 20px;
		color: #ffffff;
	}
	
</style>