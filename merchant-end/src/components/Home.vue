<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
   #logo {
    overflow: visible;
    }
    .menu-demo >>> .ivu-menu-submenu-title:hover {
      background-color: #0f825c; /* 替换为你想要的背景色 */
      font-size: 16px;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
      border-right: none;
      color: white;
      font-size: 16px;
      background: #688879 !important;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
      color: #2d8cf0;
      /*border-bottom: 2px solid #2d8cf0; */
    }
</style>
<template>
    <div class="layout">
      <Layout :style="{minHeight: '100vh'}">
            <Sider style="background-color: #0f825c">
                <div id="logo" style="width: auto; height: 64px; background-color: #0f825c">
                    <img src="../assets/logo200.png" alt="logo">
                </div>
                <Menu class="menu-demo" active-name="2-4" theme="dark"  width="auto" :open-names="['1']">
                    <Submenu style="background-color: #0f825c" name="1">
                        <template slot="title">
                            <Icon  type="ios-analytics"></Icon>
                                导航栏
                        </template>
                        <MenuGroup title="餐厅管理">
                            <router-link to="/home/restaurantinfo">
                                <MenuItem name="1-1">餐厅信息</MenuItem>
                            </router-link>
                            <router-link to="/home/menu">
                                <MenuItem name="1-2">菜品管理</MenuItem>
                            </router-link>
                            <router-link to="/home/order">
                                <MenuItem name="1-3">订单管理</MenuItem>
                            </router-link>

                            <router-link to="/home/comment">
                              <MenuItem name="1-4">评论管理</MenuItem>
                            </router-link>
                        </MenuGroup>
                        <MenuGroup title="个人中心">
                            <router-link to="/home/generate_qrcode">
                            <MenuItem name="2-1">定制餐桌二维码</MenuItem>
                            </router-link>
                            <router-link to="/home/OrderDishes">
                              <MenuItem name="2-2">后台点菜</MenuItem>
                            </router-link>
    <!--                        <router-link to="/home/Cart">-->
    <!--                          <MenuItem name="2-3">购物车</MenuItem>-->
    <!--                        </router-link>-->
                          <router-link to="/home/OrderInfo">
                            <MenuItem name="2-4">房间状态</MenuItem>
                          </router-link>
                            <MenuItem name="2-5">设置</MenuItem>
                        </MenuGroup>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
              <Menu style="height:65px; background-color: #a9e5c9" mode="horizontal" :theme="theme1">
                        <MenuItem name="1" style="float:right;">
                            <img style="width: 30px; height: 26px; margin-bottom: -10px" src="../assets/logo.png"/>
                        </MenuItem>
                        <MenuItem name="2" style="float:right">
                            <Badge dot>
                                <Icon type="gear-b" size="26"></Icon>
                            </Badge>
                        </MenuItem>
                        <MenuItem name="2" style="float:right">
                            <Badge count="3">
                                <Icon type="email" size="26"></Icon>
                            </Badge>
                        </MenuItem>
                        <MenuItem name="2" style="float:right">
                          <Badge :count="totalNum">
<!--                            <div @click="modal1 = true">-->
                            <div @click="openCartModal">
                              <Icon type="ios-cart" size="26" ></Icon>
                            </div>
<!--                            <router-link to="/home/Cart">-->
<!--                              <Icon type="ios-cart" size="26" ></Icon>-->
<!--                            </router-link>-->

                          </Badge>
                        </MenuItem>
                    </Menu>
              <router-view></router-view>
            </Layout>

      </Layout>
      <Modal v-if="showModal" @close="showModal = false" visible=true>
         <h2 slot="header">购物车</h2>
         <Cart @UpdateDishData="handleUpdateItems"> </Cart>
      </Modal>

    </div>

</template>
<script>
import Cart from '@/components/Cart'
import Modal from '@/components/Modal'
 export default {
     name: "Home",
     components: { // 注册子组件
       Cart,
       Modal
     },
    data() {
        return {
            showModal: false,
            theme1:'light',
            // cartItems: [],
            totalNum: 0,
            receivedItems: []
        }
    },
   computed: {

   },
    methods: {
      handleUpdateItems(data, totalnum, showModal) {
        this.receivedItems = [...data];
        this.totalNum = totalnum;
        this.showModal = showModal;
        console.log('父组件接收到的数据:', this.receivedItems);
      },
      openCartModal() {
        const cartData = JSON.parse(sessionStorage.getItem('cartData'))
        if (cartData === null) {
          // this.showModal = true;
          this.$Message.warning("您还没有点菜呢！")
        }else if (cartData.length > 0) {
            this.showModal = true;
            sessionStorage.setItem("showModal", JSON.stringify(this.showModal))
        }else if (this.receivedItems.length === 0) {
          this.$Message.warning("您还没有点菜呢！")
        }




      }
    },
     // mounted() {
     //
     // }

 }
</script>
