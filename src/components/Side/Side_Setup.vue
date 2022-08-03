<template>
    <n-space vertical :size="20" style="margin:10px 0">
        <n-card title="壁纸" hoverable>
            <div class="wallpaper_preview"
                :style="`background-color:${store.XGN_SET.Bg_Color} ;background-image:url(${store.XGN_SET.Bg_Img})`"
                @click="showChangeWallpaperModal">
                <n-button size="large" color="#3939397a" class="show_change_wallpaer_modal" style="color:aliceblue">
                    更换壁纸 </n-button>
            </div>
            <n-modal v-model:show="ChangeWallpaperModal_state">
                <n-card style="width: 900px;height: 700px; overflow: hidden;" :bordered="false" size="huge"
                    role="dialog">
                    <Side_Setup_Wallpaer />
                </n-card>
            </n-modal>
        </n-card>

        <n-card title="布局" hoverable>

            <div class="layout_grid">
                <div>
                    <n-icon :component="Table" class="layout_icon flex" />
                </div>
                <div>
                    <div class="setup_layout">
                        <div class="setup_layout_cols_slider">
                            <n-slider v-model:value="store.XGN_SET.Layout_Cols" :marks="marks_cols" :step="1" :min="1"
                                :max="8" />
                        </div>
                    </div>
                </div>
                <div>
                    <div class="setup_layout">
                        <div class="setup_layout_rows_slider">
                            <n-slider v-model:value="store.XGN_SET.Layout_Rows" :marks="marks_rows" :step="1" :min="1"
                                :max="4" vertical reverse />
                        </div>
                    </div>
                </div>
                <div class="layout_demo" :style="`
                grid-template-columns: repeat(${XGN_SET.Layout_Cols},42px);
                grid-template-rows: repeat(${XGN_SET.Layout_Rows},50px`">
                    <div v-for="i in (XGN_SET.Layout_Rows * XGN_SET.Layout_Cols)">

                    </div>
                </div>
            </div>


        </n-card>
        <n-card title="视图" hoverable>
            <n-space vertical justify="space-around">
                <n-space justify="space-between">
                    显示搜索栏
                    <n-switch v-model:value="store.XGN_SET.View_Search_Show" />
                </n-space>
                <n-space justify="space-between">
                    显示图标名称
                    <n-switch v-model:value="store.XGN_SET.View_BookMark_Title_Show" />
                </n-space>
                <n-space justify="space-between">
                    显示书签
                    <n-switch v-model:value="store.XGN_SET.View_BookMark_Show" />
                </n-space>
            </n-space>
        </n-card>
        <n-card title="暗黑模式" hoverable>
            <n-space vertical>
                <n-button-group size="large" style="width:100%">
                    <n-button ghost :type="XGN_SET.Dark_Mode == 'dark' ? 'primary' : undefined"
                        @click="ChangeTheme('dark')">
                        <template #icon>
                            <n-icon :component="MoonStars" />
                        </template>
                        暗
                    </n-button>
                    <n-button ghost :type="XGN_SET.Dark_Mode == 'light' ? 'primary' : undefined"
                        @click="ChangeTheme('light')">
                        <template #icon>
                            <n-icon :component="Sun" />
                        </template>
                        光
                    </n-button>
                    <n-button ghost :type="XGN_SET.Dark_Mode == 'auto' ? 'primary' : undefined"
                        @click="ChangeTheme('auto')">
                        <template #icon>
                            <n-icon :component="DeviceAnalytics" />
                        </template>
                        跟随系统
                    </n-button>
                    <n-button ghost :type="XGN_SET.Dark_Mode == 'sky' ? 'primary' : undefined"
                        @click="ChangeTheme('sky')">
                        <template #icon>
                            <n-icon :component="Sunset" />
                        </template>
                        跟随早晚
                    </n-button>
                    <n-button ghost :type="XGN_SET.Dark_Mode == 'time' ? 'primary' : undefined"
                        @click="ChangeTheme('time')">
                        <template #icon>
                            <n-icon :component="Clock" />
                        </template>
                        自定义
                    </n-button>
                </n-button-group>
                <n-collapse-transition :show="XGN_SET.Dark_Mode == 'time'">
                    <n-card v-show="XGN_SET.Dark_Mode == 'time'" title="自定义">
                        <n-form ref="formRef" inline :label-width="40" label-placement="left" size="large"
                            label-width="auto" class="flex">
                            <n-form-item label="深色">
                                <n-time-picker :seconds="[0]" :default-formatted-value="XGN_SET.Dark_Start_Time"
                                    @confirm="select_dark_time_start" />
                            </n-form-item>
                            <n-form-item label="浅色">
                                <n-time-picker :seconds="[0]" :default-formatted-value="XGN_SET.Dark_End_Time"
                                    @confirm="select_dark_time_end" />
                            </n-form-item>
                        </n-form>
                    </n-card>
                </n-collapse-transition>
            </n-space>

        </n-card>
    </n-space>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { Table } from '@vicons/tabler'
import { MoonStars, Sun, DeviceAnalytics, Sunset, Clock } from '@vicons/tabler'
import { NSpace, NCard, NButton, NButtonGroup, NIcon, NModal, NSwitch, NCollapseTransition } from 'naive-ui'
import { NSlider } from 'naive-ui'
import { NTimePicker } from 'naive-ui'
import { NForm, NFormItem } from 'naive-ui'
import { mainStore } from '../../store/index'
import { storeToRefs } from 'pinia';
import Side_Setup_Wallpaer from './Side_Setup/Side_Setup_Wallpaer.vue';
//引进Pinia仓库
const store = mainStore()
let { XGN_SET } = storeToRefs(store)// 解构出来


//【壁纸】
//展示改变壁纸的拟态窗
let ChangeWallpaperModal_state = ref(false)
const showChangeWallpaperModal = () => {
    ChangeWallpaperModal_state.value = true
}

//【布局】
let marks_rows = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
}
let marks_cols = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8"
}

//【视图】


//【暗黑模式】
//自定义暗黑时间
//设置暗黑模式
const ChangeTheme = (model: string) => {
    store.XGN_SET.Dark_Mode = model
}
const select_dark_time_start = (value: number) => {
    let date = new Date(value)
    store.XGN_SET.Dark_Start_Time = date.toLocaleTimeString()
}
const select_dark_time_end = (value: number) => {
    let date = new Date(value)
    store.XGN_SET.Dark_End_Time = date.toLocaleTimeString()
}


</script>

<style lang='scss' scoped>
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
    }

    .show_change_wallpaer_modal {
        display: none;
    }
}



.layout_grid {
    width: 100%;
    // background-color: gray;
    aspect-ratio: 10/2;
    display: grid;
    grid-template-columns: 78px 1fr;
    grid-template-rows: 78px 1fr;
    position: relative;

    .layout_icon {
        width: 80%;
        height: 80%;
        font-size: 50px;
    }

    .layout_demo {
        display: grid;
        grid-gap: 10px;

        // margin-top: 10px;
        div {
            box-sizing: border-box;
            border: 1px solid rgb(26, 214, 142);
            aspect-ratio: 1;
            border-radius: 5px;
        }
    }
}

.setup_layout {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .setup_layout_cols_slider {
        // width: 78%;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
    }

    .setup_layout_rows_slider {
        height: 240px;
        box-sizing: border-box;
        padding: 10px;
    }

    .setup_layout_number {
        width: 16%;
    }
}
</style>