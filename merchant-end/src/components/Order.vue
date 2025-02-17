<template>
    <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>主页</BreadcrumbItem>
            <BreadcrumbItem>订单查看</BreadcrumbItem>
        </Breadcrumb>
        <div class="main-wrapper">
            <h1> 订单 </h1>
            <div class="table-wrapper">
                <Table stripe size="large" :columns="orderHeader" :data="paginatedData"></Table>
                <h3 v-if="orderItems.length === 0">正在获取订单数据，请耐心等待...</h3>
            </div>
            <br></br>
            <div>
              <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
              Page {{ currentPage }} of {{ totalPages }}
              <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>
        </div>
    </Content>
</template>

<script>
    import Vue from 'vue'
    import print from 'vue-print-nb';
    Vue.use(print);
    export default {
        data () {
            return {
                timeout: true,
                orderHeader: [
                    {
                        title: '订单编号',
                        key: 'order_id'
                    },
                    {
                      title: '客户姓名',
                      key: 'nickname'
                    },
                    {
                        title: '房间',
                        key: 'table_name'
                    },
                    {
                      title: '联系电话',
                      key: 'mobile'
                    },
                    {
                        title: '总价',
                        key: 'total_price'
                    },
                    {
                        title: '点餐时间',
                        key: 'order_time_format',
                        render: (h, params) => {
                            let date = new Date(params.row.order_time);
                            let formatDate = `
                                ${date.getFullYear()}-${(date.getMonth() + 1) .toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}
                                ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}
                            `
                            return h('span', formatDate)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                    type: 'primary',
                                    size: 'small'
                                    },
                                    style: {
                                    marginRight: '5px'
                                    },
                                    on: {
                                    click: () => {
                                        this.showDetailModal(params.index + (this.currentPage -1) * this.pageSize)
                                    }
                                    }
                                }, '查看'),
                              // h('Button', {
                              //   props: {
                              //     type: 'primary',
                              //     size: 'small'
                              //   },
                              //   style: {
                              //     marginRight: '5px'
                              //   },
                              //   on: {
                              //     click: () => {
                              //       this.modifyModal(params.index)
                              //     }
                              //   }
                              // }, '修改')
                              ])

                        }

                    }
                ],
                orderItems: [],
                currentPage: 1, // 当前页码
                pageSize: 10, // 每页显示的条数
                totalPages: 0 // 总页数
            }
        },
        methods: {
          showDetailModal (index) {
            this.$router.push({path:'OrderPrint',query:{data: this.orderItems[index]}})
          },
          // modifyModal (index) {
          //   this.$router.push({path:'modifyorder',query:{data: this.orderItems[index]}})
          // },
          updateData() {
              /* 蜜汁4号餐厅 */
              this.axios.get('/api/restaurant/orders/4')
                  .then(res => {
                      if(res.status =='200') {
                          console.log(res)
                          this.$set(this,'orderItems', res.data)
                          this.totalPages = Math.ceil(this.orderItems.length / this.pageSize);
                      } else {
                          console.log("获取订单失败")
                      }

                  })
                  .catch(err => {
                      console.log('err: ', err)
                      if(err.status == '400') {
                          console.log("获取订单失败")
                      }
                  });

              /* dangerous!! */
              if (this.timeout)
                  setTimeout(this.updateData.bind(this), 10000);
          },
          increment(){
            console.log("this is increment!")
            this.dishNum = this.dishNum + 1
          },
          decrement(){
            console.log("this is decrement!")
          },
          print() {
            this.$print(this.$refs.print_demo);

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
            return this.orderItems.slice(startIndex, endIndex);
          }
        },
        created() {
            console.log('order created');
            this.timeout = true;
            this.updateData();
        },
        destroyed() {
            this.timeout = false;
        }

    }
</script>

<style scoped>
    .main-wrapper {
        min-height: 500px;
        width: 100%;
        border: 1px solid #dddee1;
        border-color: #e9eaec;
        border-radius: 4px;
        padding: 24px;
        background: #fff;
        font-size: 12px;
        box-sizing: border-box;
    }

    .table-wrapper {
        margin-top: 24px;
    }
    .btn{
      width: 200px;
      height: 50px;
      line-height: 50px;
      background: green;
      border-radius: 7px;
      border: none;
    }
    .table-content {
        font-size: 20px;
    }
</style>
