<template>
  <ul class="k-menu">
    <li :class="{active:i.active}" v-for="(i,x) in menus" :key="x" @click="useMenu().chooseM(x)">
      <svg-icon size="16" type="mdi" :path="i.icon"></svg-icon>
      <span class="ctxt" v-text="i.title"></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {storeToRefs} from "pinia";
import useMenu from "../store/useMenu";

const {menus} = storeToRefs(useMenu())
</script>

<style lang="scss">
.k-menu {
  padding: 8px 0;

  li {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    cursor: pointer;
    position: relative;

    &::before {
      width: 100%;
      height: 100%;
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      z-index: -1;
      background-color: rgba(34, 34, 35, 0.5);
      transition: transform .32s ease;
      transform-origin: right center;
      transform: scaleX(0);
    }

    &::after {
      position: absolute;
      background-color: yellow;
      height: 100%;
      left: 0;
      content: "";
      width: 2px;
      transition: transform .2s ease;
      transform-origin: center bottom;
      transform: scaleY(0);
    }

    &:hover, &.active {
      &::after {
        transform-origin: center top;
        transform: scaleY(1);
      }

      &::before {
        transform-origin: center left;
        transform: scaleX(1);
      }
    }
  }

  .ctxt {
    margin-left: 10px;
  }
}
</style>