<template>
  <k-inputer @keydown.tab.stop="tabKey"
             class="k-sites searcher"
             place-holder="Ciallo～(∠·ω< )⌒★"
             @unFocus="useApp().resetMsgbox()"
             v-model="searchText"
             @keyup.enter="goSearch"
             @click="nowSearchEngine">
    <template #append-icon>
      <svg-icon size="16" type="mdi" :path="mdiGoogle" v-if="searchMode===0"></svg-icon>
      <i-baidu v-else-if="searchMode===1"/>
      <svg-icon size="16" type="mdi" :path="mdiEthereum" v-else></svg-icon>
    </template>
  </k-inputer>
  <div class="k-sites sites">
    <ul class="group-item">
      <li :class="{active:i.active}" @click="mapTo(i)" v-for="(i,x) in sites" :key="x">
        <span v-text="i.group"></span>
      </li>
    </ul>
    <template v-if="gactive">
      <ul @mouseleave="useApp().resetMsgbox()" class="sites-item">
        <li v-for="(j,y) in gactive.sites"
            :key="y"
            class="c-pointer k-fct-block"
            :class="j.class"
            @mouseenter="msgUrl(j.url)"
            @click="openLink(j.url)">
          <span v-text="j.name"></span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts" setup>
import KInputer from "./KInputer.vue";
import {storeToRefs} from "pinia";
import useApp from "../store/useApp";
import IBaidu from "./IBaidu.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiGoogle, mdiEthereum} from '@mdi/js';
import {computed, onMounted, onUnmounted} from "vue";

const {searchMode, searchEngines, searchText, sites, msgBox} = storeToRefs(useApp())

const gactive = computed(() => sites.value.find(o => o.active))

onMounted(() => {
  document.addEventListener('keydown', rgTabKey)
})
onUnmounted(() => {
  document.removeEventListener('keydown', rgTabKey)
})

function tabKey(e: KeyboardEvent) {
  e.preventDefault()
  useApp().shiftSearchEngine()
}

function nowSearchEngine() {
  useApp().shiftSearchEngine(-1)
}

function msgUrl(s: string) {
  msgBox.value = s
}

function openLink(s: string) {
  window.electronAPI.openurl(s)
}

function mapTo(o: any) {
  sites.value.forEach(a => a.active = false)
  o.active = true
}

function goSearch() {
  if (searchText.value.length > 0) {
    window.electronAPI.openurl(searchEngines
            .value[searchMode.value]
            .url +
        encodeURIComponent(searchText.value))
  }
}

function rgTabKey(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const x = sites.value.findIndex(o => o.active === true);
    if (x > -1) {
      sites.value[x].active = false
      if (x === sites.value.length - 1) {
        sites.value[0].active = true
      } else {
        sites.value[x + 1].active = true
      }
    }
  }
}
</script>

<style lang="scss">
.k-sites {
  &.searcher {
  }

  &.sites {
    overflow: auto;
    max-height: 186px;
  }

  .sites-item {
    max-height: 154px;
    overflow: auto;
  }

  .group-item {
    display: flex;
    padding: 12px 0 4px 0;

    li {
      font-weight: bold;
      word-break: keep-all;
      padding: 0 10px;
      margin: 0 2px;
      background-color: rgba(0, 0, 0, 0.42);
      color: rgba(251, 253, 253, 0.54);

      &.active {
        background-color: rgba(0, 0, 0, 0.68);
        color: rgba(221, 255, 0, 0.9);
      }
    }
  }
}
</style>