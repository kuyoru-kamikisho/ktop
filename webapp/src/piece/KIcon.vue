<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';

defineProps({
  path: {type: String, required: true}
})
</script>

<style>

</style>