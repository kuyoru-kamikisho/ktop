<template>
  <fieldset class="k-inputer">
    <input @focusout="emits('unFocus')" ref="input" :placeholder="placeHolder" v-model="vmmi" spellcheck="false"
           type="text">
    <div class="icon-field">
      <svg-icon class="c-pointer" @click="clear" size="16" type="mdi" :path="mdiWindowClose"></svg-icon>
      <slot name="append-icon"></slot>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiWindowClose} from '@mdi/js';

const emits = defineEmits(['update:modelValue', 'unFocus']);
const props = defineProps({
  modelValue: String,
  placeHolder: String
});
const input = ref()

const vmmi = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  }
})

function clear() {
  vmmi.value = ''
  input.value?.focus()
}
</script>

<style lang="scss">
.k-inputer {
  padding: 4px 10px;
  background-color: rgba(12, 12, 12, 0.23);
  border-color: rgba(255, 255, 255, 0.06);
  border-width: 1px;
  transition: all .2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > input {
    line-height: 16px;
    color: #fff8e7;
    font-size: 12px;
    letter-spacing: 0.16em;
    background-color: transparent;
    width: 87%;
    caret-color: #ff091e;
    caret-shape: block;
    transition: color .2s ease;

    &::selection {
      color: black;
      background-color: #ff7f27;
    }
  }

  .icon-field {
    width: 38px;
    height: 16px;
    display: flex;
    justify-content: space-between;
  }

  &:hover, &:focus-within {
    color: #ff092e;
    border-color: rgba(129, 253, 67, 0.86);
    box-shadow: 0 0 1px 0 rgba(115, 255, 0, 0.5);
  }

  &:focus-within {
    input {
      color: black;
    }

    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>