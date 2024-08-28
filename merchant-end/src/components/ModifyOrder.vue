<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>订单管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="main-wrapper">
      <div>
        <h2>订单信息</h2>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">订单号：{{orderitems.order_id}}，  客户姓名：{{orderitems.nickname}}，  联系电话：{{orderitems.mobile}}，  房间：{{orderitems.table_id}}，  总价：{{totalPrice}}。</div>
        <div :style="{fontSize: '16px', whiteSpace: 'pre-wrap'}">客户要求：{{orderitems.notes}}。</div>

        <table-render :columns="columns" :data="data"></table-render>
      </div>
    </div>
    <Button type="primary" @click="addDishModel">添加菜品</Button>
    <Button type="primary" @click="submitOrder">提交</Button>

  </Content>
</template>
<script>
//引入子组件
// import Editwindow from '@/components/Editwindow';
import TableRender from '../components/table-render/table.vue';


export default {
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
        {
          title: '操作',
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return [
                h('button', {
                  on: {
                    click: () => {
                      let oldnum = this.data[index].num
                      this.data[index].num = this.editNum;
                      this.totalPrice = this.totalPrice + this.data[index].food.price * (this.data[index].num - oldnum) // get the new total_price
                      this.editIndex = -1;
                    }
                  }
                }, '保存'),
                h('button', {
                  style: {
                    marginLeft: '6px'
                  },
                  on: {
                    click: () => {
                      this.editIndex = -1;
                    }
                  }
                }, '取消')
              ];
            } else {
              return h('div',[
                h('button', {
                on: {
                  click: () => {
                    this.editNum = row.num;
                    this.editIndex = index;
                  }
                }
              }, '修改'),
              h('button', {
                on: {
                  click: () => {
                    this.deleteRow(index,row);
                    this.totalPrice = this.totalPrice - this.data[index].food.price * this.data[index].num // get the new total_price
                  }
                }
              }, '删除')])
            }
          }
        }
      ],
      data: [],
      orderitems: [],
      totalPrice: 0,
      editIndex: -1,  // 当前聚焦的输入框的行数
      editNum: '',  // 第三列输入框
      change: false,
      // isFirstEnter:false // 是否第一次进入，默认false

    }
  },
  components: {
    TableRender,
    // Editwindow,
  },
  methods: {
    addDishModel() {
      sessionStorage.setItem('cachedata', JSON.stringify(this.data))
      sessionStorage.setItem('cacheorderitems', JSON.stringify(this.orderitems))
      sessionStorage.setItem('cachetotalprice', JSON.stringify(this.totalPrice))
      this.$router.push({path:'adddish',query:{data: this.orderitems}})
      },
    getData() {
      // getData方法，从后台请求数据
      const cachedata = JSON.parse(sessionStorage.getItem('cachedata'))
      if (cachedata) {
        this.data = cachedata
      } else {
        this.data = this.$route.query.data.detail
      }

    },
    submitOrder() {
      this.$Modal.confirm({
        title:'提交定单',
        content:'确认要提交定单？',
        loading:true,
        onOk: () => {
          var _this = this;
          this.axios.post('/api/restaurant/orders/4/1/17', {
            foods:_this.data,
            tableID:_this.orderitems.table_id,
            restaurantId:_this.orderitems.restaurant_id,
          })
            .then(function(response) {
              _this.$Modal.remove();
              console.log(response);
              _this.$Message.success('添加成功！');
              // sessionStorage.removeItem('cachedata');
              sessionStorage.removeItem('selectdishitems')
            })
            .catch(function(error) {
              _this.$Modal.remove();
              _this.$Message.error('添加失败！');
              console.log(error);
            });
        }
      });
    },
    deleteRow(index, row) {
      this.$Modal.confirm({
        title: "提示",
        mask: false,
        content: "<p>确定删除所选菜品吗？</p>",
        onOk: () => {
          this.data.splice(index, 1);
          // sessionStorage.setItem('cachedata', JSON.stringify(this.data))
        },
        onCancel: () => {
        },
      })
    }
  },

  // beforeRouteEnter(to, from, next) {
  //   // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
  //   // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  //   // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
  //   // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
  //   if(from.name=='adddish'){
  //     to.meta.isBack=true;
  //     //判断是从哪个路由过来的，
  //     //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
  //   }
  //
  //   next();
  // },
  watch: {

  },
  created() {

    // this.isFirstEnter=true
    // this.getData()
  },
  mounted() {
    const cachedata = JSON.parse(sessionStorage.getItem('cachedata'))
    const cacheorderitems= JSON.parse(sessionStorage.getItem('cacheorderitems'))
    const addeddishes = JSON.parse(sessionStorage.getItem('selectdishitems'))
    const cachetotalprice = JSON.parse(sessionStorage.getItem('cachetotalprice'))
    if (cachedata && addeddishes) {
      this.data = cachedata.concat(addeddishes)
      this.orderitems = cacheorderitems
      for (let i = 0; i < this.data.length; i++){
        this.totalPrice = this.totalPrice + this.data[i].food.price * this.data[i].num
      }
      // sessionStorage.setItem('cachetotalprice', JSON.stringify(this.totalPrice))
    } else {
      this.getData()
      if (cacheorderitems && cachetotalprice) {
        this.orderitems = cacheorderitems
        this.totalPrice = cachetotalprice
      } else {
        this.orderitems = this.$route.query.data
        this.totalPrice = this.orderitems.total_price
      }
    }

    sessionStorage.removeItem('cacheorderitems')
    sessionStorage.removeItem('selectdishitems')
    sessionStorage.removeItem('cachetotalprice')
  },
  // activated() {
  //   if(!(this.$route.meta.isBack) || this.isFirstEnter){
  //     // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
  //     this.getData()
  //     console.log("this is firstenter")
  //     sessionStorage.setItem('cachedata', JSON.stringify(this.data))
  //     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
  //     this.$route.meta.isBack=false
  //     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
  //     this.isFirstEnter=false;
  //
  //   }
  //   console.log("this is else")
  //   const array = JSON.parse(sessionStorage.getItem('selectdishitems'))
  //   const oldarray = JSON.parse(sessionStorage.getItem('cachedata'))
  //   if (array) {
  //     this.data = oldarray.concat(array)
  //   }else {
  //     this.data = oldarray
  //   }
  //   // sessionStorage.removeItem('selectdishitems')
  //   sessionStorage.removeItem('cachedata')
  //   }



}
</script>

