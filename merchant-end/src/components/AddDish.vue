<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>订单管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="main-wrapper">
      <div>
        <h2>请选择菜品</h2>
        <Table :columns="columns" :data="paginatedData"></Table>
        <Button type="primary" @click="createOrder">确定下单</Button>
        <Button type="primary" @click="cancel">取消</Button>
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        Page {{ currentPage }} of {{ totalPages }}
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
<!--      <div :style="{position:'fixed', right: '200px', bottom: '30px'}">-->
<!--        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>-->
<!--        Page {{ currentPage }} of {{ totalPages }}-->
<!--        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>-->
<!--      </div>-->

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
      currentPage: 1, // 当前页码
      pageSize: 15, // 每页显示的条数
      totalPages: 0 // 总页数
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
            this.totalPages = Math.ceil(this.dishItems.length / this.pageSize);
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
    },
    cancel(){
      this.$router.back();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dishItems.slice(startIndex, endIndex);
    }
  },

}



</script>

