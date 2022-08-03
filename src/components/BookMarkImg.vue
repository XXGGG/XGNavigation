<template>
    <img ref="Myimg" class="imgBox" :src="src" @load="imageloaded" @mouseover="getShadow" @mouseout="delShadow"
        @error="img_error($event)" draggable="false" :style="`${shadow}`">
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { xgrgb } from "xgrgb"

const pros = defineProps({
    src: String,
})


let Myimg: any = ref('');

//图片加载失败
const img_error = (e: any) => {
    console.log(pros.src + ' 路径的图片加载错误')
    let img = e.srcElement
    img.style = 'display:none;'
}
//图片加载成功
let img_rgb: any = null
const imageloaded = (e: any) => {
    if (Myimg.value) {
        img_rgb = xgrgb(Myimg.value)
    }
}

//当图片加载成功才去取得rgb
let shadow: any = ref('')
const getShadow = () => {
    if (img_rgb && img_rgb.r) {
        shadow.value = `box-shadow: rgba(${img_rgb.r}, ${img_rgb.g}, ${img_rgb.b}, 0.25) 0px 32px 64px 0px, 
                                    rgba(${img_rgb.r}, ${img_rgb.g}, ${img_rgb.b}, 0.25) 0px 16px 32px 0px, 
                                    rgba(${img_rgb.r}, ${img_rgb.g}, ${img_rgb.b}, 0.25) 0px 4px 16px 0px, 
                                    rgba(${img_rgb.r}, ${img_rgb.g}, ${img_rgb.b}, 0.25) 0px 2px 4px 0px ;`
    } else {
        shadow.value = `box-shadow: rgba(51, 51, 51, 0.25) 0px 32px 64px 0px, 
                                    rgba(51, 51, 51, 0.25) 0px 16px 32px 0px, 
                                    rgba(51, 51, 51, 0.25) 0px 4px 16px 0px, 
                                    rgba(51, 51, 51, 0.25) 0px 2px 4px 0px ;`
    }
}
const delShadow = () => {
    shadow.value = ""
}

</script>

<style lang="scss" scoped>
.imgBox {
    --fontSize: calc(var(--icon-width) / 7);
    overflow: hidden;
    border-radius: 20%;
    width: calc(100% - var(--fontSize) * 2);
    margin: auto;
    aspect-ratio: 1 / 1;

    &:hover {
        transform: scale(1.01);
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.8);
    }

    transition: all 0.3s;
}
</style>
