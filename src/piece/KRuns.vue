<template>
  <ul class="k-runs list">
    <li class="item-cmd" :class="{processing:i.processing}" v-for="(i,x) in cmds" :key="x">
      <svg-icon @click="stopThis(i)" type="mdi" class="c-pointer icon-runanime" v-if="i.processing"
                :path="mdiStopCircleOutline"></svg-icon>
      <svg-icon @click="runThis(i)" type="mdi" class="c-pointer" v-else :path="mdiMotionPlayOutline"></svg-icon>
      <span class="cmd-name" v-text="i.name"></span>
      <span class="cmd-cmd" v-text="i.cmd"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiMotionPlayOutline, mdiStopCircleOutline} from '@mdi/js';
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";

const {cmds} = storeToRefs(useApp())

function runThis(o: any) {
  o.processing = true
  if (o.send) {
    window.electronAPI.openAlertWindow()
    window.electronAPI.msgToMain({
      to: 1,
      title: '执行命令',
      text: o.name
    })
  }
  window.electronAPI.runCmd(o.cmd).then(() => {
    o.processing = false
  })
}

function stopThis(o: any) {
  o.processing = false
}
</script>

<style lang="scss">
.k-runs {
  .cmd-cmd {
    color: #6c7c80;
    font-weight: 100;
    width: 152px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cmd-name {
    display: inline-block;
    width: 196px;
    margin: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-cmd {
    height: 36px;
    display: flex;
    padding: 0 12px;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    background-color: rgb(48 45 55 / 56%);
    margin: 0 0 8px 0;
    letter-spacing: 0.11em;
    transition: all .2s;

    &.processing {
      color: #ff092e;
    }

    &:active {
      color: #00ffc4 !important;
    }

    &:hover {
      color: #7cbcff;
      font-weight: bold;
      background-color: rgb(44, 44, 56);
    }
  }
}

.icon-runanime {
  animation: animeE2 .8s alternate infinite ease-in-out;
}

@keyframes animeE2 {
  from {
    color: #ff092e;
  }
  to {
    color: rgba(40, 24, 28, 0.93);
  }
}
</style>