<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <div class="bg_img" id="bg_img"
      :style="`background-color:${store.XGN_SET.Bg_Color} ; background-image:url(${store.XGN_SET.Bg_Img})`">
      <div class="app_box debut">
        <n-button class="Side_activate_btn" @click="activate()" color="#3939397a">
          <n-icon :component="Atom2" class="secret" />
        </n-button>

        <TransitionGroup name="show">
          <!-- 搜索栏 -->
          <div class="Search_area debut" v-if="store.XGN_SET.View_Search_Show">
            <SearchBox />
          </div>

          <!-- 书签 -->
          <div class="BookMark_area" v-if="store.XGN_SET.View_BookMark_Show">
            <BookMark />
          </div>
        </TransitionGroup>
      </div>

    </div>
    <!-- 侧边栏 -->
    <n-drawer v-model:show="Side_active" style="width:100%; min-width:480px; max-width:600px">
      <n-drawer-content :native-scrollbar="false">
        <Side />
      </n-drawer-content>
    </n-drawer>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Atom2 } from '@vicons/tabler'
import { darkTheme, NConfigProvider, NGlobalStyle, NButton, NIcon } from 'naive-ui'
import { NDrawer, NDrawerContent } from 'naive-ui'

import Side from './components/Side.vue'
import SearchBox from './components/SearchBox.vue'
import BookMark from './components/BookMark.vue'
import { mainStore } from './store/index'
import { storeToRefs } from 'pinia';
import localforage from "localforage";

//引进Pinia仓库
const store = mainStore()
let { XGN_SET } = storeToRefs(store)// 解构出来

// 【初始化数据/监听数据】
store.$subscribe((mutation, state) => {
  //  mutation主要包含三个属性值：
  //  events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
  //  storeId：是当前store的id
  //  type：用于记录这次数据变化是通过什么途径，主要有三个分别是
  //         “direct” ：通过 action 变化的
  //           ”patch object“ ：通过 $patch 传递对象的方式改变的
  //           “patch function” ：通过 $patch 传递函数的方式改变的
  // 
  // console.log(mutation)
  // console.log(state.XGN_SET)
  localStorage.setItem("XGN_SET", JSON.stringify(state.XGN_SET))
  localforage.setItem("XGN_SET", JSON.parse(JSON.stringify(state.XGN_SET)))
}, { detached: false })  //第二个参数options对象，是各种配置参数
//detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被删除，
// 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效

//Pinia仓库初始化！
store.init()


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
    startDarkTime = XGN_SET.value.Dark_Start_Time
    endDarkTime = XGN_SET.value.Dark_End_Time
    if (newTime < startDarkTime && newTime >= endDarkTime) {
      theme.value = null
    } else {
      theme.value = darkTheme
    }
  }
}
//改变主题颜色方法【光】【暗】
const ChangeTheme = () => {
  clearInterval(TimeOut)//去掉之前的【计时】
  if (XGN_SET.value.Dark_Mode == "light") {
    theme.value = null
  } else if (XGN_SET.value.Dark_Mode == 'dark') {
    theme.value = darkTheme
  } else if (XGN_SET.value.Dark_Mode == 'auto') {
    autoSetTheme()
  } else {
    TimeSetTheme(XGN_SET.value.Dark_Mode)
    TimeOut = setInterval(() => {
      TimeSetTheme(XGN_SET.value.Dark_Mode)
    }, 60000)//一分钟监听一次
  }
}
//【监听主题的变换】
watch(() => XGN_SET.value.Dark_Mode, () => {
  ChangeTheme()
}, {
  immediate: true //立即执行一次
})
watch(() => XGN_SET.value.Dark_Start_Time, () => { ChangeTheme() })
watch(() => XGN_SET.value.Dark_End_Time, () => { ChangeTheme() })


</script>

<style lang="scss">
// 【全局样式👇】
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
//背景
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

//应用区域
.app_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: rgb(255, 85, 0);
}

//侧边栏按钮
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

//搜索框
.Search_area {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  // background-color: rgba(180, 89, 64, 0.5);
}

//书签
.BookMark_area {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  overflow: hidden;
  // background-color: rgba(64, 140, 180, 0.5);
}



// 动画
.show-move {
  transition: all .5s;
}

.show-enter-active {
  transition: all .2s;
}

.show-leave-active {
  transition: all .3s;
  position: absolute;
}

.show-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.show-enter-to {
  opacity: 1;
  transform: scale(1);
}

.show-leave-from {
  opacity: 1;
  transform: scale(0.8);
}

.show-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
