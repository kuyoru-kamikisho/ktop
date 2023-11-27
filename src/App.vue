<template>
  <div class="ktop-app">
    <div @click="sword" class="item mts">
      <svg-icon size="14" type="mdi" :path="mdiSwordCross "></svg-icon>
    </div>
    <i class="divider ver"></i>
    <div class="item cpu">{{ cpu }}</div>
    <i class="divider ver"></i>
    <div class="item memory">{{ memory }}</div>
  </div>
  <div v-if="exPro" class="ktop-plugins">
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
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import useApp from "./store/useApp";
import KMenus from "./piece/KMenus.vue";
import KTools from "./piece/KTools.vue";
import KInfos from "./piece/KInfos.vue";

const cpu = ref('0')
const memory = ref('0')
const {appConfig, searchEngines, sites, exPro} = storeToRefs(useApp());

watch(exPro, n => {
  window.electronAPI.changeExPro(n)
})

onMounted(() => {
  window.electronAPI.cpuUsage((e: any, c: number, m: number) => {
    cpu.value = (100 * c).toFixed(0)
    memory.value = (100 * m).toFixed(0)
  })
  window.electronAPI.windowBlur((e: any, name: string) => {
    exPro.value = false
  })
  window.electronAPI.appConfig((e: any, o: any) => {
    appConfig.value = o
  })
  window.electronAPI.loadSearchEngine().then((o: any) => {
    searchEngines.value = o
  })
  window.electronAPI.getSites().then((o: any) => {
    if (o[0])
      o[0].active = true
    sites.value = o
  })
})

function sword() {
  exPro.value = !exPro.value
}
</script>

<style lang="scss">
$app-color: rgba(0, 0, 0, 0.42);
$monitor-width: 96px;
$monitor-height: 28px;
$divider-color: rgba(255, 255, 255, 0.12);
$font-color: rgba(255, 237, 225, 0.96);
$font-size: 12px;
$hvc-color: rgba(252, 32, 64, 0.96);

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
    -webkit-app-region: no-drag;

    &:hover {
      color: $hvc-color;
    }
  }

  .divider, .cpu, .memory {
    -webkit-app-region: drag;
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

  .k-menu {
    width: $monitor-width;
  }

  .tool-window {
    width: calc(100% - $monitor-width);
    padding-left: 2px;
    display: flex;
    flex-direction: column;
  }

  .k-tools {
    padding: 12px;
    height: calc(100% - 58px);
  }

  .k-infos {
    margin-top: 2px;
    height: 32px;
    font-size: 11px;
  }
}

.k-fct-block {
  background-color: rgba(0, 0, 0, 0.72);
  margin: 4px 8px 4px 2px;
  width: 9.2em;
  box-sizing: border-box;
  letter-spacing: .2em;
  padding: 0 0 0 1.37em;
  display: inline-block;
  transition: all .2s ease;

  &:hover {
    color: black;
    background-color: #bfff21;
  }
}
</style>