<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <slot></slot>
      <button class="close-button" @click="close">关闭</button>
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
  padding: 20px;
  border-radius: 5px;
  height: 95%;
}
.close-button {
  position: absolute;
  bottom: 30px; /* 调整到你需要的位置 */
  right: 50px; /* 调整到你需要的位置 */
  z-index: 1000; /* 确保按钮在最上层 */
  background: #3f85ed; /* 背景 */
  border-radius: 5px;
  height: 30px;
  width: 70px;
  border: none; /* 无边框 */
  font-size: 16px; /* 调整字体大小 */
  color: white;
  cursor: pointer; /* 鼠标悬停时显示手形 */
}
</style>
