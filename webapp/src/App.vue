<template>
  <div>
    {{ cpu }}%
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const cpu = ref('0')
onMounted(() => {
  window.electronAPI.cpuUsage((e, v: number) => {
    cpu.value = (100 * v).toFixed(0)
  })
})
</script>

<style lang="scss">

</style>