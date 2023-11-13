<template>
  <div class="k-infos">
    <svg-icon size="16" type="mdi" :path="mdiTextBoxEditOutline"></svg-icon>
    <span class="msg-box" v-text="msgBox"></span>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiTextBoxEditOutline} from '@mdi/js';
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";

const {msgBox} = storeToRefs(useApp())
</script>

<style lang="scss">
.k-infos {
  display: flex;
  align-items: center;
  padding: 0 12px;

  .msg-box {
    display: inline-block;
    max-width: 92%;
    text-overflow: ellipsis;
    margin-left: 8px;
    overflow: hidden;
  }
}
</style>