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
const backgroundColor = computed(() => appConfig.value?.backgroundColor)
const backgroundCpu = computed(() => appConfig.value?.backgroundCpu)
const backgroundMemory = computed(() => appConfig.value?.backgroundMemory)
const cpuTextColor = computed(() => appConfig.value?.cpuTextColor)
const memoryTextColor = computed(() => appConfig.value?.memoryTextColor)

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
  }

  .memory {
    color: v-bind(memoryTextColor);
    background-color: v-bind(backgroundMemory);
  }
}
</style>