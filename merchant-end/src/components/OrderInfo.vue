<template>
  <div class="grid-container">
    <div class="grid-item" v-for="grid in grids" :key="grid" :class="{active: grid.status === true}">
      <p style="color:#4f2c2e; font-size: 22px">{{grid.table_name}}</p>
      <p style="font-size: 18px">{{grid.station}}</p>
      <button :class="{disabled: grid.status === false}" @click="openNumModal(grid.station, grid.table_name, grid.table_id)"> 点  餐 </button>
    </div>
<!--    <Modal style="width: 500px; height: 200px; display: flex" v-if="showModal" @close="showModal = false" visible=true>-->
<!--      <h2 slot="header">购物车</h2>-->
<!--      <Input> 请输入人数 </Input>-->
<!--    </Modal>-->
    <Modal width=720 v-model="showModal" @on-ok="addNum" :sk-closable="false" :closable="false" >
      <h2 slot="header">就餐人数：</h2>
      <Tooltip :content="canSelectNum" placement="right-start">
        <Input class="Input" placeholder="请输入您的就餐人数..." :autofocus="true" v-model.number="newEditedNum"></Input>
      </Tooltip>
    </Modal>
  </div>

</template>

<script>
export default {
  name: "OrderInfo",
  // components: { // 注册子组件
  //   Modal,
  //   Cart
  // },
  data() {
    return {
      grids: [],
      showModal: false,
      newEditedNum: '',
      canSelectNum: '',
      table_name: '',
      table_id: '',
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.canSelectNum = `${this.userInfo.name} 当前积分：${this.userInfo.score}`;
    // }, 2000);
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
  },
  methods:{
    openNumModal(station, table_name, table_id){
      let cart = JSON.parse(sessionStorage.getItem('cartData'))
      if (cart !== null && cart[0].tableName !== table_name) {
        // this.messageWarningFn('您要选择其它包间吗！')
        this.$Modal.confirm({
          title: '友情提示',
          content: '更换包间之前所点菜品将自动删除，您是要更换包间、重新点菜吗？',
          loading: true,
          onOk: () => {
            let _this = this;
            _this.$Modal.remove();
            sessionStorage.removeItem('cartData');
            this.showModal = true;
            this.table_name = table_name;
            this.table_id = table_id;
            this.canSelectNum = '这是'+ table_name + "，" + station + '，请正确选择人数，以免拥挤！'
          },
          onCancel: () => {
            let _this = this;
            _this.$Modal.remove()
          }
        })
      } else {
        this.showModal = true;
        this.table_name = table_name;
        this.table_id = table_id;
        this.canSelectNum = '这是'+ table_name + "，" + station + '，请正确选择人数，以免拥挤！'
      }

    },
    messageWarningFn (text) {
      this.$Message.warning(text)
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 1000)
    },
    addNum(){
      if (this.newEditedNum === 0) {
        this.messageWarningFn('请重新输入就餐人数！')
        return
      }
      else {
        this.$Modal.confirm({
          title: '确认人数',
          content: '是否确认就餐人数？',
          loading: true,
          onOk: () => {
            let _this = this;
            let num = _this.newEditedNum;
            let cart = JSON.parse(sessionStorage.getItem('cartData')) || []
            let index = cart.findIndex(v => v.food_id === 46)
            if (index === -1) {
              // 如果不存在，将人数添加到购物车,并设置数量为点选数量, 线上环境food_id是159，开发环境是46
              cart.push({tableName: _this.table_name, tableId: _this.table_id, food_id: 159, food_name: "小料、筷子", price: 6, num: num, isChecked: false})
            } else {
              // 如果存在，仅设置数量为点选数量
              cart[index].num = num
            }
            sessionStorage.setItem('cartData', JSON.stringify(cart));
            _this.messageWarningFn("就餐人数定好了，快去“后台点菜”页选择菜品吧！")
            _this.$Modal.remove()
          },
          onCancel: () => {
            let _this = this;
            _this.messageWarningFn("就餐人数不设置了吗？")
            _this.$Modal.remove()
          }
        })
        //   onOk: () => {
        //     var _this = this;
        //     let num = this.newEditedNum;
        //     this.$emit("inputtedUserNum", num)
        //     });
        //   }
        // });

    }
    }

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
  background-color: #c0c79e;
  border: 1px solid #9a9ca1;
  display: flex;
  flex-direction: column; /* 使项目垂直排列 */
  align-items: center;
  /*font-size: 26px;*/
  justify-content: center;
  /* 为了使方格高度能够响应容器高度的变化，我们不为.grid-item设置固定高度 */
  box-sizing: border-box; /* 包括边框和内边距在内计算元素总宽度和高度 */
}
.active {
  background-color: #acc53f;
}
/* 为了使方格内容不溢出，并保持良好的视觉效果，可以设置最大宽度和高度，或者根据实际需求调整 */
.grid-item > * {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
button{
  margin-top: 30px;
  background: #6ea551; /* 背景 */
  border-radius: 5px;
  height: 30px;
  width: 80px;
  border: none; /* 无边框 */
  font-size: 16px; /* 调整字体大小 */
  color: white;
  cursor: pointer; /* 鼠标悬停时显示手形 */
}
.disabled {
  background-color: #d3d1d1;
}

/deep/ .ivu-tooltip-inner {
  min-width: 400px !important;
  font-size: 14px;
}
/deep/ .ivu-tooltip-popper {
  min-width: 250px !important;
  font-size: 14px;
}


</style>
