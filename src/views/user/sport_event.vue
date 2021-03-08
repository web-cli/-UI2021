<template>
	<div>
	    <div class="header">
	        <div class="head">
	            <a @click="$router.back()" class="back"></a>
	            运动加油站
	        </div>
	    </div>
	    <div class="main">
			<img style="width: 100%;" src="../index/image/huanbao/ydbg.png" alt="">
			<div class = "ddates">倒计时：<span style="color: red;font-weight: 700; font-size: 4vw;">{{minutes}}:{{seconds}}</span></div>
	        <div v-for="(item, key) in data" :key="key" class = "lists">
	            <img :src="item.image" class="iocs" >
	            <p class="infos">{{item.title}}</p>
				<p class="dates">完成时间{{item.date}}分钟</p>
	            <div class="buts actions" v-if="item.status=='0'" @click="takeExercises(item.id)" > {{item.status_text}}</div>
				<div class="buts receive" v-else-if="item.status=='1'" @click="receiveRewardsExercises(item.id)" > {{item.status_text}}</div>
				<div class="buts noaction" v-else-if="item.status=='2'" > {{item.status_text}}</div>
				<div class="buts nowaction" v-else-if="item.status=='3'" > {{item.status_text}}</div>
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
				minutes: 0, //分
				seconds: 0, //秒
				status: false,
				action: false,
	        };
	    },
	    created() {
	        this.$parent.footer(false);
	    },
	    methods: {
	        start() {
	            Fetch('/index/getSportEventList').then((res) => {
	                this.data = res.data.list;
					this.minutes = res.data.m;
					this.seconds = res.data.s;
					if(this.seconds > 0 || this.minutes > 0){
						this.seconds = this.seconds+1;
						this.status = true;
						if(this.action == false){
							this.timer(true);
						}
					}else{
						this.action = false;
					}
	            })
	        },
			takeExercises(id){
				Fetch('/index/takeExercises',{sid:id}).then((res) => {
					this.$notify({
					    background: '#07c160',
					    message: res.info
					});
					this.start();
				})
			},
			receiveRewardsExercises(id){
				Fetch('/index/receiveRewardsExercises',{sid:id}).then((res) => {
					this.$notify({
					    background: '#07c160',
					    message: res.info
					});
					this.start();
				})
			},
			// 倒计时
			    num(n) {
			      if (this.minutes === 0 && this.seconds === 0 && this.status == true) {
						this.start();
						this.status = false;
			      }
			      return n < 10 ? '0' + n : '' + n;
			    },
			    // 倒计时
			    timer(is_action = false) {
				  if(is_action){
					  this.action = true;
				  }
			      var _this = this;
			      var time = window.setInterval(function() {
			        if (_this.seconds === 0 && _this.minutes !== 0) {
			          _this.seconds = 59;
			          _this.minutes -= 1;
			        } else if (_this.minutes === 0 && _this.seconds === 0) {
			          _this.seconds = 0;
			          window.clearInterval(time);
			        } else {
			          _this.seconds -= 1;
			        }
			      }, 1000);
			    },
	    },
		mounted() {
		    // 倒计时
			this.start();
		  },
		  watch: {
		    // 倒计时
		    second: {
		      handler(newVal) {
		        this.num(newVal);
		      },
		    },
		    // 倒计时
		    minute: {
		      handler(newVal) {
		        this.num(newVal);
		      },
		    },
		  },
		  computed: {
		    // 倒计时
		    second: function() {
		      return this.num(this.seconds);
		    },
		    minute: function() {
		      return this.num(this.minutes);
		    },
		  },
		
	};
</script>

<style>
	.ddates{
		width: 100%;
		text-align: center;
		margin: 2vw 0;
	}
	.main{
		width: 100%;
		margin: 0;
		padding: 0;
		height: 100%;
	}
	.lists{
		width: 94%;
		margin: 2vw 3vw 0 3vw;
		font-size: 3.5vw;
		/* box-shadow: 0px -1px 5px rgba(89,125,172,.4); */
	}
	.iocs{
		position: relative;
		width: 20vw;
		height: 20vw;
		top:3vw;
		left: 2vw;
	}
	.infos{
		position: relative;
		padding-left: 30vw;
		top: -15vw;
	}
	.dates{
		position: relative;
		padding-left: 30vw;
		top: -9vw;
	}
	.buts{
		text-align: center;
		position: relative;
		right: 3vw; 
		top: -17.5vw;
		margin: 0;
		padding: 2vw 6vw;
		color: #FFFFFF;
		border-radius: 4vw;
		float: right;
		
	}
	.actions{
		background-color: #8464C4;
	}
	.noaction{
		background-color: #d3d3d3;
	}
	.receive{
		background-color: #d3d3d3;
	}
	.nowaction{
		background-color: #808A87;
	}
</style>
