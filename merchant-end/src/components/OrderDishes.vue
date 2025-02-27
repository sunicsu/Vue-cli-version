<template>
  <Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>后台点菜</BreadcrumbItem>
    </Breadcrumb>
    <h1> 选择菜品 </h1>
    <ul class="category-list" v-for="(item, index) in topMenuList" :key="index">
      <li @click="getCateDishes(item,index)" :class="{ active: index === activeIndex}" >
        {{item}}
      </li>
    </ul>


    <h2></h2>
    <div class="product-list">
      <div v-for="(row, index) in chunkedProducts" :key="index" class="product-row">
        <div v-for="product in row" :key="product.food_id" class="product-item">
<!--      <div v-for="product in paginatedData" :key="product.id" >-->
          <img style="height: 130px; width: 130px" :src="product.image" alt="Product Image">
          <div class="text-row">
            <h4>{{ product.food_name }}</h4> <h4>{{ Math.round(product.price)}}  元 </h4>
          </div>


          <div class="item">
            <p class="minus-btn" @click="minusNum(product.food_id)"> - </p> {{product.num}} <p class="add-btn" @click="addNum(product.food_id)"> + </p>  <button @click="addToCart(product)">添  加</button>
          </div>
        </div>

      </div>
      <h3 v-if="chunkedProducts.length === 0">正在获取菜品数据，请耐心等待...</h3>
    <div class="pagination" id="pages">
<!--      <Page :total="200" show-elevator show-sizer @on-change="ChangePage"></Page>-->
      <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span class="span" v-for="page in pageList" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
  </Content>
</template>

<script>
//引入子组件
import Home from '@/components/Home'
export default {
  name: "OrderDishes",
  components: {
    Home
  },
  data () {
    return {
      hasBeenCreated: false,
      hasBeenGetCate: false,
      // timeout: true,
      activeIndex: null,
      allDishes: [],
      topMenuList: [],
      topMenuListBak: [],
      cateDishes: [],
      // cart: [],
      // initNum: 1,
      items:[],
      currentPage: 1, // 当前页码
      currentCate: '特色锅',
      pageSize: 24, // 每页显示的条数
    }

  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.allDishes.slice(start, end);
      // this.hasBeenGetCate = true;
    },
    totalPages() {
      return Math.ceil(this.allDishes.length / this.pageSize);
    },
    pageList() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    chunkedProducts() {
      const chunkSize = 6; // 每行6个产品
      return this.paginatedData.reduce((array, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!array[chunkIndex]) {
          array[chunkIndex] = []; // 如果这个块还不存在，创建一个新的块
        }
        array[chunkIndex].push(item); // 把项目推入正确的块中
        return array;
      }, []);
    },
  },
  methods: {
    updateData() {
       this.axios.get('/api/category_dish')
        .then(res => {
          if (res.status == '200') {
            console.log(res)
            const topMenuList = res.data.map(v=>v.cat_name)
            const dishes = new Array()
            // const dishes = res.data.reduce((acc, item) => {
            //   if (item.children) {
            //         item.children.forEach(child => {
            //           acc.push({ ...child, type: 'child' }); // 处理子项
            //         });
            //       }
            //   return acc;
            //   }, [])
            for (let i = 0; i < res.data.length; i++){
              this.newmenu = res.data[i].children
              this.newmenu.forEach(child => {
                  dishes.push({ ...child, num: 1, type: 'child' }); // 处理子项
                })
            }
            this.cateDishes = dishes
            this.$set(this, 'allDishes', dishes)
            this.$set(this, 'topMenuList', topMenuList)
          } else {
            console.log("获取菜品分类失败")
          }

        })
        .catch(err => {
          console.log('err: ', err)
          if (err.status == '400') {
            console.log("获取菜品分类失败")
          }
        });

      /* dangerous!! */
      // if (this.timeout)
      //   setTimeout(this.updateData.bind(this), 10000);
    },
    getCateDishes(cate,index) {
      // return this.allDishes.filter(item => item.categoryname === cate)
      if (!this.hasBeenGetCate) {
        const fieldName = 'categoryname'
        const catedishes = this.allDishes.filter(item => item[fieldName] === cate)
        this.allDishes = catedishes
        this.currentPage = 1 // 当前页为第一页
        this.hasBeenGetCate = true
        this.activeIndex = index
      } else {
        this.allDishes = this.cateDishes  //重新置数组为所有产品
        const fieldName = 'categoryname'
        const catedishes = this.allDishes.filter(item => item[fieldName] === cate)
        this.allDishes = catedishes
        this.currentPage = 1
        this.activeIndex = index
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
      // this.hasBeenGetCate = true;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.paginatedData();

      }
    },
    minusNum(id) {
      const fruit = this.allDishes.find(item => item.food_id === id)
      fruit.num--;
    },
    addNum(id) {
      const fruit = this.allDishes.find(item => item.food_id === id)
      fruit.num++;
    },
    addToCart(product) {
      let cart = JSON.parse(sessionStorage.getItem('cartData')) || []
      //const itemInCart = cart.find(item => item.food_id === product.food_id);
      let index = cart.findIndex(v => v.food_id === product.food_id)
      // let newNum = 1;
      if (index === -1) {
        // 如果不存在，添加到购物车,并设置数量为点选数量
        cart.push({...product, isChecked: false})
      } else {
        // 如果存在，仅设置数量为点选数量
        cart[index].num = cart[index].num + product.num
      }
      this.$Message.warning("成功加入购物车！")
      product.num = 1 //重置
      sessionStorage.setItem('cartData', JSON.stringify(cart));
    }

  },

  created() {
    console.log('comment list created');
    // this.timeout = true;
    if (!this.hasBeenCreated) {
      this.updateData();
      this.hasBeenCreated = true;
      // this.timeout = false;
    }
  },
  mounted: function() {
    this.currentPage = 1; // 确保第一页被加载和显示
  }

}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column; /* 使项目垂直排列 */
  margin-top: 30px;
  justify-content: space-between; /* 控制列间距 */
  /*justify-content: center;*/

}
.product-row {
  display: flex; /* 使项目在行内水平排列 */
  /*justify-content: space-around; !* 水平居中 *!*/
  margin-bottom: 30px; /* 行间距 */
  /*margin-outside: 20px;*/

}
.text-row {
  display: flex; /* 使项目在行内水平排列 */
  margin-bottom: 10px; /* 行间距 */
  gap: 10px;
  /*margin-outside: 20px;*/

}
.product-item {
  /* 单个产品样式 */
  height: 150px;
  width: 150px;
  flex: 1 1 30%;
  margin-bottom: 40px; /* 控制行间距 */
  box-sizing: border-box; /* 确保padding和border不影响布局宽度 */

}
.minus-btn, .add-btn {
  /*position: absolute;*/
  background-color: rgb(121, 240, 97);

  line-height: 20px;
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 20px;
  margin-top: 0px;
  margin-left: 5px;
  margin-right: 5px;
  /*margin-bottom: 20px;*/
  /*vertical-align: center; */
  /*text-align: center;*/
  /*border-radius: 50%;*/
}
.item {
  display: -webkit-flex;
  margin-top: 3px;
  gap: 10px
}
.category-list{
  display: inline-block; /* 或者使用 inline */
  font-size: 20px;
  justify-content: center;
  /*margin: 0 30px;*/
  margin-top: 20px;
  margin-left: 60px;
  margin-right: 20px;
  /*align-items: center;*/
}
li {
  cursor: pointer; /* 鼠标悬停在列表项上时显示手形图标 */
}
/* 使用CSS动态改变颜色 */
/*li.active {*/
/*  color: red; !* 改变颜色 *!*/
/*}*/
.active {
  font-weight: bold;
  color: #006efe;
  margin: 0 2px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.span {
  margin: 0 10px;
}

</style>

