<template>
    <n-layout has-sider class="box" style="height:676px;">
        <n-layout-sider :width="160">
            <n-menu :collapsed-width="64" :icon-size="20" :root-indent="20" :options="menuOptions" inverted
                default-value="custom" @update:value="selectTag" />
        </n-layout-sider>
        <n-layout style="padding:6px 10px 6px 8px ;box-sizing: border-box;">
            <div class="wallpaper_box">
                <n-color-picker :swatches="[
                    '#FFFFFF',
                    '#18A058',
                    '#2080F0',
                    '#F0A020',
                    'rgba(208, 48, 80, 1)'
                ]" class="wallpaper_preview" :default-value="store.XGN_SET.Bg_Color" :actions="['confirm']"
                    @confirm="Pure_Bg" v-if="Select_key == 'custom'" />
                <div class="wallpaper_preview" v-for="item in WallpaerList.list"
                    :style="`background-image:url(${item.img})`" @click="ChangBgImg(item.img)"></div>
            </div>
        </n-layout>
    </n-layout>
</template>

<script setup lang='ts'>
import { h, ref } from 'vue'
import { NTabs, NTabPane, NScrollbar, NColorPicker, NIcon } from 'naive-ui'
import { NLayout, NLayoutSider, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import AllWallpaer from '../../../assets/AllWallpaer.json';
import { mainStore } from '../../../store/index'
import { Wand, Pacman, Tool, BuildingFactory, Paw, Stars, Box } from '@vicons/tabler'
//引进Pinia仓库
const store = mainStore()
//选择图片
const ChangBgImg = (imgUrl: string) => {
    store.XGN_SET.Bg_Img = imgUrl
}
//选择颜色
function Pure_Bg(color: string) {
    console.log(color)
    store.XGN_SET.Bg_Img = ''
    store.XGN_SET.Bg_Color = color
}

//侧边栏定义
function renderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions: MenuOption[] = [
    {
        label: '自定义',
        key: 'custom',
        icon: renderIcon(Wand)
    },
    {
        label: 'ACG',
        key: 'ACG',
        icon: renderIcon(Pacman)
    },
    {
        label: '风景',
        key: 'scenery',
        icon: renderIcon(BuildingFactory)
    },
    {
        label: '星空',
        key: 'starry',
        icon: renderIcon(Stars)
    },
    {
        label: '几何',
        key: 'geometry',
        icon: renderIcon(Box)
    }
]


//呈现图片！
console.log(AllWallpaer[0])
let WallpaerList: any = ref(AllWallpaer[0])

let Select_key = ref<string>('custom')
//选择标签类型
function selectTag(key: string, item: MenuOption) {
    Select_key.value = key
    WallpaerList.value = AllWallpaer.find(function (obj) {
        return obj.key == key
    })
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
    height: 100%;
    aspect-ratio: 16/9;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>
<style>
.n-modal .n-card__content {
    width: 100%;
    padding: 12px !important;

}
</style>