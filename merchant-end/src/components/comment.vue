<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>评论管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="main-wrapper">
      <h1> 评论列表 </h1>
      <div class="table-wrapper">
        <Table stripe size="large" :columns="commentHeader" :data="paginatedData"></Table>
        <h3 v-if="commentItems.length === 0">正在获取评论数据，请耐心等待...</h3>
      </div>
      <div :style="{position:'fixed', right: '150px', bottom: '100px'}">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        Page {{ currentPage }} of {{ totalPages }}
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>

    </div>

  </Content>
</template>

<script>
  export default {
  data () {
    return {
      timeout: true,
      commentHeader: [
        {
          title: '评论编号',
          key: 'comments_id'
        },
        {
          title: '昵称',
          key: 'comments_name'
        },
        {
          title: '晒图',
          key: 'image',
          //增加一个显示图片的插槽render属性
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.image
              },
              style: {
                width: '80px',
                height: '80px'
              }
            })
          }
        },
        {
          title: '标题',
          key: 'comments_title'
        },
        {
          title: '内容',
          key: 'description'
        },
        {
          title: '时间',
          key: 'time',
          render: (h, params) => {
            let date = new Date(params.row.time);
            let formatDate = `
                                ${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}
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
                    this.removeItem(params.index + (this.currentPage -1) * this.pageSize)
                    }
                }
              }, '删除')
            ])
          }
        }
      ],
      commentItems: [],
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的条数
      totalPages: 0 // 总页数
    }
  },
  methods: {
    showDetailModal(index) {
      this.$Modal.info({
        width: '600px',
        title: '评论内容',
        render: (h) => {
          return h('div', [
            h('div', {
                style: {
                  padding: '12px 0',
                  fontSize: '14px'
                }
              },
              [
                h('p', {
                    style: {
                      display: 'inline-block',
                      padding: '0 12px'
                    }
                  },
                  '评论编号：' + this.commentItems[index].comments_id),
                h('p', {
                    style: {
                      display: 'inline-block',
                      padding: '0 12px'
                    }
                  },
                  '昵称：' + this.commentItems[index].comments_name),

                h('p', {
                    style: {
                      display: 'inline-block',
                      padding: '0 12px'
                    }
                  },
                  '标题：' + this.commentItems[index].comments_title),

                h('p', {
                    style: {
                      display: 'inline-block',
                      padding: '0 12px'
                    }
                  },
                  '内容：' + this.commentItems[index].description),
              ]),
          ])
        }
      })
    },
    removeItem(index) {
      this.$Modal.confirm({
        title:'确认删除',
        content:'是否确认删除该条评论？',
        loading: true,
        onOk: () => {
          var _this = this;
          //获取数据库里的评论id
          const id = this.commentItems[index].comments_id;
          this.axios.delete('api/manage_comments/'+ id, {
          })
            .then(function(response) {
              console.log(response);
              _this.$Modal.remove();
              _this.$Message.success('删除成功！');
              _this.RefreshList(_this.newpage);
            })
            .catch(function(error) {
              _this.$Modal.remove();
              _this.$Message.error('删除失败！');
              console.log(error);
            });
        }
      });

    },
    updateData() {
      /* 六和居 */
      this.axios.get('/api/get_comments')
        .then(res => {
          if (res.status == '200') {
            console.log(res)
            this.$set(this, 'commentItems', res.data.comments)
            this.totalPages = Math.ceil(this.commentItems.length / this.pageSize);
          } else {
            console.log("获取评论失败")
          }

        })
        .catch(err => {
          console.log('err: ', err)
          if (err.status == '400') {
            console.log("获取评论失败")
          }
        });

      /* dangerous!! */
      if (this.timeout)
        setTimeout(this.updateData.bind(this), 10000);
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
      return this.commentItems.slice(startIndex, endIndex);
    }
  },
  created() {
    console.log('comment list created');
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
  min-height: 800px;
  width: 100%;
  border: 1px solid #dddee1;
  border-color: #e9eaec;
  border-radius: 4px;
  padding: 0px;
  background: #fff;
  font-size: 12px;
  box-sizing: border-box;
}

.table-wrapper {
  margin-top: 10px;
}

.table-content {
  font-size: 20px;
}
</style>
