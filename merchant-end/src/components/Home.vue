<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    #logo {
    overflow: hidden;
}
</style>
<template>
    <div class="layout">
      <Layout :style="{minHeight: '100vh'}">
            <Sider>
                <div id="logo" style="width: auto; height: 64px;">
                    <img src="../assets/logo.png" alt="logo" style="height:70%;width:70%;">
                </div>
                <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-analytics"></Icon>
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
                        <router-link to="/home/Cart">
                          <MenuItem name="2-3">购物车</MenuItem>
                        </router-link>
                        <MenuItem name="2-4">设置</MenuItem>
                    </MenuGroup>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                    <Menu mode="horizontal" :theme="theme1" style="height:65px;">
                        <MenuItem name="1" style="float:right;">
                            <Avatar src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=123308412,2828093194&fm=58"/>
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
                          <Badge count="3">
                            <div @click="modal1 = true">
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
      <Modal width=720 :sk-closable="false" :closable="false" v-model="modal1" >
        <h2 slot="header">购物车</h2>
        <Cart @UpdateDishData="Refresh"> </Cart>
      </Modal>
    </div>

</template>
<script>
import Cart from '@/components/Cart'
 export default {
     name: "Home",
     components: { // 注册子组件
       Cart
     },
    data() {
        return {
            modal1: false,
            theme1:'light',
            cartItems: [],
        }
    },
    methods: {
      Refresh(data) {
        this.cartItems = data
      }
    },

 }
</script>
