<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <div class="modal-body">
        <slot></slot>
        <button class="close-button" @click="close">关闭</button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name:'Modal',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  /*height: 800px;*/
  background: rgba(0, 0, 0, 0.5);
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  position: relative;
  background: white;
  padding: 0px;
  border-radius: 5px;
  height: 95%;
  max-height: 95%; /* 控制最大高度 */
  overflow-y: auto; /* 允许垂直滚动 */

}
.modal-body {
  max-height: calc(100% - 40px); /* 减去关闭按钮的高度 */
  overflow-y: auto; /* 内容滚动 */
}

.close-button {
  position: absolute; /* 绝对定位 */
  bottom: 10px; /* 距离底部10px */
  right: 10px; /* 距离右边10px */
  z-index: 1000; /* 确保按钮在最上层 */
  background: #3f85ed; /* 背景 */
  border-radius: 5px;
  height: 25px;
  width: 70px;
  border: none; /* 无边框 */
  font-size: 14px; /* 调整字体大小 */
  color: white;
  cursor: pointer; /* 鼠标悬停时显示手形 */
}

</style>
