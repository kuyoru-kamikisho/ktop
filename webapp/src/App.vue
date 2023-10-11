<template>
  <div>
    <div>{{ cpu }}%</div>
    <div>{{ memory }}%</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const cpu = ref('0')
const memory = ref('0')
onMounted(() => {
  window.electronAPI.cpuUsage((e, c: number, m: number) => {
    cpu.value = (100 * c).toFixed(0)
    memory.value = (100 * m).toFixed(0)
  })
})
</script>

<style lang="scss">

</style>