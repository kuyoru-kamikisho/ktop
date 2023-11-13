<template>
  <div class="ktop-app">
    <div class="item mts">
      <svg-icon size="14" type="mdi" :path="mdiSwordCross "></svg-icon>
    </div>
    <i class="divider ver"></i>
    <div class="item cpu">{{ cpu }}</div>
    <i class="divider ver"></i>
    <div class="item memory">{{ memory }}</div>
  </div>
  <div class="ktop-plugins">
      <k-menus></k-menus>
    <div class="tool-window">
      <k-tools></k-tools>
      <k-infos></k-infos>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiSwordCross} from '@mdi/js';
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import useApp from "./store/useApp";
import {registerWindowMove} from "./utils/pageToWindow/registerWindowMove";
import KMenus from "./piece/KMenus.vue";
import KTools from "./piece/KTools.vue";
import KInfos from "./piece/KInfos.vue";

const cpu = ref('0')
const memory = ref('0')
const {appConfig} = storeToRefs(useApp());

onMounted(() => {
  window.electronAPI.cpuUsage((e: any, c: number, m: number) => {
    cpu.value = (100 * c).toFixed(0)
    memory.value = (100 * m).toFixed(0)
  })
  window.electronAPI.appConfig((e: any, o: any) => {
    appConfig.value = o
  })
  registerWindowMove()
})
</script>

<style lang="scss">
$app-color: rgba(0, 0, 0, 0.48);
$monitor-width: 96px;
$monitor-height: 28px;
$divider-color: rgba(255, 255, 255, 0.12);
$font-color: rgba(255, 237, 225, 0.95);
$font-size: 12px;
$hvc-color: rgba(252, 32, 64, 0.95);

.divider {
  display: block;
  background-color: $divider-color;

  &.ver {
    width: 1px;
    height: 100%;
  }

  &.hor {
    height: 1px;
    width: 100%;
  }
}

.ktop-app {
  user-select: none;
  display: flex;
  width: $monitor-width;
  height: $monitor-height;
  color: $font-color;
  font-size: $font-size;
  background-color: $app-color;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1 1 auto;
  }

  .mts {
    width: 22%;

    &:hover {
      color: $hvc-color;
    }
  }

  .cpu, .memory {
    width: 38%;
    transition: .2s ease;
  }
}

.ktop-plugins {
  font-size: $font-size;
  color: $font-color;
  display: flex;
  margin-top: 2px;
  height: calc(100% - 30px);

  .k-menu,
  .k-tools,
  .k-infos {
    background-color: $app-color;
  }
  .k-menu{
    width: $monitor-width;
  }
  .tool-window{
    width: calc(100% - $monitor-width);
    padding-left: 2px;
    display: flex;
    flex-direction: column;
  }
  .k-tools{
    height: calc(100% - 34px);
  }
  .k-infos{
    margin-top: 2px;
    height: 32px;
  }
}
</style>