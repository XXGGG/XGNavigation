<template>
    <n-el class="SearchStyle" :style="`transform: scale(${scale});`">
        <div class="SearchEngingStyle" @click="SwitchModal_button">
            <img :src="SearchEngine.img">
        </div>
        <input type="text" :placeholder="SearchEngine.placeholder" v-model="SearchContent" @keydown.enter="Search">
        <n-modal v-model:show="SwitchModal_active" transform-origin="center">
            <n-card
                style="width: 90%; max-width: 800px;min-width:300px;"
                :bordered="false" size="small" role="dialog" aria-modal="true">
                <n-grid x-gap="6" y-gap="6" :cols="6">
                    <n-gi v-for="item in EngineList" :key="item.name" class="Enging_item" @click="Switch_Engine(item)">
                        <img :src="item.img">
                        {{ item.label }}
                    </n-gi>
                </n-grid>
            </n-card>
        </n-modal>
    </n-el>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { NEl } from 'naive-ui'
import { NModal, NCard } from 'naive-ui'
import { NGrid, NGi } from 'naive-ui'
import { EngineList } from '../assets/EngineList' //搜索引擎列表
import { mainStore } from '../store/index'
import { storeToRefs } from 'pinia';
const store = mainStore() //引进Pinia仓库
let { XGN_SET } = storeToRefs(store)// 解构出来【设置样式

//搜索引擎的默认设置
let SearchEngine: any = ref(XGN_SET.value.Search_Engine)
//搜索引擎的切换窗口的状态
let SwitchModal_active = ref(false)
//搜索引擎切换窗口的打开按钮
const SwitchModal_button = () => {
    SwitchModal_active.value = true
}
//切换搜索引擎
const Switch_Engine = (item: object) => {
    SearchEngine.value = item
    XGN_SET.value.Search_Engine = item
    SwitchModal_active.value = false
}
//搜索！
let SearchContent = ref('')
const Search = () => {
    window.open(SearchEngine.value.key + SearchContent.value);
    SearchContent.value = "";
}

// 搜索框大小
let scale = ref('1')

</script>

<style lang='scss' scoped>
.SearchStyle {
    width: 90%;
    max-width: 800px;
    min-width: 300px;
    height: 24%;
    min-height: 50px;
    display: flex;
    border-radius: 6px;
    background-color: var(--body-color);
    box-shadow: 2px 2px 16px -6px #333;
    overflow: hidden;
}

input {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    background-color: var(--body-color);
    color: var(--text-color);
    padding-right: 10px;
}

input:focus {
    outline: none;
}

input:hover {
    border: none;
    box-sizing: border-box;
}

.SearchEngingStyle {
    width: 70px;
    height: 100%;
    background-color: var(--body-color);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
        height: 50%;
    }
}

.Enging_item {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        border: 2px solid rgb(110, 169, 205);
    }

    img {
        width: 36%;
    }
}
</style>