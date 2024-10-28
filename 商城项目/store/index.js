import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		footPrint: [],	//商品浏览历史
		cartInfo: [],	//购物车信息
		applicationConfig:{},	//应用全局设置
		uiConfig:{	//UI全局设置, 
			baseColor: '#ffbd71',
			activeLayoutName: 'layoutA',
			layoutList:[	//支持的布局列表
				{
					name: 'layoutA',
					swiperMode: 'l',	//l代表landscape, 轮播图高度为200px;p代表portrait, 轮播图高度为600px
					adMode: 's',	//s代表small, 广告高度为100px;s代表medium, 
					fabDisplayedHome: true,	//首页是否显示右下角的圆形按钮(true或者false)
					cateDisplayedHome: true,	//首页是否显示分类区域(true或者false)
					functionDisplayedHome: true,	//首页是否显示领券中心和积分功能卡片(true或者false)
					cateProductDisplayed: true,	//分类页是否显示商品(true或者false)
					sCols: 1,		//首页秒杀专栏所占列数(最多2列)
					sProductCols:2,//首页秒杀专栏一行显示多少个商品(最多4个)
					gCols: 1,		//首页团购专栏所占列数(最多2列)
					gProductCols:2,//首页团购专栏一行显示多少个商品(最多4个)
					fCols: 1,		//首页商品组所占列数(最多2列)
					productCols:2	, //商品列表一行显示多少个商品(1或者2),影响所有除团购和秒杀以为所有的商品列表页
					productFastBuy: true,	//商品列表中的商品是否可以快速加入购物车
				},
				{
					name: 'layoutB',
					swiperMode: 'p',	//l代表landscape, 轮播图高度为200px;p代表portrait, 轮播图高度为600px
					adMode: 'l',	//s代表small, 广告高度为100px;s代表medium, 
					fabDisplayedHome: false,	//首页是否显示右下角的圆形按钮(true或者false)
					cateDisplayedHome: true,	//首页是否显示分类区域(true或者false)
					functionDisplayedHome: false,	//首页是否显示领券中心和积分功能卡片(true或者false)
					cateProductDisplayed: false,	//分类页是否显示商品(true或者false)
					sCols: 2,		//首页秒杀专栏所占列数(最多2列)
					sProductCols:4,//首页秒杀专栏一行显示多少个商品(最多4个)
					gCols: 2,		//首页团购专栏所占列数(最多2列)
					gProductCols:4,//首页团购专栏一行显示多少个商品(最多4个)
					fCols: 2,		//首页商品组所占列数(最多2列)
					productCols:2	, //商品列表一行显示多少个商品(1或者2),影响所有除团购和秒杀以为所有的商品列表页
					productFastBuy: false,	//商品列表中的商品是否可以快速加入购物车
				}
			],	
		},
		
	},
	mutations: {
		addFootPrint(state, provider) {
			var oldFootPrint = state.footPrint;
			var footPrint = [];
			for(var i=0;i<oldFootPrint.length;i++){
				if(oldFootPrint[i].productUuid!=provider.productUuid){
					footPrint.push(oldFootPrint[i]);
				}
			}
			footPrint.push(provider);
			//只保留20个商品浏览历史
			if(footPrint.length>20){
				footPrint = footPrint.slice(-20);
			}
			state.footPrint = footPrint;
			uni.setStorage({//缓存应用全局设置
				key: 'footPrint',  
				data: footPrint  
			}) 
		},
		updateApplicationConfig(state, provider) {
			state.applicationConfig = provider;
			uni.setStorage({//缓存应用全局设置
			    key: 'applicationConfig',  
			    data: provider  
			}) 
		},
		updateActiveLayout(state, provider) {
			var activeLayoutName = provider;
			var uiConfig = state.uiConfig;
			var layoutList = uiConfig.layoutList;
			layoutList.forEach(function(layout,index){
				if(layout.name == activeLayoutName)
					uiConfig.activeLayout = layout
			})
			uni.setStorage({//缓存应用全局设置
			    key: 'uiConfig',  
			    data: uiConfig  
			}) 
		},
		updateCartInfo(state, provider) {
			var cartInfo = provider;
			state.cartInfo = cartInfo;
			uni.setStorage({//缓存购物车数据
				key: 'cartInfo',  
				data: cartInfo  
			}) 
			//更新购物车商品数量图标
			if(cartInfo && cartInfo.length > 0){
				let num = 0;
				cartInfo.forEach(function(cart,index){
					num = num + cart.unit;
				})
				uni.setTabBarBadge({
				index:3,
				text:num.toString()
			})}else{
				uni.removeTabBarBadge({
					index: 3
				})
			}
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
			    key: 'userToken'  
			})
		}
	},
	actions: {
	
	}
})

export default store