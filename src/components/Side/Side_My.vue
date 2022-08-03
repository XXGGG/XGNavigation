<template>
    <n-space vertical :size="20" style="margin:10px 0">
        <n-card size="large" hoverable>
            <n-space class="flex">
                <n-avatar :size="60" round src="./XGN.png" style="margin-right:20px" />
                <n-space vertical>
                    <n-gradient-text type="info" class="h1">
                        注册/登录
                    </n-gradient-text>
                    <div>
                        即刻享受更多特权
                    </div>
                </n-space>
            </n-space>
        </n-card>

        <n-card title="备份与恢复" hoverable>
            暂时不支持登录/注册 - 数据同步
        </n-card>
        <n-card title="关于" hoverable>
            <n-space vertical :size="20">
                <n-tag> v0.0.1 </n-tag>
                <n-space :size="20" class="aboutMe">
                    <a href="https://github.com/XXGGG" target="_blank">
                        <n-avatar :size="60" src="./book_mark_img/github.png" />
                    </a>
                    <a href="https://space.bilibili.com/5276030" target="_blank">
                        <n-avatar :size="60" src="./book_mark_img/bilibili.png" />
                    </a>
                    <a href="https://www.weibo.com/u/2472496944" target="_blank">
                        <n-avatar :size="60" src="./book_mark_img/weibo.png" />
                    </a>
                    <a href="https://xxggg.github.io/Project/XGNavigation.html" target="_blank">
                        <n-avatar :size="60" src="./XGN.png" />
                    </a>
                </n-space>
            </n-space>
        </n-card>
    </n-space>
</template>

<script setup lang='ts'>
import { NCard, NAvatar, NSpace, NGradientText, NTag } from 'naive-ui'
</script>

<style lang='scss' scoped>
.h1 {
    font-size: 18px;
    font-weight: bold;
}

.aboutMe {
    a { 
        display: block;
        width: 60px;
        height: 60px;
        transition:opacity .2s;
        border-radius: 14px;
        overflow: hidden;
        &:hover {
            opacity: 0.6;
        }
    }
}
</style>