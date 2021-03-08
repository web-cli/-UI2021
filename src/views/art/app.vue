<template>
    <div class="app">
        <div class="app_top">
            <div class="top_left">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAgpJREFUSA2tlU1KA0EQhRN/DiC6CjjLeAAhK8FVdoK5hDcSjxBwp+uQkIXeQASFbILoJnoDje8b542TsecncR686Zruqlfd09PV7VY1unIZiH0xEjsieBXn4ki8EZ/FjXCsqLG4rEl8iamNHXleil9iNslC71NxmBCbvqwPMcSiUYo9jU5EBxN4LZ6K22Ie9DGGT3ZiaKAVBLPIJpnpvZfz3NX7fkLsLPAlxpNEK7gylmyne9kI5nGmDvtg50EMsfZBcwVsopfOrEJJCKhKhA+xXhmaaKcYy2IWDOQ/V+oko04i/NHwxNGOcaSnl8qmlqFuIjTQsm53Sy/n9Ca4stFAm9UakKifiL6rvWsggSXQQhP0SRTFZqv1oPYzsZto0EITRCTK1q64t+aDT/MY4EUmnnoIOsED9TNW+Tws8DgI9C9JRNau6JUF/NKuD1lV+/iSev9qvtFHmec3XIiheqbujYAWmmiP2CMSAU70SWw180DLFSbOsc6BXWcKKwfWgZQJllhVguxf1fYSPTTRTkHhc22ayfaSU4c1DGLR8MTRXgElnUFYdE2sBAReSFJ6TRDDrz4RnYxZ8QnqAl+vBA200AziP1e5J+gkhVe5MzMLPqP3zAKciak4TIjtc2IfYogtXInG/oBNHIsWqWrx/bPxVm3bKGk5Z9xZXCeR6FJF6ZqLHMZb8UksxDee+7kyZHQjzwAAAABJRU5ErkJggg==">
                <div class="left1">开始时间</div>
                <div class="left2">{{data.date}}</div>
            </div>
            <div class="top_center"><img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAahJREFUSA29lL1KA0EUhQe1tRCLgEVKfQDBNuCD5DEi2vkOPoNgq2WI2KTWwlbYSizExk7w53zr3DAuN+vuZMiBk7l7f86dOzubELphW2nn4r34HomNj1gRHEulEr+XkBg5KwGBL9GavMi+icQ2PznZzTiSKop9aD0TN0UDNj5iNKzErGPk/G3Hp7KXgWaWR01vPKgCAY4onaQpRMyOkQvSG9wuGvFO/gM55FLjYsP1rtnJMRQ7uraJruNgA62TliFPFCMHWM3vU8ff5vXm5qWXAhvfyteb/azlg6URGItvIu/LIzFysnGoypnoiXs+cqnpjC1lXojpfxzCr+KdeBmJjS9tSg21aLRiR9Fb0YopvBJHYnoR9FgDHzFy0o2hgZYLdpE2edLzkZvpO8mlxjaJljsZI1vSXPau2BfUUGs6aP4BL9FGZ1c5TUyQWpsMTbQXmMliFwT6HNdCoGGgYRtHu8aBfm1UXmopoGW6+4hOEscIRyGgZY3oEabRwTfhXWFycoCWfWdT/r2HUeVR62e0SyxooQmGNNqrzRCe41pyMU3rUVLb1/oBcUmi3cKnkCoAAAAASUVORK5CYII=">
                <div class="center1">剩余名额</div>
                <div class="center2">{{data.num}}</div>
            </div>
            <div class="top_right">
                <div class="right" @click="tokefu">联系客服</div>
            </div>
        </div>
        <div class="content">
            <vue-editor v-model="data.content" style="display: none"/>
            <div class="contract_box ql-editor " style="width: 100%" v-html="data.content"></div>
        </div>
        <div class="bottom">
            <router-link to="/app_reg">
                <div class="a1">
                    <span class="b1">立即加入</span>
                    <span class="b2"><van-count-down :time="time" format="mm:ss" @finish="call"/></span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>

    import Vue from 'vue';
    import { CountDown } from 'vant';
    import Fetch from "../../utils/fetch";
    import {Dialog} from 'vant';
    import {VueEditor} from 'vue2-editor';

    Vue.use(CountDown);

    export default {
        components: {
            VueEditor,
            Dialog,
            CountDown
        },
        data() {
            return {
                data: '',
                time: 60 * 1000
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {

            Fetch('/api/api/webconfig', {type: 'tg'}).then(res => {
                this.data = res.data;
                this.time = parseInt(res.data.time) * 1000;
            });

        },
        methods: {
            tokefu(){
                this.$router.push('/kefu').catch (err => {});;
            },
            call(){
                Dialog.confirm({
                    title: '名额不多了',
                    message: '心动不如行动，开始财富之旅吧',
                    confirmButtonText: '立即报名',
                    confirmButtonColor: 'rgb(251, 171, 0)',
                    cancelButtonText: '再想想'
                }).then(() => {
                    this.$router.push('/app_reg')
                })
            }
        }
    }
</script>

<style lang="less">

    .app {
        /deep/ .ql-editor{
            padding: 0;
        }
        .app_top {
            background-color: rgb(255, 225, 15);
            position: fixed;
            height: 13.33333vw;
            width: 100%;
            z-index: 2;
            font-size: 3.46667vw;
            color: #000;

            .top_left {
                display: inline-block;
                position: relative;
                width: 37%;

                > img {
                    position: absolute;
                    width: 3.46667vw;
                    height: 3.46667vw;
                    left: 4vw;
                    top: 2.66667vw;
                }

                .left1 {
                    font-weight: 700;
                    margin-left: 8.53333vw;
                    margin-top: 2.66667vw;
                }

                .left2 {
                    margin-left: 8.53333vw;
                    margin-top: 1.33333vw;
                }
            }

            .top_center {
                display: inline-block;
                position: relative;
                width: 33.33%;

                > img {
                    position: absolute;
                    width: 3.46667vw;
                    height: 3.46667vw;
                    left: 4vw;
                    top: 2.66667vw;
                }

                .center1 {
                    font-weight: 700;
                    margin-left: 8.53333vw;
                    margin-top: 2.66667vw;
                }

                .center2 {
                    margin-left: 8.53333vw;
                    margin-top: 1.33333vw;
                }
            }

            .top_right {
                position: absolute;
                height: 13.33333vw;
                width: 28%;
                right: 0;
                top: 0;

                .right {
                    font-weight: 700;
                    width: 20.53333vw;
                    height: 7.46667vw;
                    line-height: 7.46667vw;
                    text-indent: 2.66667vw;
                    border: 1px solid #000;
                    border-radius: 1.06667vw;
                    margin-top: 2.93333vw;
                    position: absolute;
                    right: 4vw;
                }
            }
        }

        .bottom {
            position: fixed;
            width: 100%;
            height: 16vw;
            bottom: 0;
            z-index: 2;
            background-color: #333;

            a {
                background: transparent;
                text-decoration: none;
            }

            .a1 {
                width: 80%;
                height: 10.66667vw;
                line-height: 10.66667vw;
                top: 2.66667vw;
                left: 10%;
                text-align: center;
                font-size: 5.33333vw;
                color: #333;
                background: #ffe10f;
                -webkit-box-shadow: 0.53333vw 1.06667vw 2.13333vw 0 rgba(0, 0, 0, .04);
                box-shadow: 0.53333vw 1.06667vw 2.13333vw 0 rgba(0, 0, 0, .04);
                border-radius: 12vw;
                position: absolute;
                z-index: 3;

                .b1 {
                    font-weight: 700;
                    font-size: 5.06667vw;
                }

                .b2 {
                    font-size: 3.73333vw;
                    position: absolute;
                    right: 6.66667vw;
                    /deep/ .van-count-down{
                        padding-top: 14px;
                        font-size: 16px;
                    }
                }
            }
        }

        .content {
            background-color: #fff;
            position: relative;
            z-index: 1;
            left: 0;
            width: 100%;
            padding-top: 13.33333vw;
        }
    }

</style>
