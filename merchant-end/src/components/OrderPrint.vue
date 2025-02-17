<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>订单打印</BreadcrumbItem>
    </Breadcrumb>
    <div class="main-wrapper">
      <div id="orderinfo" style="width:72mm">
        <h2>订单信息</h2>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">订单号：{{orderitems.order_id}}，房间：{{orderitems.table_name}}</div>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">客户姓名：{{orderitems.nickname}}</div>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">联系电话：{{orderitems.mobile}}</div>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">总价：{{totalPrice}}</div>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">客户要求：{{orderitems.notes}}。</div>

        <table-render :columns="columns" :data="data"></table-render>
      </div>
      <Button class="button" type="primary" v-print="'#orderinfo'">打印</Button>
      <Button class="button" type="primary" @click="modifyModal">修改</Button>
    </div>

<!--    <Button type="primary" v-print="print">打印</Button>-->
  </Content>
</template>

<script>
import TableRender from '../components/table-render/table.vue';
import Vue from 'vue'
import printNB from 'vue-print-nb'
export default {
  name: "OrderPrint",
  data () {
    return {
      columns: [
        {
          title: '菜名',
          key: 'food_name',
          render: (h, { row, index }) => {
            return h('span', row.food.food_name)
          }
        },
        {
          title: '单价',
          key: 'price',
          render: (h, { row, index }) => {
            return h('span', row.food.price)
          }
        },
        {
          title: '数量',
          key: 'num',
          render: (h, { row, index }) => {
            let edit;

            // 当前行为聚焦行时
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: row.num
                },
                on: {
                  input: (event) => {
                    this.editNum = event.target.value;
                  }
                }
              })];
            } else {
              edit = row.num;
            }

            return h('div', [
              edit
            ]);
          }
        },
       ],
      data: [],
      orderitems: [],
      totalPrice: 0,
      // isFirstEnter:false // 是否第一次进入，默认false
    }
  },
  components: {
    TableRender,
    // Editwindow,
  },
  methods: {
    getData() {
      this.data = this.$route.query.data.detail
      this.orderitems = this.$route.query.data
      this.totalPrice = this.orderitems.total_price
    },
    modifyModal () {
      this.$router.push({path:'modifyorder',query:{data: this.orderitems}})
    },
  },

  watch: {

  },
  created() {
    this.getData()
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

</style>
