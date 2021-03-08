<template>
    <div>
        <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                {{data.title}}
            </div>
        </div>
        <div class="main">
            <div class="box">
                <vue-editor v-model="data.content" style="display: none"/>
                <div class="contract_box ql-editor " style="width: 100%" v-html="data.content"></div>
            </div>
        </div>
    </div>
</template>

<script>

    import Fetch from "../../utils/fetch";
    import {VueEditor} from 'vue2-editor'

    export default {
        name: "nitice_content",
        components: {
            VueEditor
        },
        data() {
            return {
                data: {},
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
                Fetch('/user/notice_view', {
                    id: this.$router.history.current.params.id
                }).then(res => {
                    this.data = res.data.view;
                })
            },
        }
    };
</script>

<style scoped>

    /deep/ .ql-editor {
        padding: 5px
    }

    .box {
        width: 100%;
        overflow: hidden;
        border-radius: 12px;
        background: #fff;
    }

    .box >>> img {
        max-width: 100%;
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
        margin: 8px
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

</style>