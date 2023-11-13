<template>
  <div class="k-tools">
    <component :is="view"></component>
  </div>
</template>

<script lang="ts" setup>
import KSites from "./KSites.vue";
import KRuns from "./KRuns.vue";
import KCron from "./KCron.vue";
import KProxy from "./KProxy.vue";
import KSetting from "./KSetting.vue";
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";
import {computed} from "vue";

const {mode} = storeToRefs(useApp())
const view = computed(() => {
  switch (mode.value) {
    case 0:
      return KSites;
    case 1:
      return KRuns;
    case 2:
      return KCron;
    case 3:
      return KProxy;
    case 4:
      return KSetting;
    default:
      return KSites
  }
})
</script>

<style lang="scss">

</style>