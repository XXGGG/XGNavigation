<template>
  <n-space vertical :size="20" style="margin:10px 0;">
    <!-- <n-input placeholder="搜索">
      <template #prefix>
        <n-icon :component="Search" />
      </template>
    </n-input> -->

    <n-layout has-sider class="box" style="height:calc(100vh - 100px);">
      <n-layout-sider :width="160">
        <n-menu :collapsed-width="64" :icon-size="20" :root-indent="20" :options="menuOptions" inverted
          default-value="recommend" @update:value="selectTag" />
      </n-layout-sider>
      <n-layout>
        <n-card hoverable style="width:94%;margin:10px auto;" v-for="item in BookMarksList.list" :key="item.url"
          size="small">
          <template #header>
            <p class="list_item">
              <img :src="item.img" @error="img_error(this)" />
            <p>{{ item.title }}</p>
            </p>
          </template>
          <template #header-extra>
            <n-button @click="Add_Mark(item)" strong secondary type="tertiary" quaternary
              v-if="check_exist(item.title)"> 添加 </n-button>
            <n-button @click="Del_Mark(item)" strong secondary type="info" quaternary v-else> 已添加 </n-button>
          </template>
        </n-card>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang='ts'>
import { h, ref } from 'vue'
import { Award, Music, Video, Armchair, Social, News, ShoppingCart, Brush, Code, Palette, Tool, Notebook, Language, Map2, Mailbox, Cloud, DeviceGamepad, Book, Ruler, ColorSwatch } from '@vicons/tabler'
import { NInput, NIcon, NSpace, NCard, NButton } from 'naive-ui'
import { NLayout, NLayoutSider, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import AllBookMarks from '../../assets/AllBookMarks.json'
import { mainStore } from '../../store/index'
import { storeToRefs } from 'pinia';
const store = mainStore() //引进Pinia仓库
let { XGN_SET } = storeToRefs(store)

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
// let Select_key = ref<string>('recommend')
const menuOptions: MenuOption[] = [
  {
    label: '推荐',
    key: 'recommend',
    icon: renderIcon(Award)
  },
  {
    label: '工具',
    key: 'tools',
    icon: renderIcon(Tool)
  },
  {
    label: '笔记',
    key: 'note',
    icon: renderIcon(Notebook)
  },
  {
    label: '翻译',
    key: 'translate',
    icon: renderIcon(Language)
  },
  {
    label: '地图',
    key: 'map',
    icon: renderIcon(Map2)
  },
  {
    label: '邮箱',
    key: 'mailbox',
    icon: renderIcon(Mailbox)
  },
  {
    label: '云盘',
    key: 'Cloud',
    icon: renderIcon(Cloud)
  },
  {
    label: '游戏',
    key: 'game',
    icon: renderIcon(DeviceGamepad)
  },
  {
    label: '音乐',
    key: 'music',
    icon: renderIcon(Music)
  },
  {
    label: '视频',
    key: 'video',
    icon: renderIcon(Video)
  },
  {
    label: '电影',
    key: 'film',
    icon: renderIcon(Armchair)
  },
  {
    label: '社交',
    key: 'social',
    icon: renderIcon(Social)
  },
  {
    label: '新闻',
    key: 'news',
    icon: renderIcon(News)
  },
  {
    label: '购物',
    key: 'shop',
    icon: renderIcon(ShoppingCart)
  },
  {
    label: '学习',
    key: 'study',
    icon: renderIcon(Book)
  },
  {
    label: '程序员',
    key: 'coder',
    icon: renderIcon(Code)
  },
  {
    label: 'UI库',
    key: 'UIlibray',
    icon: renderIcon(Ruler)
  },
  {
    label: '设计师',
    key: 'designer',
    icon: renderIcon(Brush)
  },
  {
    label: '绘画',
    key: 'draw',
    icon: renderIcon(Palette)
  },
  {
    label: '图画色彩',
    key: 'picture',
    icon: renderIcon(ColorSwatch)
  },
]

let BookMarksList: any = ref(AllBookMarks[0])
//选择标签类型
function selectTag(key: string, item: MenuOption) {
  // Select_key.value = key
  BookMarksList.value = AllBookMarks.find(function (obj) {
    return obj.key == key
  })
}

//检查是否已有书签
const check_exist = (title: string) => {
  let xxg = XGN_SET.value.BookMarks.some((item: any) => {
    return item.title == title
  })
  return !xxg
}

//【新增书签】
const Add_Mark = (item: any) => {
  XGN_SET.value.BookMarks.push(item)
}
//【删除书签】
const Del_Mark = (item: any) => {
  let Key_Index = XGN_SET.value.BookMarks.findIndex((i: any) => {
    return item.title == i.title
  })
  XGN_SET.value.BookMarks.splice(Key_Index, 1)
}

//【图片出错处理】
function img_error(_this: any) {
  _this.src = "./book_mark_img/default.png";
  _this.onerror = null;
}
</script>

<style lang='scss' scoped>
.box {
  border-radius: 5px;
  box-shadow: 0px 5px 16px -6px rgba(51, 51, 51, 0.5);
}

.list_item {
  height: 40px;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 20px;
  }
}
</style>