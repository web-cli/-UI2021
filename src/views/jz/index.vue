<template>
    <div class="jobs_wrap">
        <div class="header">
            <div class="head">
                <router-link to="/user" class="back"></router-link>
                我要分享
            </div>
        </div>
        <router-link :to="'/jz/' + v.id" class="jobs_item" v-for="(v,k) in data.list" :key="k">
            <div class="title">{{v.title}}</div>
            <img class="img" :src="v.img" alt="" />
        </router-link>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "jz",
        data() {
            return {
               data:{}
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
                Fetch('/index/share').then((r) => {
                    this.data = r.data;
                });
            },
        }
    };
</script>

<style lang="less" scoped>
    .jobs_wrap {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        overflow-x: hidden;
        overflow-y: auto;
        background: #f5f5f5;
    }

    .jobs_wrap .jobs_item {
        display: block;
        width: 92%;
        margin: 20px auto;
        border-radius: 4px 4px 0 0;
        -webkit-box-shadow: 0 -1px 3px rgba(0,0,0,0.3);
        box-shadow: 0 -1px 3px rgba(0,0,0,0.3);
    }

    .jobs_wrap .jobs_item .title {
        width: 100%;
        color: #000;
        line-height: 2.5;
        font-size: 15px;
        text-align: center;
    }

    .jobs_wrap .jobs_item .img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }
</style>


