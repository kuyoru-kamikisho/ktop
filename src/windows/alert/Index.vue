<template>
  <div class="index-bg-1"></div>
  <div class="index-bg-2">
    <div class="title">
      <span>提示标题</span>
    </div>
    <div class="content">
      <p>文本内容</p>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.index-bg-1 {
  height: 100%;
  background-color: #ff133a;
}

.index-bg-2 {
  top: 0;
  left: 5px;
  width: calc(100% - 29px);
  height: calc(100% - 20px);
  position: absolute;
  background-color: #04040d;
  padding: 10px 12px;

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