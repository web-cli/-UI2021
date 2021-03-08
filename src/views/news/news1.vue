<template>
    <div class="bg">
		12
        <div class="header">
            <div class="head">
                <router-link to="/index" class="back"></router-link>
                收益计算器
            </div>
        </div>
        <form class="form" @submit.prevent="submit">
            <div class="content">
                <div class="item_box">
                    <div class="item_title">投资金额</div>
                    <div class="item">
                        <input type="number" class="inp oldpwd" name="amount" v-model.trim="money" placeholder="意向投资金额">
                        <span class="right">元</span>
                    </div>
                </div>
                <div class="item_box">
                    <div class="item_title">投资期限</div>
                    <div class="item">
                        <input type="number" class="inp newpwd" name="day" v-model.trim="days" placeholder="期望投资期限">
                        <span class="right danwei">日</span>
                    </div>
                </div>
                <div class="item_box">
                    <div class="item_title">日化利率</div>
                    <div class="item">
                        <input type="text" class="inp confirm_newpwd" name="se" v-model.trim="apr" placeholder="期待日化利率">
                        <span class="right">%</span>
                    </div>
                </div>
                <div class="item_box">
                    <div class="item_title">还款方式</div>
                    <div class="item">
                        <select name="type" class="select_showbox" v-model="type">
                            <option value="E">一次性还本付息</option>
                            <option value="A">每日返息，到期还本</option>
                            <option value="B">每周返息，到期还本</option>
                            <option value="C">每月返息，到期还本</option>
                            <option value="D">每日复利，保本保息</option>
                        </select>
                    </div>
                </div>
                <div class="ball ball1"></div>
                <div class="ball ball2"></div>
            </div>

            <div class="btn_box clearfix">
                <button type="submit" class="btn btn1">提 交</button>
                <button type="button" onclick="javascript:history.back();" class="btn btn2">取消</button>
            </div>
        </form>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'
    import {Swipe, SwipeItem} from "vant";

    export default {
        name: "index",
        components: {
            VanSwipe: Swipe,
            VanSwipeItem: SwipeItem,
        },
        data() {
            return {
                apr: '',
                days: '',
                type: 'A',
                money: '',
            };
        },
        created() {
            this.$parent.footer(false);
        },
        methods: {
            submit() {

                if (!this.money) {
                    this.$notify('请输入金额');
                    return;
                }

                if (!this.days) {
                    this.$notify('请输入天数');
                    return;
                }

                if (!this.apr) {
                    this.$notify('请输入利息');
                    return;
                }

                this.$router.replace({
                    path: 'cal_result',
                    query: {
                        money: this.money,
                        type: this.type,
                        days: this.days,
                        apr: this.apr
                    }
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .bg {
        height: 100%;
        background: #544b5e;
        position: fixed;
        width: 100%;

        .title {
            text-align: center;
            color: #e8c27d;
            font-size: 28px;
            padding: 50px 0 32px 0;

        }

        .form {
            width: 85.2%;
            margin: 0 auto 0 auto;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            position: relative;
            padding-top: 20px;
        }

        .form .content {
            padding: 1px 4.3% 20px 4.3%;
            background-color: #fff;
            border-radius: 6px;
            position: relative;
        }

        .form .item_box {
            margin-bottom: 22px;
            padding-top: 22px;
        }

        .form .item_box .item_title {
            width: 64px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 18px;

            color: #fff;
            font-size: 12px;
            background: #E8C27D;
        }

        .form .item_box .item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding-bottom: 7px;
            border-bottom: 1px solid #edebeb;
            margin-top: 10px;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            font-size: 14px;

        }

        .form .item_box .item .inp {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            font-size: 14px;
            color: #544b5e;
            padding: 0 4px;
        }

        .form .item_box .item .right {
            display: inline-block;
            width: 20px;
            height: 20px;
            color: #999;

        }

        .form .content .ball {
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 24px;
            background: #544b5e;
            position: absolute;
        }

        .form .content .ball1 {
            left: -12px;
            top: 43.8%;
        }

        .form .content .ball2 {
            right: -12px;
            top: 43.8%;
        }

        .form .btn_box {
            margin-top: 35px;
            padding: 0 5.2%;
        }

        .form .btn_box .btn {
            width: 41.2%;
            height: 40px;
            line-height: 40px;
            border-radius: 40px;
            text-align: center;

            font-size: 18px;
        }

        .form .btn_box .btn1 {
            float: left;
            background: #e8c27d;
            color: #333;
        }

        .form .btn_box .btn2 {
            float: right;
            background: #8b8b8b;
            color: #fff;
        }
    }
</style>


