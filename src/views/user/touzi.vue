<template>
	<div>
		<div class="header">
			<div class="head">
				<router-link to="/user" class="back"></router-link>
				投资记录
			</div>
		</div>
		<!-- 		<div class="fund_wrap">
			<table class="table">
				<tbody>
					<tr class="header">
						<th class="first">项目名称</th>
						<th>投资金额</th>
						<th>状态</th>
						<th>详情</th>
						<th class="last">合同</th>
					</tr>


				</tbody>
			</table>
		</div> -->
		<div v-for="(item, key) in data" :key="key" class="box">

			<div class="title">
				{{item.apr_plan[0].title}}
			</div>
			<div style="width: 40%;" class="left">
				<div class="desc">
					<span>投资金额: </span> {{item.money}}元
				</div>
				<div class="desc">
					<span>预期收益: </span> {{item.apr_money}}元
				</div>
			</div>
			<div style="width: 60%;" class="right">
				<div class="desc">
					<span>投资时间: </span> {{item.addtime_date}}
				</div>
				<div class="desc">
					<span>到期时间: </span> {{item.end_time_date}}
				</div>
			</div>
			<div class="btn">
				<div class="button" style="float: left;">
					<router-link class="bbtn" :to="'/touzi/apr/' + item['id']">详情</router-link>

				</div>

				<div class="button" style="float: right;">
					<router-link class="bbtn" :to="/contract/ + item['id']">合同</router-link>

				</div>



			</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch'

	export default {
		name: "index",
		components: {},
		data() {
			return {
				data: {},
				data_detail: [],
			};
		},
		created() {
			this.$parent.footer(false);
		},
		mounted() {
			this.start();
		},
		methods: {
			start() {
				Fetch('/user/invest').then(res => {
					this.data = res.data;
					var data_d = [];
					for (let data in this.data.list) {
						let rid = ( this.data.list[data].id)
						Fetch('/index/interest', {
							id: this.data.list[data].id
						}).then(res1 => {
							res1.data['id'] = rid
							data_d.push(res1.data);
						})
					}
					this.data = data_d;
				})
			},
		}
	};
</script>

<style lang="less" scoped>
	span {
		color: #aaa;
	}

	.left {
		float: left;
		/* justify-content: baseline; */
		// position: absolute;
		width: 50%;

	}

	.right {
		float: right;
		/* justify-content: baseline; */
		// position: absolute;
		width: 50%;
	}

	.btn {
		// flex-wrap: wrap;
		// display: flex;
		width: 100%;
		float: left;
		text-align: center;
		margin: 5px 5px 5px 5px;
		height: 25px;
	}

	.bbtn {
		border: 1px solid #0f51a0;
		padding: 5px;
		padding-left: 20%;
		padding-right: 20%;
		border-radius: 50px;
		line-height: 30px;
		height: 30px;
		font-size: 12px;
		// background-color: #5d5d5d;
	}

	.button {

		background-color: rgb(249, 249, 252);
		// background: #fff;
		color: #0f51a0;
		width: 50%;
	}

	.box {
		overflow: hidden;
		box-shadow: 0 0 5px rgba(0, 0, 0, .2);
		background-color: rgb(249, 249, 252);
		margin: 15px auto;
		width: 95%;
		border-radius: 5px;
		height: 170px;
	}

	.desc {
		border-radius: 0px 0px 5px 5px;
		color: #aaa;
		text-align: center;
		// padding: 5px;
		// width: 100%;
		font-size: 13px;
		margin: 10px;
	}

	.title {
		background-color: #0f51a0;
		color: #fff;
		width: 100%;
		text-align: center;
		margin: 0 auto;
		padding: 15px;
		font-size: 14px;
		border-radius: 5px 5px 0px 0px;
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
		width: 25%;
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

	.fund_wrap .table tbody tr td .button {
		background: #e8c27d;
		font-size: 12px;
		padding: 2px 10px;
		border-radius: 5px;
		color: white;
	}

	.fund_wrap .table tbody tr .td_3 {
		color: #dfba7b;
	}
</style>
