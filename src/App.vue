<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <div class="bg_img" id="bg_img" :style="`background-image:url(${store.bg_img})`">

      <div class="app_box debut">
        <n-button class="Side_activate_btn" @click="activate()" color="#3939397a">
          <n-icon :component="Hexagon" class="secret" />
        </n-button>

        <!-- 搜索栏 -->
        <Transition name="list">
          <div class="Search_area debut" v-if="store.Setup_Style.Show_Search">
            <SearchBox />
          </div>
        </Transition>
        <div class="BookMark_area">
          <BookMark />
        </div>
      </div>

    </div>
    <!-- 侧边栏 -->
    <n-drawer v-model:show="Side_active" :width="600">
      <n-drawer-content :native-scrollbar="false">
        <Side />
      </n-drawer-content>
    </n-drawer>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Hexagon } from '@vicons/tabler'
import { darkTheme, NConfigProvider, NGlobalStyle, NButton, NIcon } from 'naive-ui'
import { NDrawer, NDrawerContent } from 'naive-ui'

import Side from './components/Side.vue'
import SearchBox from './components/SearchBox.vue'
import BookMark from './components/BookMark.vue'
import { mainStore } from './store/index'
import { storeToRefs } from 'pinia';

//引进Pinia仓库
const store = mainStore()
let { Setup_Style } = storeToRefs(store)// 解构出来
// 侧边栏的激活状态
const Side_active = ref(false)
const activate = () => {
  Side_active.value = true
}


//【配置naive的暗黑主题】
let theme: any = ref(darkTheme)
//【检测系统的主题是黑还是白】
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
//【根据系统 自动变色！】
const autoSetTheme = () => {
  if (systemTheme.matches) { // 是深色
    theme.value = darkTheme
  } else { // 不是深色
    theme.value = null
  }
}

let TimeOut: any;
let date;
let Hours;
let newTime;
let startDarkTime;
let endDarkTime;
//【根据时间 自动变色//一分钟判断一次】
const TimeSetTheme = (model: string) => {
  date = new Date()
  Hours = date.getHours()
  newTime = date.toLocaleTimeString()
  if (model == 'sky') {
    if (Hours < 18 && Hours >= 6) {
      theme.value = null
    } else {
      theme.value = darkTheme
    }
  } else {
    startDarkTime = Setup_Style.value.dark_time_start
    endDarkTime = Setup_Style.value.dark_time_end
    if (newTime < startDarkTime && newTime >= endDarkTime) {
      theme.value = null
    } else {
      theme.value = darkTheme
    }
  }
}
//改变主题颜色方法【光】【暗】【】
const ChangeTheme = () => {
  clearInterval(TimeOut)
  if (Setup_Style.value.dark_model == "light") {
    theme.value = null
  } else if (Setup_Style.value.dark_model == 'dark') {
    theme.value = darkTheme
  } else if (Setup_Style.value.dark_model == 'auto') {
    autoSetTheme()
  } else {
    TimeSetTheme(Setup_Style.value.dark_model)
    TimeOut = setInterval(() => {
      TimeSetTheme(Setup_Style.value.dark_model)
    }, 60000)
  }
}
//【监听主题的变换】
watch(() => Setup_Style.value.dark_model, () => {
  ChangeTheme()
}, {
  immediate: true //立即执行一次
})
watch(() => Setup_Style.value.dark_time_start, () => { ChangeTheme() })
watch(() => Setup_Style.value.dark_time_end, () => { ChangeTheme() })


//【监听背景图片变化】
watch(() => store.bg_img, () => {
  console.log(store.bg_img)
  //图片加载成功
  let Myimg: any = document.getElementById('bg_img');
  console.log(Myimg)
  // let img_rgb: any = xgrgb(Myimg)
  // console.log(img_rgb)
})
</script>

<style lang="scss">
body {
  --icon-box-width: 0;
  --icon-box-height: 0;
  --icon-margin: 20px;
  --icon-col: 8;
  --icon-row: 4;
  --icon-height: 0px;
  --icon-width: 0px; //icon-box 盒子总宽度去除 --icon-col 就等于单个的宽度！
  --icon-font-size: 22px;
  --a-font-color: #fff;
}

//全局居中样式
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

//闪亮登场！！！
.debut {
  animation: debut 0.4s;
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

* {
  user-select: none;
}
</style>
<style lang="scss" scoped>
.bg_img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background-image: url("/bg_img/bg_img_02.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: all .3s;
}

.app_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: rgb(255, 85, 0);
}

.Side_activate_btn {
  position: fixed;
  right: 40px;
  top: 40px;
  z-index: 2;
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.secret {
  transform: scale(2);
}

.Search_area {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgba(0, 255, 255, 0.398);
  overflow: hidden;
  box-sizing: border-box;
}

.BookMark_area {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  // background-color: rgba(77, 137, 34, 0.399);
  overflow: hidden;
}




.list-move {
  transition: all 0.4s !important;
}

.list-enter-active {
  transition: all .2s;
}

.list-leave-active {
  transition: all .4s;
  position: absolute;
  top: 0;
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
  opacity: 1;
  // transform: scale(1);
}

.list-leave-to {
  opacity: 0;
  // transform: scale(0.6);
  transform: translateY(-100px);

}
</style>
