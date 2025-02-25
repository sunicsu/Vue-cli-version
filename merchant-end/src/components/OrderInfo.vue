<template>
  <div class="grid-container">
    <div v-for="grid in grids" :key="grid" class="grid-item">
      <p style="color:Red;">{{grid.table_name}}</p>
      <p style="font-size: 18px">{{grid.station}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  data() {
    return {
      grids: []
    };
  },
  created() {
       this.axios.get('/api/TableViewset')
        .then(res => {
          if (res.status == '200') {
            console.log(res)
            this.grids = res.data
            } else {
          console.log("获取座位信息失败")
          }
        })
        .catch(err => {
          console.log('err: ', err)
          if (err.status == '400') {
            console.log("获取座位信息失败")
          }
        })
  }

}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 四列，每列宽度相等 */
  grid-auto-rows: 1fr; /* 行高自动分配，但这里设置为1fr意味着等分行高，为了根据屏幕高度自动调整，我们需要结合vh单位 */
  /* 为了根据屏幕高度自动调整行高，我们可以使用vh单位并设置grid-auto-rows为auto，然后通过容器高度限制和内部元素高度控制来实现动态分配 */
  height: calc(100vh - 64px); /* 例如：height: calc(100vh - 60px); 假设有60px的固定高度元素 */
  gap: 10px; /* 方格之间的间距 */
}

.grid-item {
  background-color: #b8ceef;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column; /* 使项目垂直排列 */
  align-items: center;
  font-size: 26px;
  justify-content: center;
  /* 为了使方格高度能够响应容器高度的变化，我们不为.grid-item设置固定高度 */
  box-sizing: border-box; /* 包括边框和内边距在内计算元素总宽度和高度 */
}
/* 为了使方格内容不溢出，并保持良好的视觉效果，可以设置最大宽度和高度，或者根据实际需求调整 */
.grid-item > * {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
