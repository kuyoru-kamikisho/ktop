<template>
  <div class="ktop-app">
    <div class="item cpu">{{ cpu }}%</div>
    <div class="item memory">{{ memory }}%</div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import useApp from "./store/useApp";
import {registerWindowMove} from "./utils/pageToWindow/registerWindowMove";

const cpu = ref('0')
const memory = ref('0')
const {appConfig} = storeToRefs(useApp());

const backgroundColor = computed(() => appConfig.value?.main.bgcolor)
const backgroundCpu = computed(() => appConfig.value?.cpu.bgcolor)
const backgroundMemory = computed(() => appConfig.value?.memory.bgcolor)
const cpuTextColor = computed(() => appConfig.value?.cpu.textcolor)
const memoryTextColor = computed(() => appConfig.value?.memory.textcolor)
const cpuTextSize = computed(() => appConfig.value?.cpu.textsize)
const memoryTextSize = computed(() => appConfig.value?.memory.textsize)
const cpuTextWeight = computed(() => appConfig.value?.cpu.textbold)
const memoryTextWeight = computed(() => appConfig.value?.memory.textbold)
const cpuTextFamily = computed(() => appConfig.value?.cpu.texttypes)
const memoryTextFamily = computed(() => appConfig.value?.memory.texttypes)
const cpuOpacity = computed(() => appConfig.value?.cpu.opacity)
const memoryOpacity = computed(() => appConfig.value?.memory.opacity)

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
.ktop-app {
  user-select: none;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: v-bind(backgroundColor);

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1 1 auto;
  }

  .cpu {
    color: v-bind(cpuTextColor);
    background-color: v-bind(backgroundCpu);
    font-size: v-bind(cpuTextSize);
    font-weight: v-bind(cpuTextWeight);
    transition: .2s ease;
    font-family: v-bind(cpuTextFamily);
    opacity: v-bind(cpuOpacity);
    &:hover{

    }
  }

  .memory {
    color: v-bind(memoryTextColor);
    background-color: v-bind(backgroundMemory);
    font-size: v-bind(memoryTextSize);
    font-weight: v-bind(memoryTextWeight);
    transition: .2s ease;
    font-family: v-bind(memoryTextFamily);
    opacity: v-bind(memoryOpacity);
    &:hover{

    }
  }
}
</style>