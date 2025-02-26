<!-- Cart.vue -->
<template>
  <div class="app-container" id="app">
    <!-- 顶部banner -->
<!--    <div class="banner-box"><img src="http://autumnfish.cn/static/fruit.jpg" alt="" /></div>-->
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <span>🏠</span>
      /
      <span>购物车</span>
    </div>
    <!-- 购物车主体 -->
    <div class="main" v-if="cartItems.length>0">
      <div class="table">
        <!-- 头部 -->
        <div class="thead">
          <div class="tr">
            <div class="th">选中</div>
            <div class="th">菜名</div>
            <div class="th">图片</div>
            <div class="th">单价</div>
            <div class="th">个数</div>
            <div class="th">小计</div>
            <div class="th">操作</div>
          </div>
        </div>
        <!-- 身体 -->
        <div class="tbody">
          <div class="tr" :class="{active:item.isChecked}" v-for="(item,index) in cartItems" :key="item.food_id">
            <div class="td"><input type="checkbox" v-model="item.isChecked" /></div>
            <div class="td">{{item.food_name}}</div>
            <div class="td"><img :src="item.image" alt="" /></div>
            <div class="td">{{Math.round(item.price)}}</div>
            <div class="td">
              <div class="my-input-number">
                <button :disabled="item.num <=0 " class="decrease" @click="sub(item.food_id)"> - </button>
                <span class="my-input__inner">{{item.num}}</span>
                <button class="increase" @click="add(item.food_id)"> + </button>
              </div>
            </div>
            <div class="td">{{item.price * item.num}}</div>
            <div class="td"><button @click="del(item.food_id)">删除</button></div>
          </div>

        </div>
      </div>
      <!-- 底部 -->
      <div class="bottom">
        <!-- 全选 -->
        <label class="check-all">
          <input type="checkbox" v-model="isAll" />
          全选
        </label>
        <div class="right-box">
          <!-- 所有商品总价 -->
          <span class="price-box">总价&nbsp;&nbsp;:&nbsp;&nbsp;¥&nbsp;<span class="price">{{totalPrice}}</span></span>
          <!-- 结算按钮 -->
          <button class="pay" @click="subOrder">下单( {{totalNum}} )</button>
        </div>
      </div>
    </div>
    <!-- 空车 -->
    <div class="empty" v-else>🛒还没有点菜呢</div>
  </div>
</template>

<script>
// import OrderInfo from '@/components/OrderInfo'
const defaultArr = [
  {
    id: 1,
    icon: './img/火龙果.png',
    isChecked: true,
    num: 2,
    price: 6,
  },
  {
    id: 2,
    icon: './img/荔枝.png',
    isChecked: false,
    num: 7,
    price: 20,
  },
]
export default {
  modal: true,
  name: 'Cart',
  // components: { // 注册子组件
  //   OrderInfo,
  // },

  data() {
    return {
      isChecked: false,
      showModal: true,
      // cartItems: [],
      // cartItems: JSON.parse(sessionStorage.getItem('cartData')) || defaultArr
      cartItems: JSON.parse(sessionStorage.getItem('cartData')) || []
    };
  },
  computed: {
    isAll: {
      get() {
        return this.cartItems.every(item => item.isChecked)
      },
      set(value) {
        this.cartItems.forEach(item => item.isChecked = value)
      }
    },
    totalPrice() {
      return this.cartItems.reduce((sum, item) => {
        if (item.isChecked) {
          return sum += item.price * item.num
        } else {
          return sum
        }
      }, 0)
    },
    totalNum() {
      return this.cartItems.reduce((sum, item) => {
        if (item.isChecked) {
          return sum += item.num
        } else {
          return sum
        }
      }, 0)
    }
  },
  watch: {
    cartItems: {
      deep: true,
      handler(newValue) {
        sessionStorage.setItem("cartData", JSON.stringify(newValue))
        this.DeliverData()
      }
    },
    isAll: {
      deep: true,
      handler(newValue) {
        this.totalNum = newValue
        this.DeliverData()
      }
    }
  },
  methods: {
    addItemToCart(item) {
      this.cartItems.push(item);
    },
    del(id) {
      this.cartItems = this.cartItems.filter(item => item.food_id != id)
    },
    add(id) {
      const fruit = this.cartItems.find(item => item.food_id === id)
      fruit.num++;
    },
    sub(id) {
      const fruit = this.cartItems.find(item => item.food_id === id)
      fruit.num--;
    },
    DeliverData() {
      let data = this.cartItems;
      let totalnum = this.totalNum;
      let showModal = this.showModal;
      this.$emit('UpdateDishData', data, totalnum, showModal);
    },
    subOrder(){
      const showModal = JSON.parse(sessionStorage.getItem('showModal'))
      this.$router.push({path:'OrderConfirm',query:{data: this.cartItems}})
      if (showModal === true) {
        this.showModal = false
      }
      this.DeliverData()
    },
  },
  created() {
    const cartData = JSON.parse(sessionStorage.getItem('cartData'))
    this.cartItems = cartData
  },
  // mounted() {
  //   const cartData = JSON.parse(sessionStorage.getItem('cartData'))
  //   this.cartItems = cartData
  // },
}
</script>

<style scoped>
.app-container {
  padding-bottom: 300px;
  width: 680px;
  margin-left: 16px;
}

.breadcrumb {
  margin-top: 15px;
  font-size: 16px;
  color: gray;
}
.table {
  width: 100%;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;
}
.thead{
   font-size: 16px;
}
.tbody{
  font-size: 14px;
}
.th {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  text-align: left;
  background: #cee5fc;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s ease;
}
.th {
  text-align: center;
}
.th,.td {
  position: relative;
  padding: 5px 5px;
  overflow-wrap: break-word;
  flex: 1;
}

.main,
.empty {
  border: 1px solid #f0f0f0;
  margin-top: 10px;
}
.tr {
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
}
.tr.active {
  background-color: #f5f7fa;
}
.td {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.table img {
  width: 50px;
  height: 50px;
}

button {
  outline: 0;
  box-shadow: none;
  color: #fff;
  background: #d9363e;
  border-color: #d9363e;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 5px;
}
button.pay {
  background-color: #3f85ed;
  margin-left: 20px;
  border-radius: 5px;
}

.bottom {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  border: 1px solid #f0f0f0;
  border-top: none;
  padding-left: 20px;
}
.right-box {
  display: flex;
  align-items: center;
}
.check-all {
  cursor: pointer;
}
.price {
  color: hotpink;
  font-size: 30px;
  font-weight: 700;
}
.price-box {
  display: flex;
  align-items: center;
}
.empty {
  padding: 20px;
  text-align: center;
  font-size: 30px;
  color: #909399;
}
.my-input-number {
  display: flex;
  text-align: center;
}
.my-input-number button {
  height: 20px;
  color: #333;
  text-align: center;
  border: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}
.my-input-number button:disabled {
  cursor: not-allowed!important;
}
.my-input-number .my-input__inner {
  height: 30px;
  width: 20px;
  line-height: 30px;
  text-align: center;
  padding: 0;
  border: none;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
}
.my-input-number span {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.my-input-number .decrease,
.my-input-number .increase {
  display: flex;
  width: 30px;
  height: 30px;
  text-align: center;
  background: #f5f7fa;
  color: #606266;
  cursor: pointer;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.my-input-number .decrease .disabled,
.my-input-number .increase .disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}



</style>
