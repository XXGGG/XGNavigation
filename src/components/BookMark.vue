<template>
    <keep-alive>
        <n-carousel :loop="false" :draggable="carousel_carousel_active" class="debut" @click="showDel_true()">
            <n-carousel-item v-for="page in pages" :key="page" style="width:100%;">
                <TransitionGroup ref="fuck" id="fuck" name="list" tag="div" v-show="BookMarkList[page - 1]"
                    class="bm_box" :style="`grid-gap: 0px;
                    grid-template-columns: repeat(${Setup_Style.layout_cols}, calc(100% / ${Setup_Style.layout_cols}));
                    grid-template-rows: repeat(${Setup_Style.layout_rows}, calc(100% / ${Setup_Style.layout_rows}));`">

                    <div v-for="(item, index) in BookMarkList[page - 1]" :key="item.url" class="bm_item">
                        <div :class="showDel ? 'vibration' : ''">

                            <n-icon class="del" @click.stop="Del_Mark(index)" v-show="showDel">
                                <Minus />
                            </n-icon>
                            <div class="Del_mask" v-show="showDel" @click="showDel = false"></div>
                            <a :href="item.url" target="_blank" @mouseover="change_carousel_false"
                                @mouseout="carousel_active_true" draggable="true"
                                @dragstart.self="dragstart($event, index)" @drag.capture="drag($event)"
                                @dragend.capture="dragend($event, index)" @dragenter="dragenter($event, index)"
                                @drop="drop($event, index)" @contextmenu.prevent="rightClick">
                                <book-mark-img v-show="item" :src="item.img"/>

                                <n-el class="bm_title">
                                    <transition name="icon">
                                        <div v-if="Setup_Style.Show_Icon_Title">{{ item.title }}</div>
                                    </transition>
                                </n-el>
                            </a>

                        </div>
                    </div>
                </TransitionGroup>
            </n-carousel-item>
        </n-carousel>
    </keep-alive>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, watch } from 'vue'
import { NEl, NCarousel, NCarouselItem, NIcon } from "naive-ui";
import { Minus } from '@vicons/tabler'
import { mainStore } from '../store/index'
import { storeToRefs } from 'pinia';
import BookMarkImg from "./BookMarkImg.vue";
const store = mainStore() //引进Pinia仓库
let { Setup_Style, BookMarks } = storeToRefs(store)// 解构出来【设置样式】，【我的书签】

let showDel = ref(false)
function Del_Mark(index: number) {
    BookMarks.value.splice(index, 1);
}
function rightClick() {
    showDel.value = !showDel.value;
}
function showDel_true() {
    showDel.value = false;
}

// 一页展示的数量就是 横 乘 竖 
let num = computed(() => {
    return Setup_Style.value.layout_cols * Setup_Style.value.layout_rows
})

// 需要展示的页数 就用 全部书签数量 除 一页展示的数量
let pages: any = computed(() => {
    //向上取整
    if (BookMarks.value.length == 0) {
        return 1
    }
    return Math.ceil(BookMarks.value.length / num.value)
})

let BookMarkList = computed(() => {
    let xxg = [];
    for (let i = 0; i < pages.value; i++) {
        xxg.push(BookMarks.value.slice(num.value * i, num.value * (i + 1)))
    }
    return xxg
})

let carousel_carousel_active: any = ref(true)
const carousel_active_true = () => {
    // console.log('轮播图可以移动');
    carousel_carousel_active.value = true
}
const change_carousel_false = () => {
    // console.log('轮播图不可以移动');
    carousel_carousel_active.value = false
}

let xxg_event: any;
let xxg_index: number;
//1拖拽图标
let dragstart = (event: any, index: any) => {
    event.dataTransfer.setData("index", index);
    // console.log(1)
    xxg_event = event
    xxg_event.target.style.opacity = '0.01'
    xxg_index = index;
};

//2移动的过程
let drag = (event: any) => {
    event.preventDefault();
    // console.log(2)
};

//3松开鼠标的过程
let dragend = (event: any, index: any) => {
    // console.log(3)
    xxg_event.target.style.opacity = '1'
    xxgmove = false
};


let xxgmove = false;
//4 鼠标进入到
let dragenter = (event: any, index: any) => {
    // console.log(4)
    if (!xxgmove) {
        // event.preventDefault();
        let startIndex = xxg_index;
        let currentIndex = parseInt(index);
        // console.log("start", startIndex);
        // console.log("drop", currentIndex);

        if (startIndex > currentIndex) {
            xxgmove = true
            BookMarks.value.splice(currentIndex, 0, BookMarks.value[startIndex]);
            BookMarks.value.splice(startIndex + 1, 1);

        } else if (startIndex < currentIndex) {
            xxgmove = true
            BookMarks.value.splice(currentIndex + 1, 0, BookMarks.value[startIndex]);
            BookMarks.value.splice(startIndex, 1);
        }
        xxg_index = index
        setTimeout(() => {
            xxgmove = false
        }, 300);
    }
};

//5放在某个位置
let drop = (event: any, index: any) => {
    // console.log(5)
    event.preventDefault();
    xxg_event.target.style.opacity = '1'
    // let startIndex = parseInt(event.dataTransfer.getData("index"));
    let startIndex = xxg_index;
    let currentIndex = parseInt(index);

    if (startIndex > currentIndex) {
        BookMarks.value.splice(currentIndex, 0, BookMarks.value[startIndex]);
        BookMarks.value.splice(startIndex + 1, 1);
    } else if (startIndex < currentIndex) {
        BookMarks.value.splice(
            currentIndex + 1,
            0,
            BookMarks.value[startIndex]
        );
        BookMarks.value.splice(startIndex, 1);
    }
};

let fuck: any = ref<any>(null)
// 监听轮播图宽度 改变 css变量
onMounted(() => {
    Wathcfuck()
    function Wathcfuck() {
        let xxfuck: any = document.getElementById('fuck')

        const resizeObserver = new ResizeObserver((entries) => {

            let IconBoxWidth = entries[0].contentRect.width //轮播图盒子的宽
            let IconBoxHeight = entries[0].contentRect.height //高
            let FontSize = document.body.style.getPropertyValue('--icon-font-size') //字体大小/字体高度
            // console.log(entries)

            document.body.style.setProperty('--icon-box-width', IconBoxWidth + 'px')
            document.body.style.setProperty('--icon-box-height', IconBoxHeight + 'px')


            document.body.style.setProperty('--icon-col', String(Setup_Style.value.layout_cols))
            document.body.style.setProperty('--icon-row', String(Setup_Style.value.layout_rows))


            //根据宽算出来的边长
            let IconWidth_width = (IconBoxWidth / Setup_Style.value.layout_cols)
            let IconWidth_height = (IconBoxHeight / Setup_Style.value.layout_rows) - 20
            if (IconWidth_width < IconWidth_height) {
                if (IconWidth_width < 0) {
                    document.body.style.setProperty('--icon-width', '0px')
                } else if (IconWidth_width > 180) {
                    document.body.style.setProperty('--icon-width', '180px')
                } else {
                    document.body.style.setProperty('--icon-width', IconWidth_width + 'px')
                }
            } else {
                if (IconWidth_height < 0) {
                    document.body.style.setProperty('--icon-width', '0px')
                } else if (IconWidth_height > 180) {
                    document.body.style.setProperty('--icon-width', '180px')
                } else {
                    document.body.style.setProperty('--icon-width', IconWidth_height + 'px')
                }
            }
        });
        resizeObserver.observe(xxfuck)
    }
    watch(() => [Setup_Style.value.layout_cols, Setup_Style.value.layout_rows], () => {
        Wathcfuck()
    })
});




</script>


<style lang='scss' scoped>
// a {
//     -webkit-user-drag: none;
// }

.debut {
    animation: debut 0.5s;
}

@keyframes debut {
    0% {
        transform: scale(0.8);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.bm_box {
    width: 100%;
    max-width: 1600px;
    height: 90%;
    margin: auto;
    display: grid;
    grid-gap: 100px;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    // background-color: rgb(242, 255, 0);
}

.bm_item {
    width: var(--icon-width);
    height: var(--icon-width);
    // background-color: rgba(252, 21, 21, 0.695);

    a {
        display: flex;
        flex-direction: column;
        position: relative;
        transition: translateY .5s ;
    }
    // .mark_img:hover{
        
    // }
    .del {
        position: absolute;
        top: calc(var(--icon-width) / -14);
        left: calc(var(--icon-width) / 20);
        width: calc(var(--icon-width) / 4.5);
        height: calc(var(--icon-width) / 4.5);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: rgb(165, 165, 165);
        cursor: pointer;
        z-index: 5;
        --fontSize: calc(var(--icon-width) / 6);
        font-size: var(--fontSize);
    }
}

.Del_mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: rgba(16, 87, 149, 0.564);
    z-index: 4;
}

.vibration {
    animation: vibration 0.15s ease-in-out infinite;
    animation-direction: alternate;
    animation-delay: 0s;
}

.bm_item:nth-child(2n) .vibration {
    animation-delay: .1s;
}


@keyframes vibration {
    0% {
        transform: rotate(2deg);
    }

    100% {
        transform: rotate(-2deg);
    }
}

.bm_title {
    --fontSize: calc(var(--icon-width) / 7);
    width: var(--icon-width);
    height: calc(var(--fontSize) * 2);
    line-height: calc(var(--fontSize) * 2);
    // background-color: aqua;
    text-align: center;
    font-size: var(--fontSize);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    div {
        color: var(--a-font-color);
        text-shadow: 1px 1px 2px rgba(125, 125, 125, 0.761);
    }
}



.list-move {
    transition: rotate 0s, all 0.4s;
}

* {
    transition-duration: 0ms;
}

.list-enter-active {
    transition: all .2s;
}

.list-leave-active {
    transition: all 0.2s;
    position: absolute;
}

.list-enter-from {
    opacity: 0;
    transform: scale(0.6);
}

.list-enter-to {
    opacity: 1;
    transform: scale(1);
}

.list-leave-from {
    opacity: 0;
    transform: scale(0);
}

.list-leave-to {
    opacity: 0;
    transform: scale(0);
}




.icon-enter-active,
.icon-leave-active {
    transition: all 0.2s;
}

.icon-enter-from {
    opacity: 0;
    transform: scale(0.6);
}

.icon-enter-to {
    opacity: 1;
    transform: scale(1);
}

.icon-leave-from {
    opacity: 1;
    transform: scale(1);
}

.icon-leave-to {
    opacity: 0;
    transform: scale(.8);
}
</style>
