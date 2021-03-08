<template>
    <div class="kefu_v">
        <iframe :src="data.link"></iframe>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        components: {},
        data() {
            return {
                data: {}
            };
        },
        created() {
            this.$parent.footer(true, 'tree');
        },
        mounted() {
            this.start();
        },
        methods: {
            start() {

                Fetch('/index/kefulink', {type: 'web'}).then(res => {
                    this.data = res.data;
					window.location.href = this.data.link;
                })
            },
        }
    };
</script>

<style lang="less" scoped>

    .kefu_v {
        position: fixed;
        width: 100%;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;

        iframe {
            padding-bottom: 55px;
            width: 100%;
            height: 100%;
        }
    }
</style>


