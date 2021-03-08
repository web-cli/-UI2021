<template>
    <div class="bg">
        <div class="header">
            <div class="head">
                <router-link to="/jsq" class="back"></router-link>
                收益计算结果
            </div>
        </div>
        <div class="mt1">
            <table class="table">
                <thead>
                <tr>
                    <th class="border_left">收款日期</th>
                    <th>收款金额</th>
                    <th>收回本金</th>
                    <th>收回利息</th>
                    <th class="border_right">剩余本金</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,key) in data.list">
                    <td class="border_left">{{item.date}}</td>
                    <td>{{item.smoney}}</td>
                    <td>{{item.money}}</td>
                    <td>{{item.apr_money}}</td>
                    <td class="border_right">{{item.sy_money}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="mt1 mt2">
            <table class="table">
                <thead>
                <tr>
                    <th class="border_left">总结</th>
                    <th>{{data.sum.smoney}}</th>
                    <th>{{data.sum.money}}</th>
                    <th>{{data.sum.apr_money}}</th>
                    <th class="border_right">0</th>
                </tr>
                </thead>

            </table>
            <div class="ball ball1"></div>
            <div class="ball ball2"></div>
        </div>
        <div class="mt3">
            <div class="mt3_info">实际总收益</div>
            <div class="mt3_money">¥ {{data.sum.apr_money}}元</div>
        </div>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        data() {
            return {
                data: {
                    sum: {},
					list:{}
                },
				money: 0,
				days: 0,
				type: 1,
				apr: 0,
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
				this.money = this.$route.query.money;
				this.days = this.$route.query.days;
				this.type = this.$route.query.type;
				this.apr = this.$route.query.apr;
                /* Fetch('/item/dq/cal', {
                    money: this.$route.query.money,
                    days: this.$route.query.days,
                    type: this.$route.query.type,
                    apr: this.$route.query.apr,
                }).then(res => {
                    this.data = res.data;
                }) */
				this.autoCount();
            },
			GetDateStr(AddDayCount) {
			    var dd = new Date();
			    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
			    var m = dd.getMonth() + 1; //获取当前月份的日期
			    var d = dd.getDate();
			    m = m < 10 ? "0" + m : m;
			    d = d < 10 ? "0" + d : d;
			    return m + "-" + d;
			},
			autoCount(){
				if (this.$route.query.type == "E") {
					this.data.sum = {
						smoney : (parseFloat(this.days * this.apr * this.money / 100) + parseFloat(this.money)).toFixed(2),
						money : this.money,
						apr_money : (this.days * this.apr * this.money / 100).toFixed(2)
					};
					this.data.list[0] = {
						date:this.GetDateStr(parseInt(this.days)),
						smoney : (parseFloat(this.days * this.apr * this.money / 100) + parseFloat(this.money)).toFixed(2),
						money : this.money,
						apr_money : (this.days * this.apr * this.money / 100).toFixed(2),
						sy_money : 0
					};
				}else if(this.$route.query.type == "A"){
					this.data.sum = {
						smoney : (parseFloat(this.days * this.apr * this.money / 100) + parseFloat(this.money)).toFixed(2),
						money : this.money,
						apr_money : (this.days * this.apr * this.money / 100).toFixed(2)
					};
					for (var i = 1; i <= this.days; i++) {
						this.data.list[i] = {
							date: this.GetDateStr(parseInt(i)),
							smoney : i == this.days?(parseFloat(this.apr * this.money / 100) + parseFloat(this.money)):(this.apr * this.money / 100),
							money : i == this.days?this.money:0,
							apr_money : (this.apr * this.money / 100),
							sy_money : i != this.days?this.money:0
						};
					}
				}else if(this.$route.query.type == "B"){
					this.days = parseInt(this.days / 7);
					this.data.sum = {
						smoney : (parseFloat(this.days * this.apr * this.money / 100 * 7) + parseFloat(this.money)).toFixed(2),
						money : this.money,
						apr_money : (this.days * this.apr * this.money / 100 * 7).toFixed(2)
					};
					for (var i = 1; i <= this.days; i++) {
						this.data.list[i] = {
							date: this.GetDateStr(parseInt(i * 7)),
							smoney : i == this.days?(parseFloat(this.apr * this.money / 100 * 7) + parseFloat(this.money)):(this.apr * this.money / 100 * 7),
							money : i == this.days?this.money:0,
							apr_money : (this.apr * this.money / 100 * 7),
							sy_money : i != this.days?this.money:0
						};
					}
					
				}else if(this.$route.query.type == "C"){
					this.days = parseInt(this.days / 30);
					this.data.sum = {
						smoney : (parseFloat(this.days * this.apr * this.money / 100 * 30) + parseFloat(this.money)).toFixed(2),
						money : this.money,
						apr_money : (this.days * this.apr * this.money / 100 * 30).toFixed(2)
					};
					for (var i = 1; i <= this.days; i++) {
						this.data.list[i] = {
							date: this.GetDateStr(parseInt(i * 30)),
							smoney : i == this.days?(parseFloat(this.apr * this.money / 100 * 30) + parseFloat(this.money)):(this.apr * this.money / 100 * 30),
							money : i == this.days?this.money:0,
							apr_money : (this.apr * this.money / 100 * 30),
							sy_money : i != this.days?this.money:0
						};
					}
				}else if(this.$route.query.type == "D"){
					var account2 = this.money;
					for (var i = 1; i <= this.days; i++) {
						if (i != 1) {
						    this.money = (parseFloat(this.money) + parseFloat(this.apr * this.money / 100)).toFixed(2);
						}
						this.data.list[i] = {
							date: this.GetDateStr(parseInt(i)),
							smoney : i == this.days?(parseFloat(this.money) + parseFloat(this.apr * this.money / 100)).toFixed(2):(this.apr * this.money / 100).toFixed(2),
							money : i == this.days?this.money:0,
							apr_money : (this.apr * this.money / 100).toFixed(2),
							sy_money : i != this.days?this.money:0
						}
					};
					this.data.sum = {
						smoney : (parseFloat(this.money) + parseFloat(this.apr * this.money / 100)).toFixed(2),
						money : account2,
						apr_money : (parseFloat(this.money) + parseFloat(this.apr * this.money / 100) - parseFloat(account2)).toFixed(2)
					};
					
				}
			}
        }
    };
</script>

<style lang="less" scoped>
    .bg {

        .mt0 {
            padding: 48px 0 32px 0;
            background: #544b5e;
        }

        .mt0 .title {
            text-align: center;
            color: #e8c27d;
            font-size: 28px;
            padding: 0 0 32px 0;

        }

        .mt0 .cal_btn {
            display: block;
            height: 40px;
            line-height: 40px;
            width: 31.4%;
            border-radius: 40px;
            text-align: center;
            color: #544b5e;
            font-size: 18px;
            margin: 0 auto;
            background: #e8c27d;

        }

        .mt1 {
            width: 91%;
            border-radius: 5px;
            overflow: hidden;
            position: relative;
            padding-bottom: 10px;
            padding-top: 18px;
            background: #fff;
            -webkit-box-shadow: 1px 1px 4px 0px #f2f2f2;
            box-shadow: 1px 1px 4px 0px #f2f2f2;
            margin: 10px auto 10px auto;

        }

        .mt2 {
            margin: 10px auto;
            padding: 18px 0;
        }

        .mt1 .table {
            width: 100%;
        }

        .mt1 .table td,
        .mt1 .table th {
            border: 1px solid #dcdcdc;
            padding: 7px 0;
            text-align: center;
            font-size: 12px;
            color: #6c6c6c;
        }

        .mt1 .table th {
            width: 20%;
            color: #333;
        }

        .mt2 .table th {
            color: #6c6c6c;
        }

        .mt1 .table .border_top {
            border-top: none;
        }

        .mt1 .table .border_left {
            border-left: none;
        }

        .mt1 .table .border_right {
            border-right: none;
        }

        .mt1 .table th {
            color: #333;
        }

        .mt1 .ball {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            background: #ebedee;
            position: absolute;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
        }

        .mt1 .ball1 {
            top: 0;
            margin-top: -10px;
        }

        .mt1 .ball2 {
            bottom: 0;
            margin-bottom: -10px;
        }

        .mt3 {
            width: 91%;
            margin: 0 auto 40px auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .mt3 .mt3_info {
            display: inline-block;
            font-size: 14px;
            color: #fffefe;
            height: 26px;
            line-height: 26px;
            border-radius: 26px;
            padding: 0 8px;
            background: #e8c27d;
            margin-right: 12px;
        }

        .mt3 .mt3_money {
            font-size: 18px;
            color: #544b5e;
        }
    }
</style>


