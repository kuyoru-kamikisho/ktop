<template>
  <ul class="k-cron box">
    <li v-for="(i,x) in crons" :key="x">
      <div class="contains">
        <svg-icon @click="stopThis(i)" type="mdi" class="c-pointer icon-runanime" v-if="i.processing"
                  :path="mdiStopCircleOutline"></svg-icon>
        <svg-icon @click="runThis(i)" type="mdi" class="c-pointer" v-else :path="mdiMotionPlayOutline"></svg-icon>
        <span v-text="i.name"></span>
      </div>
      <svg-icon type="mdi" class="poper" v-if="i.processing" :path="mdiShuriken"></svg-icon>
      <i class="progress"></i>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiMotionPlayOutline, mdiStopCircleOutline, mdiShuriken} from '@mdi/js';
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";

const {crons, cmds} = storeToRefs(useApp())

function runThis(o: any) {
  o.processing = true
  window.electronAPI.getCronTime(o.time).then((s: string) => {
  })
}

function stopThis(o: any) {
  o.processing = false
}
</script>

<style lang="scss">
.k-cron {
  .contains {
    display: flex;
    align-items: center;
  }

  span {
    margin: 0 10px;
  }

  &.box {

  }

  .progress {
    position: absolute;
  }

  li {
    height: 36px;
    display: flex;
    padding: 0 12px;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    white-space: nowrap;
    background-color: rgb(48 45 55 / 56%);
    margin: 0 0 8px 0;
    letter-spacing: 0.11em;
    transition: all .2s;

    &:hover {
      svg {
        color: #9276ff;
      }

      background-color: rgb(44, 44, 56);
      box-shadow: 0 0 6px 2px rgba(146, 118, 255, 0.66);
    }
  }
}

.poper {
  width: 19px;
  height: 19px;
  color: #ff133a;
  animation: zpoper 2s infinite linear;
}

@keyframes zpoper {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>