<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>购物车</BreadcrumbItem>
      <BreadcrumbItem>订单确认</BreadcrumbItem>
    </Breadcrumb>
    <div class="main-wrapper">
      <div id="orderinfo" style="width:72mm">
        <h2>订单信息</h2>
        <table-render :columns="columns" :data="data"></table-render>
        <div class="inputArea">
          <p>客户姓名：</p>
          <input class="custom-placeholder"  v-model="nickname" placeholder="输入客户姓名">
          <p>所选位置：</p>
          <select class="select" v-model="table_name" @change="DeliverData">
            <option disabled value="" >请选择一个座位</option>
            <option v-for="option in options" :key="option.table_name" :value="option.table_id" :autofocus="true" >
              {{ option.table_name }}
            </option>
          </select>
<!--          <p>所选位置：</p>-->
<!--          <input class="custom-placeholder"  v-model="table_name" placeholder="输入座位">-->
          <p>联系电话：</p>
          <input class="custom-placeholder"  v-model="mobile" placeholder="输入联系电话">
          <p>简短要求：</p>
          <textarea class="custom-placeholder"  v-model="notes"  placeholder="输入对菜品要求"></textarea>
        </div>
      </div>
       <Button class="button" type="primary" @click="submitOrder">确定</Button>
    </div>

    <!--    <Button type="primary" v-print="print">打印</Button>-->
  </Content>
</template>

<script>
import TableRender from '../components/table-render/table.vue';
import Vue from 'vue'
import printNB from 'vue-print-nb'
export default {
  name: "OrderConfirm",
  data () {
    return {
      columns: [
        {
          title: '菜名',
          key: 'food_name',
          render: (h, { row, index }) => {
            return h('span', row.food_name)
          }
        },
        {
          title: '单价',
          key: 'price',
          render: (h, { row, index }) => {
            return h('span', Math.round(row.price))
          }
        },
        {
          title: '数量',
          key: 'num',
          render: (h, { row, index }) => {
            return h('div', row.num);
          }
        },
       ],
      data: [],
      totalPrice: 0,
      nickname: '',
      table_name: '',
      table_id: '',
      mobile: '',
      notes: '',
      foods: [],
      options: [],
      restaurant_id: 4,

    // isFirstEnter:false // 是否第一次进入，默认false
    }
  },
  components: {
    TableRender,
    // Editwindow,
  },
  methods: {
    getData() {
      this.data = this.$route.query.data
    },
    updateData() {
      /* 六和居 */
      this.axios.get('/api/TableViewset')
        .then(res => {
          if (res.status == '200') {
            console.log(res)
            this.$set(this, 'options', res.data)
          } else {
            console.log("获取座位数据失败")
          }

        })
        .catch(err => {
          console.log('err: ', err)
          if (err.status == '400') {
            console.log("获取座位数据失败")
          }
        });

      /* dangerous!! */
      if (this.timeout)
        setTimeout(this.updateData.bind(this), 10000);
    },
    DeliverData() {
      this.table_id = this.table_name
    },
    submitOrder() {
       this.$Modal.confirm({
        title:'提交定单',
        content:'确认要提交定单？',
        loading:true,
        onOk: () => {
          var _this = this;
          this.axios.post('/api/restaurant/orders/4/' + _this.table_id, {
            foods:_this.data,
            notes: _this.notes,
            mobile: _this.mobile,
            nickname: _this.nickname,
            tableID:_this.table_id,
            restaurantId:_this.restaurant_id,
          })
            .then(function(response) {
              _this.$Modal.remove();
              console.log(response);
              _this.$Message.success('添加成功！');
              // sessionStorage.removeItem('cachedata');
              // sessionStorage.removeItem('selectdishitems')
            })
            .catch(function(error) {
              _this.$Modal.remove();
              _this.$Message.error('添加失败！');
              console.log(error);
            });
        }
      });


    }
  },

  watch: {

  },
  created() {
    this.getData(),
    this.updateData()
  },
  mounted() {

  },
}

</script>

<style scoped>
.main-wrapper {
  position: relative;
  min-height: 500px;
  width: 76mm;
  height: auto;
  border: 1px solid #dddee1;
  border-color: #e9eaec;
  border-radius: 4px;
  padding: 0px;
  background: #fff;
  font-size: 12px;
  box-sizing: border-box;
}
.button {
  margin-top: 10px;
  /*position:relative;*/
  left: 40%;
  margin-right: auto;
  margin-left:auto;
}
.inputArea{
  display: grid;
  font-size: 16px;
  margin-top: 5px;
  gap: 5px
}
.custom-placeholder {
  color: #68fd01; /* 设置字体颜色 */
  font-size: 14px; /* 设置字体大小 */
}

</style>
