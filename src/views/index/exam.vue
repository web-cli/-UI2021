<template>

	<div>
		<div class="header">
		    <div class="head">
		        <a @click="$router.back()" class="back"></a>
		        有奖问答
		    </div>
		</div>
		<a-divider />
		<div v-for="(item,index) in list" class="input-radio">
			<p class="tit1" style="color: #000 !important;">{{index + 1}}.{{item.optionName}}</p>
			<a-radio-group @change="onChange">
				<div v-for="(item1 , index) in item.listRiskAssessment">
					<div class="rdiv" @click="clickRadio(index+1)" :id="item.optionName.toString()">
						<label>{{item1.optionName}}</label>
					</div>

				</div>
			</a-radio-group>
			<a-divider />
		</div>
		<!-- <a-button @click="submit" type="primary" style="line-height: 50px;margin:10px auto;display: block;text-align: center;height: 50px;background-color: #64D17C;">提交</a-button> -->
	</div>
</template>
<script>
	var myMap = new Map();
	import Fetch from '../../utils/fetch'
	import {
		Dialog
	} from 'vant';
	export default {
		name: '',
		data() {
			return {
				value: 0,
				radioStyle: {
					display: 'block',
					height: '30px',
					lineHeight: '30px',
				},
				list: [], //题库
				riskId: [], //选项id
				optionScoreStr: [], //选项分值
				right_key: 1,
			}
		},
		props: ['pid'],
		mounted() {
			this.question()
		},
		methods: {
			clickRadio(e) {
				if (e === this.$data.right_key) {

					Fetch('/index/setAnswerMoney', {
						type: "success",
					}).then((res) => {
						// 加钱
						Dialog.alert({
							title: '恭喜答对问题',
							message: '系统将派送奖励到您的账户,请到个人中心查收'
						}).then(() => {
							this.$router.push('/mission').catch(err => {err});
						})
					})
				} else {
					Fetch('/index/setAnswerMoney', {
						type: "error",
					}).then((res) => {
						Dialog.alert({
							title: '很遗憾,你答错了',
							message: '明天可以继续赢取丰富奖励！记得每天答题哦！'
						}).then(() => {
							this.$router.push('/mission').catch(err => {err});
						})
					})
				}
			},
			onChange(e) {
				myMap.set(e.target.id, e.target.value);
			},
			question() {
				// 获取问题
				Fetch('/index/getAnswer').then((res) => {
					console.log(res)
					this.$data.right_key = res.data.right_key;
					this.$data.list = [{
						listRiskAssessment: [{
							optionName: res.data.right_1
						}, {
							optionName: res.data.right_2
						}, {
							optionName: res.data.right_3
						}, {
							optionName: res.data.right_4
						}],
						optionName: res.data.contents,
					}]
				})
			},
			submit() {

			}
		},
	}
</script>
<style scoped>
	h3 {
		margin-bottom: 10px;
		height: 50px;
		background-color: #544B5E;
		text-align: center;
		font-weight: bold;
		line-height: 50px;
	}

	.sub {
		display: block;
		margin: 20px auto;
	}

	.tit1 {
		font-weight: bold;
		line-height: 1.5;

	}

	.rdiv {
		background-color: #E8C27D;
		border: 2px solid;
		border-radius: 25px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		margin: 25px auto;
		width: 90%;
	}
</style>
