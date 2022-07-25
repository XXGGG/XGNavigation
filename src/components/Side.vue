<template>
    <n-tabs type="segment">

        <n-tab-pane name="Side_Add" tab="添加">
            <Side_Add />
        </n-tab-pane>
        <n-tab-pane name="setup" tab="设置">
            <Side_Setup />
        </n-tab-pane>
        <n-tab-pane name="Side_My" tab="我的">
            <Side_My />
        </n-tab-pane>
    </n-tabs>
</template>

<script setup lang='ts'>
import { } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'
import { NScrollbar } from 'naive-ui'

import Side_Add from './Side/Side_Add.vue'
import Side_My from './Side/Side_My.vue'
import Side_Setup from './Side/Side_Setup.vue'

</script>

<styles lang="scss" coped>
*::-webkit-scrollbar {
    display: none;
}
</styles>