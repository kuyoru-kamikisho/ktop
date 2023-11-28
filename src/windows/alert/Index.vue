<template>
  <transition name="expand-x-reverse">
    <div v-show="show_base_1" class="index-bg-1"></div>
  </transition>
  <transition name="expand-x-reverse">
    <div v-show="show_base_2" class="index-bg-2">
      <transition name="fade">
        <div v-show="show_text" class="inner">
          <div class="title">
            <span v-text="alertN?.title"></span>
          </div>
          <div class="content">
            <p v-text="alertN?.text"></p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";

let direction = ref<'close' | 'open'>()
const show_base_1 = ref(false)
const show_base_2 = ref(false)
const show_text = ref(false)
const alertN = ref()

watch(direction, n => {
  if (n === 'open') {
    show_base_1.value = true
    setTimeout(() => {
      show_base_2.value = true
      setTimeout(() => {
        show_text.value = true
      }, 240)
    }, 240)
  } else {
    show_text.value = false
    setTimeout(() => {
      show_base_2.value = false
      setTimeout(() => {
        show_base_1.value = false
      }, 240)
    }, 240)
  }
})

onMounted(() => {
  window.electronAPI.msgToRender((e: any, p: any) => {
    console.log(p)
  })
})
</script>

<style lang="scss">
.index-bg-1 {
  height: 100%;
  background-color: #ff133a;
}

.index-bg-2 {
  top: 0;
  left: 6px;
  width: calc(100% - 38px);
  height: calc(100% - 24px);
  position: absolute;
  background-color: #04040d;
  padding: 12px 16px;

  .title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 2px;
    white-space: nowrap;

    span {
      display: inline-block;
    }
  }

  .content {
    font-size: 12px;

    p {
      margin: 4px 0 0 0;
      line-height: 1.52em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      color: #c1ccd5;
    }
  }

  .title span, .content p {
    max-width: 95%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

#alert-window {
  overflow: hidden;
  color: white;
}
</style>