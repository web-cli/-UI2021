import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	//   mode: "history",
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				x: 0,
				y: 0
			};
		}
	},
	routes: [{
			path: "/index",
			name: "index",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/index.vue")
		},
		{
			path: "/",
			redirect: {
				name: "tree"
			}
		},
		{
			path: "/item",
			name: "item",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/item/index.vue")
		},
		
		{
			path: "/sport_event",
			name: "sport_event",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/sport_event.vue")
		},
		{
			path: "/scratch_card",
			name: "scratch_card",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/scratch_card.vue")
		},

		{
			path: "/login",
			name: "login",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/login.vue")
		},

		{
			path: "/register",
			name: "register",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/register.vue")
		},
		{
			path: "/forgetpwd",
			name: "forgetpwd",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/forgetpwd.vue")
		},
		{
			path: "/active",
			name: "active",
			meta: { title: '税务申报' },
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/active.vue")
		},
		{
			path: "/user",
			name: "user",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/index2.vue")
		},
		{
			path: "/notice",
			name: "notice",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/notice.vue")
		},
		{
			path: "/notice/:id",
			name: "notice_content",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/notice_content.vue")
		},
		{
			path: "/info",
			name: "info",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/index1.vue")
		},
		{
			path: "/recharge",
			name: "recharge",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/recharge.vue")
		},
		{
			path: '/art/:code',
			auth: true,
			component: () => import('./views/art/article.vue'),
		},
		{
			path: '/xc',
			auth: true,
			component: () => import('./views/art/xc.vue'),
		},
		{
			path: "/recharge/bank",
			name: "rebank",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/rebank.vue")
		},
		{
			path: "/cash",
			name: "cash",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/cash.vue")
		},
		{
			path: "/funds",
			name: "funds",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/funds.vue")
		},
		{
			path: "/start",
			name: "start",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/anwser/start.vue")
		},
		{
			path: "/anwser",
			name: "anwser",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/anwser/index.vue")
		},
		{
			path: "/stop",
			name: "stop",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/anwser/stop.vue")
		},
		{
			path: "/huzhuan",
			name: "huzhuan",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/huzhuan.vue")
		},
		{
			path: "/zhuanzhang",
			name: "zhuanzhang",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/zhuanzhang.vue")
		},
		{
			path: "/touzi",
			name: "touzi",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/touzi.vue")
		},
		{
			path: "/apr",
			name: "apr",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/apr.vue")
		},
		{
			path: "/invest",
			name: "invest",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/invest.vue")
		},
		{
			path: "/cost",
			name: "cost",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/cost.vue")
		},
		{
			path: "/account",
			name: "account",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/account.vue")
		},
		{
			path: "/setpwd",
			name: "setpwd",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/setpwd.vue")
		},
		{
			path: "/setpaypwd",
			name: "setpaypwd",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/setpaypwd.vue")
		},
		{
			path: "/resetpaypwd",
			name: "resetpaypwd",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/resetpaypwd.vue")
		},
		{
			path: "/firstsetpaypwd",
			name: "firstsetpaypwd",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/firstsetpaypwd.vue")
		},
		{
			path: "/bank",
			name: "bank",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/bank.vue")
		},
		{
			path: "/auth",
			name: "auth",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/auth.vue")
		},
		{
			path: "/alipay",
			name: "alipay",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/alipay.vue")
		},
		{
			path: "/share",
			name: "share",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/share.vue")
		},
		{
			path: "/about",
			name: "about",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/about.vue")
		},
		{
			path: "/item/:id",
			name: "details",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/item/details.vue")
		},
		{
			path: "/item/apply/:id",
			name: "apply",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/item/apply.vue")
		},
		{
			path: "/jsq",
			name: "jsq",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/jsq.vue")
		},
		{
			path: "/exam",
			name: "exam",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/exam.vue")
		},
		
		{
			path: "/goods",
			name: "goods",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/goods.vue")
		},
		{
			path: "/goods_details",
			name: "goods_details",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/goods_details.vue")
		},
		{
			path: "/goods_detail2",
			name: "goods_detail2",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/goods_detail2.vue")
		},
		{
			path: "/integral",
			name: "integral",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/integral.vue")
		},
		{
			path: "/prize",
			name: "prize",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/prize.vue")
		},
		{
			path: "/touzi/apr/:id",
			name: "itemapr",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/itemapr.vue")
		},
		{
			path: "/about/jianjie",
			name: "jianjie",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/jianjie.vue")
		},
		{
			path: "/contract/:id",
			name: "contract",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/contract/index.vue")
		},
		{
			path: "/kefu",
			name: "kefu",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/kefu.vue")
		},
		{
			path: "/pay",
			name: "pay",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/pay.vue")
		},
		{
			path: "/cal_result",
			name: "cal_result",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/cal_result.vue")
		},
		{
			path: "/app",
			name: "app",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/art/app.vue")
		},
		{
			path: "/app_reg",
			name: "app_reg",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/art/reg.vue")
		},
		{
			path: "/anwser",
			name: "anwser",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/anwser/index.vue")
		},
		{
			path: "/anwser/start",
			name: "anwser_start",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/anwser/start.vue")
		},
		{
			path: "/anwser/stop",
			name: "anwser_stop",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/anwser/stop.vue")
		},
		{
			path: "/address",
			name: "address",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/address.vue")
		},
		{
			path: "/editaddress/:id",
			name: "updateeditaddress",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/editaddress.vue")
		},
		{
			path: "/editaddress",
			name: "addeditaddress",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/editaddress.vue")
		},
		{
			path: "/shop",
			name: "shop",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/shop.vue")
		},
		{
			path: "/record",
			name: "record",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/record.vue")
		},
		{
			path: "/tree",
			name: "tree",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/tree.vue")
		},
		{
			path: "/mission",
			name: "mission",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/mission.vue")
		},
		{
			path: "/baoku",
			name: "baoku",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/baoku.vue")
		},		
		{
			path: "/baokugz",
			name: "baokugz",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/index/baokugz.vue")
		},
		{
			path: "/order",
			name: "order",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/user/order.vue")
		},
		{
			path: "/jz",
			name: "jz",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/jz/index.vue")
		},
		{
			path: "/jz/:id",
			name: "jzinfo",
			component: () =>
				import( /* webpackChunkName: "home" */ "./views/jz/info.vue")
		},
	]
});
