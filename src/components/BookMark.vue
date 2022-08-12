<template>
    <keep-alive>
        <n-carousel :loop="false" :draggable="carousel_carousel_active" class="debut" @click="showDel_false()">
            <n-carousel-item v-for="page in pages" :key="page" style="width:100%;">
                <TransitionGroup id="Mark" name="list" tag="div" v-show="BookMarkList[page - 1]"
                    class="bm_box" :style="`grid-gap: 0px;
                    grid-template-columns: repeat(${XGN_SET.Layout_Cols}, calc(100% / ${XGN_SET.Layout_Cols}));
                    grid-template-rows: repeat(${XGN_SET.Layout_Rows}, calc(100% / ${XGN_SET.Layout_Rows}));`">

                    <div v-for="(item, index) in BookMarkList[page - 1]" :key="item.url" class="bm_item">
                        <div :class="showDel ? 'vibration' : ''">

                            <n-icon class="del" @click.stop="Del_Mark(item.title)" v-show="showDel">
                                <Minus />
                            </n-icon>
                            <div class="Del_mask" v-show="showDel" @click="showDel = false"></div>
                            <a :href="item.url" target="_blank" @mouseover="change_carousel_false"
                                @mouseout="carousel_active_true" draggable="true"
                                @dragstart.self="dragstart($event, index)" @drag.capture="drag($event)"
                                @dragend.capture="dragend($event, index)" @dragenter="dragenter($event, index)"
                                @drop="drop($event, index)" @contextmenu.prevent="rightClick">
                                <book-mark-img v-show="item" :src="item.img" />

                                <n-el class="bm_title">
                                    <transition name="icon">
                                        <div v-if="XGN_SET.View_BookMark_Title_Show">{{ item.title }}</div>
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

let { XGN_SET } = storeToRefs(store)// 解构出来【设置样式】，【我的书签】

//显示删除
let showDel = ref(false)
function Del_Mark(title:string) {
    let Key_Index = XGN_SET.value.BookMarks.findIndex((item: any) => {
        return item.title ==  title
    })
    XGN_SET.value.BookMarks.splice(Key_Index, 1);
}
//右键
function rightClick() {
    showDel.value = !showDel.value;
}
//关闭显示的删除
function showDel_false() {
    showDel.value = false;
}

// 一页展示的数量： 横 乘 竖 
let num = computed(() => {
    return XGN_SET.value.Layout_Cols * XGN_SET.value.Layout_Rows
})

// 需要展示的页数： 全部书签数量 除 一页展示的数量
let pages: any = computed(() => {
    //向上取整
    if (XGN_SET.value.BookMarks.length == 0) {
        return 1
    }
    return Math.ceil(XGN_SET.value.BookMarks.length / num.value)
})

let BookMarkList = computed(() => {
    let xxg = [];
    for (let i = 0; i < pages.value; i++) {
        xxg.push(XGN_SET.value.BookMarks.slice(num.value * i, num.value * (i + 1)))
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

let mark_event: any;
let mark_index: number;
//1拖拽图标
let dragstart = (event: any, index: any) => {
    event.dataTransfer.setData("index", index);
    // console.log(1)
    mark_event = event
    mark_event.target.style.opacity = '0.01'
    mark_index = index;
};

//2移动的过程
let drag = (event: any) => {
    event.preventDefault();
    // console.log(2)
};

let mark_move = false;

//3松开鼠标的过程
let dragend = (event: any, index: any) => {
    // console.log(3)
    mark_event.target.style.opacity = '1'
    mark_move = false
};

//4 鼠标进入到
let dragenter = (event: any, index: any) => {
    // console.log(4)
    if (!mark_move) {
        // event.preventDefault();
        let startIndex = mark_index;
        let currentIndex = parseInt(index);
        // console.log("start", startIndex);
        // console.log("drop", currentIndex);

        if (startIndex > currentIndex) {
            mark_move = true
            XGN_SET.value.BookMarks.splice(currentIndex, 0, XGN_SET.value.BookMarks[startIndex]);
            XGN_SET.value.BookMarks.splice(startIndex + 1, 1);

        } else if (startIndex < currentIndex) {
            mark_move = true
            XGN_SET.value.BookMarks.splice(currentIndex + 1, 0, XGN_SET.value.BookMarks[startIndex]);
            XGN_SET.value.BookMarks.splice(startIndex, 1);
        }

        mark_index = index
        setTimeout(() => {
            mark_move = false
        }, 300);
    }
};

//5放在某个位置
let drop = (event: any, index: any) => {
    // console.log(5)
    event.preventDefault();
    mark_event.target.style.opacity = '1'
    // let startIndex = parseInt(event.dataTransfer.getData("index"));
    let startIndex = mark_index;
    let currentIndex = parseInt(index);

    if (startIndex > currentIndex) {
        XGN_SET.value.BookMarks.splice(currentIndex, 0, XGN_SET.value.BookMarks[startIndex]);
        XGN_SET.value.BookMarks.splice(startIndex + 1, 1);
    } else if (startIndex < currentIndex) {
        XGN_SET.value.BookMarks.splice(
            currentIndex + 1,
            0,
            XGN_SET.value.BookMarks[startIndex]
        );
        XGN_SET.value.BookMarks.splice(startIndex, 1);
    }
};

// 监听轮播图宽度 改变 css变量
onMounted(() => {
    watch_change()


    function watch_change() {
        let Mark: any = document.getElementById('Mark')

        const resizeObserver = new ResizeObserver((entries) => {

            let IconBoxWidth = entries[0].contentRect.width //轮播图盒子的宽
            let IconBoxHeight = entries[0].contentRect.height //高
            let FontSize = document.body.style.getPropertyValue('--icon-font-size') //字体大小/字体高度
            // console.log(entries)

            document.body.style.setProperty('--icon-box-width', IconBoxWidth + 'px')
            document.body.style.setProperty('--icon-box-height', IconBoxHeight + 'px')


            document.body.style.setProperty('--icon-col', String(XGN_SET.value.Layout_Cols))
            document.body.style.setProperty('--icon-row', String(XGN_SET.value.Layout_Rows))


            //根据宽算出来的边长
            let IconWidth_width = (IconBoxWidth / XGN_SET.value.Layout_Cols)
            let IconWidth_height = (IconBoxHeight / XGN_SET.value.Layout_Rows) - 20
            if (IconWidth_width < IconWidth_height) {
                if (IconWidth_width < 0) {
                    document.body.style.setProperty('--icon-width', '0px')
                } else if (IconWidth_width > 160) {
                    document.body.style.setProperty('--icon-width', '160px')
                } else {
                    document.body.style.setProperty('--icon-width', IconWidth_width + 'px')
                }
            } else {
                if (IconWidth_height < 0) {
                    document.body.style.setProperty('--icon-width', '0px')
                } else if (IconWidth_height > 160) {
                    document.body.style.setProperty('--icon-width', '160px')
                } else {
                    document.body.style.setProperty('--icon-width', IconWidth_height + 'px')
                }
            }
        })
        resizeObserver.observe(Mark)
    }
    watch(() => [XGN_SET.value.Layout_Cols, XGN_SET.value.Layout_Rows], () => {
        watch_change()
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
    max-width: 1500px;
    height: 90%;
    min-height: 300px;
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
        transition: translateY .5s;
    }

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
