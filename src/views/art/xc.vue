<template>
    <div class="container">
        <!--        <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft"/>-->
        <!--        <vue-editor v-model="content" style="display: none"/>-->
        <!--        <div class="content ql-editor" style="padding: 0 2px" v-html="content">-->
        <!--        </div>-->
        <div class="main">
            <div class="box">
                <vue-editor v-model="data.content" style="display: none"/>
                <div class="contract_box ql-editor " style="width: 100%" v-html="data.content"></div>
            </div>
        </div>
    </div>
</template>
<script>

    import Vue from 'vue'
    import Fetch from "../../utils/fetch";
    import {NavBar} from "vant";
    import {VueEditor} from 'vue2-editor'

    Vue.use(NavBar);

    export default {
        components: {
            VueEditor
        },
        data() {
            return {
                data: ''
            }
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            Fetch('/api/api/xc').then(res => {
                this.data = res.data;
            })
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            back() {
                this.$router.back();
            },
        }
    }
</script>

<style lang="less">

    .container {

        .back {
            position: absolute;
            z-index: 10;
            color: #fff;
            text-indent: 8px;
            width: 36px;
            height: 24px;
            line-height: 20px;
            font-size: 18px;
            background: #e8c27d;
            border-radius: 0 20px 20px 0;
            top: 10px;
        }

        .top {
            height: 70px;
            background: #544b5e;
        }

        .main {
            padding: 1px 0 20px 0;
        }

        .main .title1 {
            position: absolute;
            top: 50px;
            left: 20%;
            width: 60%;
            height: 36px;
            line-height: 36px;
            border-radius: 36px;
            color: #333333;
            font-size: 18px;
            text-align: center;
            background: #e8c27d;
            margin: 0 auto 10px auto;
        }

        .box {
            width: 100%;
            overflow: hidden;
            border-radius: 12px;
            background: #fff;
        }

        .box .item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -webkit-box-align: stretch;
            -ms-flex-align: stretch;
            align-items: stretch;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -ms-flex-line-pack: center;
            align-content: center;
            border-bottom: 1px solid #dcdcdc;
            font-size: 12px;
        }

        .box .item_head {
            color: #333333;
        }

        .box .item_body {
            color: #808080;
        }

        .box .item > div {
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding: 10px 4px;
            text-align: center;

        }

        .box .item .item_line {
            border-left: 1px solid #dcdcdc;
            border-right: 1px solid #dcdcdc;

        }

        .box .item .item_1 {
            -webkit-box-flex: 27;
            -ms-flex: 27;
            flex: 27;
        }

        .box .item .item_2 {
            -webkit-box-flex: 7;
            -ms-flex: 7;
            flex: 7;
        }

        .box .item .item_3 {
            -webkit-box-flex: 6;
            -ms-flex: 6;
            flex: 6;
        }

        .box .item .item_4 {
            -webkit-box-flex: 5;
            -ms-flex: 5;
            flex: 5;
        }

        .box .item .item_5 {
            -webkit-box-flex: 5;
            -ms-flex: 5;
            flex: 5;
        }

        .box .item .item_no {
            color: #e8c27d;
        }

        .box .item .item_yes {
            color: #64d17c;
        }

        .box .item .item_4 > span {
            display: inline-block;
            height: 16px;
            line-height: 16px;

            border-radius: 4px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            width: 28px;
            background: #e8c27d;
        }

        .box .item .item_5 > span {
            display: inline-block;
            height: 16px;
            line-height: 16px;

            border-radius: 4px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            width: 28px;
            background: #544b5e;
        }

        @media (max-width: 360px) {
            .box .item > div {
                padding: 10px 2px;
            }
        }

        height: 100%;
        // background-color: #f5f5f5;
        // position: relative;
        .content {
            //font-size: 12px;
            img {
                width: 100%;
            }
        }

        html, address,
        blockquote,
        body, dd, div,
        dl, dt, fieldset, form,
        frame, frameset,
        h1, h2, h3, h4,
        h5, h6, noframes,
        ol, p, ul, center,
        dir, hr, menu, pre {
            display: block;
            unicode-bidi: embed
        }

        li {
            display: list-item
        }

        head {
            display: none
        }

        table {
            display: table
        }

        tr {
            display: table-row
        }

        thead {
            display: table-header-group
        }

        tbody {
            display: table-row-group
        }

        tfoot {
            display: table-footer-group
        }

        col {
            display: table-column
        }

        colgroup {
            display: table-column-group
        }

        td, th {
            display: table-cell
        }

        caption {
            display: table-caption
        }

        th {
            font-weight: bolder;
            text-align: center
        }

        caption {
            text-align: center
        }

        body {
            //margin: 8px
        }

        h1 {
            font-size: 2em;
            margin: .67em 0
        }

        h2 {
            font-size: 1.5em;
            margin: .75em 0
        }

        h3 {
            font-size: 1.17em;
            margin: .83em 0
        }

        h4, p,
        blockquote, ul,
        fieldset, form,
        ol, dl, dir,
        menu {
            margin: 1.12em 0
        }

        h5 {
            font-size: .83em;
            margin: 1.5em 0
        }

        h6 {
            font-size: .75em;
            margin: 1.67em 0
        }

        h1, h2, h3, h4,
        h5, h6, b,
        strong {
            font-weight: bolder
        }

        blockquote {
            margin-left: 40px;
            margin-right: 40px
        }

        i, cite, em,
        var, address {
            font-style: italic
        }

        pre, tt, code,
        kbd, samp {
            font-family: monospace
        }

        pre {
            white-space: pre
        }

        button, textarea,
        input, select {
            display: inline-block
        }

        big {
            font-size: 1.17em
        }

        small, sub, sup {
            font-size: .83em
        }

        sub {
            vertical-align: sub
        }

        sup {
            vertical-align: super
        }

        table {
            border-spacing: 2px;
        }

        thead, tbody,
        tfoot {
            vertical-align: middle
        }

        td, th, tr {
            vertical-align: inherit
        }

        s, strike, del {
            text-decoration: line-through
        }

        hr {
            border: 1px inset
        }

        ol, ul, dir,
        menu, dd {
            margin-left: 40px
        }

        ol {
            list-style-type: decimal
        }

        ol ul, ul ol,
        ul ul, ol ol {
            margin-top: 0;
            margin-bottom: 0
        }

        u, ins {
            text-decoration: underline
        }

        br:before {
            content: "\A";
            white-space: pre-line
        }

        center {
            text-align: center
        }

        :link, :visited {
            text-decoration: underline
        }

        :focus {
            outline: thin dotted invert
        }

        /* Begin bidirectionality settings (do not change) */

        BDO[DIR="ltr"] {
            direction: ltr;
            unicode-bidi: bidi-override
        }

        BDO[DIR="rtl"] {
            direction: rtl;
            unicode-bidi: bidi-override
        }

        *[DIR="ltr"] {
            direction: ltr;
            unicode-bidi: embed
        }

        *[DIR="rtl"] {
            direction: rtl;
            unicode-bidi: embed
        }

        @media print {
            h1 {
                page-break-before: always
            }

            h1, h2, h3,
            h4, h5, h6 {
                page-break-after: avoid
            }

            ul, ol, dl {
                page-break-before: avoid
            }
        }
    }


</style>
