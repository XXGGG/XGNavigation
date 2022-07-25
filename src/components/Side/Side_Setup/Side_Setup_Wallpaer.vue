<template>
    <n-tabs type="line" animated>
        <n-tab-pane name="default" tab="默认壁纸">
            <n-scrollbar style="max-height: 580px">
                <div class="wallpaper_box">
                    <div class="wallpaper_preview" v-for="item in WallpaerList"
                        :style="`background-image:url(${item.img})`" @click="ChangBgImg(item.img)"></div>
                </div>
            </n-scrollbar>
        </n-tab-pane>
        <n-tab-pane name="pureColor" tab="纯色壁纸">
        </n-tab-pane>
    </n-tabs>

</template>

<script setup lang='ts'>
import { } from 'vue'
import { NTabs, NTabPane,NScrollbar} from 'naive-ui'
import { WallpaerList } from '../../../assets/WallpaerList';
import { mainStore } from '../../../store/index'

//引进Pinia仓库
const store = mainStore()
const ChangBgImg = (imgUrl: string) => {
    store.bg_img = imgUrl
}
</script>

<style lang='scss' scoped>
.wallpaper_box {
    width: 100%;
    height: auto;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
}

.wallpaper_preview {
    width: 100%;
    aspect-ratio: 16/9;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover .show_change_wallpaer_modal {
        display: block;
        color: #3939397a;
    }

    .show_change_wallpaer_modal {
        display: none;
    }
}
</style>