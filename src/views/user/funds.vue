<template>
	<div class="nav-bar-container bg-w">
    <van-nav-bar
      title="资金明细"
      left-arrow
      fixed
      @click-left="$router.push({path:'/user'})"
    />

		<div class="nav-tabs-container">
			<van-tabs type="card" class="nav-tabs" v-model="active">
				<van-tab title="全部"></van-tab>
				<van-tab title="收入"></van-tab>
				<van-tab title="支出"></van-tab>
			</van-tabs>
		</div>

		<div class="container"  v-for="(item, key) in list" :key="key">
			<div class="box">
				<div class="content">
					<div class="desc">
						<span>{{item.reason}}</span>
					</div>
					<div class="time">{{item.time}}</div>
				</div>
				<div class="money">
					<span v-if="item.type === 2" style="color: #df5d5b">
						- {{item.money}}
					</span>
					<span v-else  style="color: #5eb561">
						+ {{item.money}}
					</span>
					
					<!-- <span :style="item.type == 2 ? 'color:##df5d5b;' : 'color: #5eb561'">{{item.type == 1?'+':'-'}}{{item.money}}</span> -->

				</div>
			</div>
			<!-- <van-divider></van-divider> -->
		</div>
		<!-- 		<div class="fund_wrap">
			<table class="table">
				<tbody>
					<tr class="header">
						<th class="first">摘要</th>
						<th>金额</th>
						<th class="last">时间</th>
					</tr>
					<tr v-for="(item, key) in data.list" :key="key">
						<td>{{item.reason}}</td>
						<td :style="item.type == 2 ? 'color:red' : 'color:#a8853a'">{{item.type == 1?'+':'-'}}{{item.money}}</td>
						<td>{{item.addtime|dateFormat}}</td>
					</tr>
				</tbody>
			</table>
		</div> -->
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'
	import moment from "moment";

	export default {
		name: "index",
		components: {},
		computed: {
			list() {

				if (this.active === 0) return this.data.list
				if (this.active === 2) return this.data.list.filter(item => item.type === 2)
				return this.data.list.filter(item => item.type === 1)
			}
		},
		data() {
			return {
				data: {},
				active: 0
			};
		},
		created() {
			this.$parent.footer(false);
		},
		filters: {
			dateFormat(time) {
				return moment(time).format('YYYY.MM.DD hh:mm');
			}
		},
		mounted() {
			this.start();
		},
		methods: {
			start() {
				Fetch('/user/funds').then(res => {
					this.data = res.data;
					console.log(this.data)
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	.desc {
		word-wrap: break-word;
		line-height: 40px;
	}

	.time {
		// width: 72%;
		padding-top: 16px;
		font-size: 24px;
		color: #aaa;
	}

	.money {
		padding-right: 10px;
		font-size: 12px;
	}

	.content {
    // width: 70%;
    // font-size: 12px;
    // line-height: 17px;
		background-color: #fff;
    color: #252525;
    font-family: Helvetica Neue, Helvetica, sans-serif;
    flex: 1;
	}

	.box {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 16px 0;
		margin: 0 32px;
		align-items: center;
	  border-bottom: .5px solid #ebedf0;
		// border-bottom: 0.2px solid #927777b8!important;
		// align-items: center;
		// justify-content: space-between;
		// position: relative;
		// display: flex;
		// min-height: 50px;
		// background-color: #fff;
		// font-size: 13px;
		// padding: 10px;
	}


	.fund_wrap .table tr {
		width: 100%;
	}

	.fund_wrap .table .header {
		width: 100%;
		height: 34px;
		background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
		background-image: -o-linear-gradient(left, #666666, #262627);
		background-image: linear-gradient(to right, #666666, #262627);
		border: 0;
	}

	.fund_wrap .table tr .first {
		border-radius: 10px 0 0 10px;
	}

	.fund_wrap .table tr .last {
		border-radius: 0 10px 10px 0;
		border: 0;
	}

	.fund_wrap .table tr th {
		font-size: 14px;
		color: #e8c27d;
		width: 33.333%;
		border-right: 1px solid #666666;
	}

	.fund_wrap .table .tab.tab_2 {
		border-left: 1px solid #7B7B7B;
		border-right: 1px solid #7B7B7B;
	}

	.fund_wrap .table {
		table-layout: fixed;
		width: 92%;
		margin: 15px auto;
	}

	.fund_wrap .table tbody tr {
		margin: 0 auto;
		border-bottom: 1px solid #EDEDED;
	}

	/*.fund_wrap .table tbody tr td:first-child {*/
	/*    text-align: left;*/
	/*}*/

	/*.fund_wrap .table tbody tr td:last-child {*/
	/*    text-align: left;*/
	/*}*/


	.fund_wrap .table tbody tr td {
		padding: 0 5px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 33.333%;
		text-align: center;
		font-size: 14px;
		line-height: 26px;
		padding-bottom: 10px;
		padding-top: 24px;
		color: #333333;
	}

	.fund_wrap .table tbody tr .td_3 {
		color: #dfba7b;
	}

	.nav-tabs-container {
		margin: 14px 0;
	}
</style>
