<template>
  <ul class="menu-group">
    <li v-for="(a,z) in runners" :key="z">
      <div v-ripple @click="groupActive(a)" @mouseenter="menuTip(a)" @mouseleave="useApp().resetMsgbox()"
           :class="{active:a.active}" class="group">
        <svg-icon v-if="a.active" type="mdi" :path="mdiUngroup"></svg-icon>
        <svg-icon v-else type="mdi" :path="mdiGroup"></svg-icon>
        <span v-text="a.rname"></span>
        <svg-icon class="menu-chevron" type="mdi" :path="mdiChevronDown"></svg-icon>
      </div>
      <div v-if="a.active" class="menu-item">
        <button v-for="(b,y) in a.mlist"
                class="item"
                @dblclick="runMenu(z,y)"
                @mouseenter="hoverBtn(b)"
                @mouseleave="useApp().resetMsgbox()"
                v-ripple
                :class="{running:b.running}"
                :key="y">
          <k-loading-circle size="16px" width="6" v-if="b.running"></k-loading-circle>
          <svg-icon v-else type="mdi" :path="mdiGamepadRight"></svg-icon>
          <span v-text="b.name"></span>
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiGroup, mdiGamepadRight, mdiUngroup, mdiChevronDown} from '@mdi/js';
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";
import {onMounted} from "vue";
import KLoadingCircle from "./KLoadingCircle.vue";

const {runners, msgBox} = storeToRefs(useApp())

function hoverBtn(o: any) {
  if (o.running)
    msgBox.value = '要想停止运行，请尝试鼠标双击此项或运行其他菜单'
  else
    msgBox.value = '通过鼠标双击来运行此程序'
}

function menuTip(o: any) {
  msgBox.value = o.active
      ? '点击收起菜单列表'
      : '点击展开菜单列表'
}

function groupActive(o: any) {
  o.active = !o.active
  menuTip(o)
}

/**
 * 执行
 * @param a1 第A组
 * @param a2 第A组中的第几个执行器
 */
function runMenu(a1: number, a2: number) {
  const r = runners.value[a1];
  const o = r.mlist[a2];
  if (o.running) {
    window.electronAPI.msgToMain({
      rung: a1,
      rune: a2,
      stop: true
    })
    if (o.send_off) {
      window.electronAPI.openAlertWindow()
      window.electronAPI.msgToMain({
        to: 1,
        title: r.rname + ':' + o.name,
        text: o.send_off
      })
    }
  } else {
    window.electronAPI.msgToMain({
      rung: a1,
      rune: a2
    })
    if (o.send_on) {
      window.electronAPI.openAlertWindow()
      window.electronAPI.msgToMain({
        to: 1,
        title: r.rname + ':' + o.name,
        text: o.send_on
      })
    }
  }
}

onMounted(() => {
  window.electronAPI.msgToRender((e: any, o: any) => {
    if (o.rung !== undefined) {
      runners.value[o.rung].mlist[o.rune].running = o.running;
      hoverBtn(o);
    }
  })
})
</script>

<style lang="scss">
$svg-size: 16px;

.menu-group {
  .group {
    display: flex;
    align-items: center;
    height: 32px;
    position: relative;
    padding: 0 10px;

    &.active {
      .menu-chevron {
        transform: rotate(180deg);
      }
    }
  }

  .menu-chevron {
    position: absolute;
    right: 0;
    transition: transform .28s;
  }

  .menu-item {
    button {
      padding: 0 10px;
      display: inline-grid;
      align-items: center;
      height: 26px;
      margin: 3px 4px;
      cursor: pointer;
      outline: none;
      border: none;
      background-color: #252842;
      color: white;
      font-size: 12px;
      letter-spacing: 2px;
      grid-template-areas:"prepend content append";
      grid-template-columns: max-content auto max-content;
      transition-property: box-shadow, transform, opacity, background;
      transition-duration: 0.28s;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        background-color: #313454;
      }

      &.running {
        background-color: #ff133a;
      }
    }
  }

  span {
    margin: 0 10px;
  }

  svg {
    width: $svg-size;
    height: $svg-size;
  }
}
</style>