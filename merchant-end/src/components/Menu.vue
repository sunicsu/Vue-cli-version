<style scoped>
	#pages {
		position: absolute;
		bottom: 0px;
		right: 0px;
		margin-right: 30%;
		margin-bottom: 0%;
    /*justify-content: center;*/
	}
	#addbutton {
		margin-right: auto;
		margin-left:auto;
		width: 100%;
		height: 40px;
		font-size: 20px;
		color: #80848f
	}
</style>


<template>
	<Content :style="{padding: '0 16px 16px'}">
  	<Breadcrumb :style="{margin: '16px 0'}">
    	<BreadcrumbItem>主页</BreadcrumbItem>
      	<BreadcrumbItem>菜品管理</BreadcrumbItem>
    </Breadcrumb>
  	<Card>
    	<div style="height: 1250px">
        <h2 style="color: #80848f">菜品</h2>
<!--        <br></br>-->
        <Button id="addbutton" v-on:click="modal = true" type="dashed" icon="plus">添加菜品</Button>
        <Modal width=720 v-model="modal" @on-ok="addNewDish" @on-cancel="cancel" :loading="loading" :sk-closable="false" :closable="false">
          <h2 slot="header">添加菜品</h2>
          <Addwindow v-on:AddNewDish="Refresh" ref="addwin" ></Addwindow>
        </Modal>
        <Dish v-for="dish in dishes"
            v-bind:key="dish.food_id"
            v-bind:dishid="dish.food_id"
            v-bind:dishname="dish.food_name"
            v-bind:description="dish.description"
            v-bind:price="dish.price"
            v-bind:image="dish.image"
            v-bind:newCode="dish.newcode"
            v-bind:categoryName="dish.categoryname"
            v-bind:newSpec="dish.newspec"
            v-bind:newUnit="dish.newunit"
            v-bind:newStatus="dish.newstatus"
            v-on:remove="DeleteDish(dish.food_id)"
            style="width:100%; height: 100px;">
        </Dish>
        <br></br>
        <div id="pages">
          <Page :total="200" show-elevator show-sizer @on-change="ChangePage"></Page>
        </div>
      </div>

  	</Card>
  </Content>
</template>

<script>
	import Dish from '@/components/Dish'
	import Addwindow from '@/components/Addwindow'
  import ModifyOrder from '@/components/ModifyOrder'
	export default {
		data() {
			return {
				newname:'',
        newcode:'',
        categoryname:'',
        newspec:'',
				newdes:'',
        newUnit:'',
        newstatus:"",
				newprice:'',
				newimage:'',
				modal: false,
				alldishes: [],
				dishes: [],
				newpage:1,
        loading: true
			}
		},
    components: {
			Dish,
			Addwindow,
      ModifyOrder
		},
		methods: {
      messageWarningFn (text) {
        this.$Message.warning(text)
        setTimeout(() => {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
        }, 500)
      },
			addNewDish() {
				if (this.newUnit=='') {
          this.messageWarningFn('请选择可点份数！')
          return
          // this.$Modal.warning({
          //   title: '菜品名称不能为空',
          //   content: '请输入菜品名称'
          // });
					// this.cancel();
				} else if (this.newdes=='') {
          this.messageWarningFn('请输入菜品描述！')
          return

				} else if (this.newprice=='') {
          this.messageWarningFn('请输入菜品单价！')
          return

				} else if (this.newimage=='') {
          this.messageWarningFn('请上传菜品图片！')
          return

        }else if (this.newcode=='') {
          this.messageWarningFn('请输入菜品编码！')
          return

        }else if (this.newstatus=='') {
          this.messageWarningFn('请输入菜品状态！')
          return

        }else if (this.newname=='') {
          this.messageWarningFn('请输入菜品名称！')
          return

        }else if (this.categoryname=='') {
          this.messageWarningFn('请选择菜品类别！')
          return
				}else if (this.newspec=='') {
          this.messageWarningFn('请选择菜品规格！')
          return
        }else {
					this.$Modal.confirm({
						title:'确认添加',
						content:'是否确认添加菜品？',
						loading: true,
						onOk: () => {
								var _this = this;
								console.log(this.newimage);
								this.axios.post('/api/food/4', {
									food_name:_this.newname,
									description:_this.newdes,
									price:_this.newprice,
									image:_this.newimage,
                  newCode:_this.newcode,
                  categoryName:_this.categoryname,
                  newSpec:_this.newspec,
                  newUnit:_this.newUnit,
                  newStatus:_this.newstatus,
									priority:1
								})
								.then(function(response) {
									_this.$Modal.remove();
									console.log(response);
									_this.$Message.success('添加成功！');
									_this.RefreshList(_this.newpage);
									_this.$refs.addwin.reset();
								})
								.catch(function(error) {
									_this.$Modal.remove();
									_this.$Message.error('添加失败！');
									console.log(error);
								});
						}
					});
				}
        this.modal = false
				this.$refs.addwin.reset();

			},
			Refresh(data) {
				this.newname = data.EditedName;
				this.newdes = data.EditedDescription;
				this.newprice = data.EditedPrice;
				this.newimage = data.EditedImage;
        this.newcode = data.EditedCode;
        this.categoryname = data.EditedCategory;
        this.newspec = data.EditedNewSpec;
        this.newUnit = data.EditedNewUnit;
        this.newstatus = data.EditedNewStatus
			},
			RefreshList(page) {
				const loading = this.$Message.loading({
					content:'正在获取菜单数据，请耐心等待',
					duration:0
				});
				var _this = this;
				this.axios.get('/api/menu/4')
				.then(function (response) {
    				console.log(response.data.foods);
    				setTimeout(loading, 1);
    				if (response.status == '200') {
    					_this.alldishes = response.data.foods;
 						console.log(_this.alldishes);
 						_this.dishes.splice(0, _this.dishes.length);
						var totalDish = _this.alldishes.length;
						if (totalDish < (page - 1) * 10) {
              this.$Message.loading({
                content:'没有菜品',
                duration:10
              })
						} else {
							if (totalDish - (page - 1) * 10 > 10) {
								_this.dishes=_this.alldishes.slice((page - 1) * 10, page * 10);
								// _this.alldishes.reverse();
							} else {
								_this.dishes=_this.alldishes.slice((page - 1) * 10);
								// _this.alldishes.reverse();
							}
						}
    				}
 				 })
				.catch(function (error) {
					setTimeout(loading,1);
    				console.log(error);
 				 });
			},
			ChangePage(page) {
				this.newpage=page;
				this.RefreshList(page);
			},
			cancel() {
				this.$refs.addwin.reset();
        this.newname = '';
        this.newdes = '';
        this.newprice = '';
        this.newimage = '';
        this.newcode = '';
        this.categoryname = '';
        this.newspec = '';
        this.newUnit = '';
        this.newstatus = ''
			},
			DeleteDish(index) {
				this.$Modal.confirm({
					title:'确认删除',
					content:'是否确认删除该菜品？',
					loading: true,
					onOk: () => {
						var _this = this;
						this.axios.delete('api/food/4/'+index, {

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
			}
		},

		mounted: function() {
			this.$nextTick(function () {
				this.RefreshList(1);
      		})
    }
	}
</script>
