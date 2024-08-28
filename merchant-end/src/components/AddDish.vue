<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>订单管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="main-wrapper">
      <div>
        <h2>请选择菜品</h2>
        <Table :columns="columns" :data="dishItems"></Table>
        <Button type="primary" @click="createOrder">确定下单</Button>
        <Button type="primary" @click="cancel">取消</Button>
<!--        <router-link to="/home/modifyorder">确定下单</router-link>-->
      </div>

    </div>
  </Content>
</template>
<script>
//引入子组件
// import Editwindow from '@/components/Editwindow';
import TableRender from '../components/table-render/table.vue';


export default {
  data () {
    this.updateData();
    return {

      columns: [
        { title: 'ID', key: 'food_id' },
        { title: '菜名',  key: 'food_name' },
        { title: '单价',  key: 'price' },
        { title: '份数',  key: 'num' ,
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
        { title: '操作',
          render: (h, { row, index }) => {
            if (this.editIndex === index) {
              return [
                h('button', {
                  on: {
                    click: () => {
                      row.num = this.editNum;
                      let foods = {}
                      let newnum = row.num
                      const food = { food_id: row.food_id, food_name:row.food_name, price: row.price};
                      foods = {food: food}
                      foods.num = newnum
                      this.selectdishitems.push(foods);
                      sessionStorage.setItem('selectdishitems', JSON.stringify(this.selectdishitems));
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
              return h('button', {
                on: {
                  click: () => {
                    this.editNum = row.num;
                    this.editIndex = index;
                  }
                }
              }, '选择');
            }
          }
        },
      ],
      modal1: false,
      // orderitems: this.$route.query.data,
      editIndex: -1,  // 当前聚焦的输入框的行数
      editNum: '',  // 第三列输入框
      change: false,
      dishItems: [],
      selectdishitems: [],
    }

  },
  methods: {
    updateData() {
      /* 蜜汁4号餐厅 */
      this.axios.get('/api/menu/4')
        .then(res => {
          if(res.status =='200') {
            console.log(res)
            this.$set(this,'dishItems', res.data.foods)
            this.dishItems.map((item, index) => {
              item.num = 0; //添加的字段
            })
          } else {
            console.log("获取菜品失败")
          }

        })
        .catch(err => {
          console.log('err: ', err)
          if(err.status == '400') {
            console.log("获取菜品失败")
          }
        });

      /* dangerous!! */
      if (this.timeout)
        setTimeout(this.updateData.bind(this), 10000);
    },
    createOrder(){
      // this.$router.push({path:'/home/order/modifyorder',query:{data: this.selectdishitems}})
      this.$router.push({name:'modifyorder',query:{data: this.selectdishitems}})
      // this.$router.go(-1)
      // this.$Modal.confirm({
      //   title:'确认添加',
      //   content:'确认要增加所选菜品？',
      //   loading:true,
      //   onOk: () => {
      //     var _this = this;
      //     _this.$router.push({name:'modifyorder',query:{data: _this.selectdishitems}})
      //     // sessionStorage.setItem('selectdishitems', JSON.stringify(_this.selectdishitems))
      //     // _this.$router.back();
      //
      //     _this.$Modal.remove();
      //   }
      // });

    },
    cancel(){
      this.$router.back();
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   // 当离开当前页面时执行的逻辑
  //   if(from.name=='adddish'){
  //     to.meta.isBack=true;
  //     //判断是从哪个路由过来的，
  //     //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
  //   }
  //   next(); // 必须调用next()来完成路由跳转
  // },
}



</script>

