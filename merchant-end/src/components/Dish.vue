<style scoped>
	.dishes {
			margin-top: 1%;
			margin-bottom: 1%;
			margin-left: 5%;
			margin-right: 5%;
			width: 80%;
	}
	p {
		font-size: 20px;
		color: #80848f;
	}
	#buttongroup {
		margin-top: -50px;
		margin-right: 10px;
	}
	#photo-list {
		width: 80px;
		height: 80px;
		background-color: #bbbec4;
		margin-left: auto;
		margin-right: auto;
	}
</style>

<template>
	<Card :bordered="false" class="dishes" >
		<Row>
			<Col span="4">
				<div id="photo-list">
					<img :src="image" style="height:100%;width:100%;">
				</div>
			</Col>
			<Col span="4">
				<p>{{dishname}}</p>
				<p style="font-size: 18px; color: #80848f;">{{description}}</p>
			</Col>
			<Col span="2">
				<p>价格：</p>
				<p>{{price}}</p>
			</Col>
      <Col span="2">
        <p>规格：</p>
        <p>{{newSpec}}</p>
      </Col>
      <Col span="2">
        <p>类别：</p>
        <p>{{categoryName}}</p>
      </Col>
      <Col span="2">
        <p>份数：</p>
        <p>{{newunit}}</p>
      </Col>
      <Col span="2">
        <p>编码：</p>
        <p>{{newCode}}</p>
      </Col>
      <Col span="2">
        <p>状态：</p>
        <p>{{newStatus}}</p>
      </Col>
			<Col span="2">
				<p>月销量：</p>
				<p>------</p>
			</Col>

		</Row>
		<ButtonGroup style="float: right" id="buttongroup">
      <Button type="primary" v-on:click="modal1 = true">修改</Button>
      <Button v-on:click="$emit('remove')">删除</Button>
      <Modal width=700 v-model="modal1" @on-ok="ok" @on-cancel="cancel" :mask-closable="false" :closable="false">
        <h2 slot="header">修改菜品</h2>

        <Editwindow v-bind:srcdescription="this.description"
              v-bind:srcdishname="this.dishname"
              v-bind:srcimage="this.image"
              v-bind:srcdishprice="this.price"
              v-bind:srcdishcode="this.newCode"
              v-bind:getSelectedCategoryName="this.categoryName"
              v-bind:getSelectedNewSpec="this.newSpec"
              v-bind:getSelectedNewUnit="this.newunit"
              v-bind:getSelectedNewStatus="this.newStatus"
              v-on:UpdateDish="Refresh"
              ref="editwin"></Editwindow>
      </Modal>
      <Modal v-model="modal2">
        <Input></Input>
      </Modal>
    </ButtonGroup>
		<hr style="margin-top: 20px" />


	</Card>
</template>

<script>
  // let getSelectedCategoryName = ''
  //引入子组件
	import Editwindow from '@/components/Editwindow'
	export default {
		data() {
			return {
				modal1: false,
				modal2: false,
				tempname: '',
				tempdescription: '',
				tempprice: '',
				tempimage: '',
        tempCode: '',
        tempCategoryName: '',
        tempNewSpec: '',
        tempNewUnit: '',
        tempNewStatus: '',
				change: false
			}
		},
		methods: {
			ok() {

				if (this.change == true) {

					if (this.tempname=='') {
						this.$Modal.warning({
							title: '菜品名称不能为空',
							content: '请输入菜品名称'
						});

					} else if (this.tempdescription=='') {

						this.$Modal.warning({
							title: '菜品描述不能为空',
							content: '请输入菜品描述'
						});

					} else if (this.tempprice=='') {

						this.$Modal.warning({
							title: '菜品价格不能为空',
							content: '请输入菜品价格'
						});

					} else if (this.tempimage=='') {

						this.$Modal.warning({
							title: '菜品图片不能为空',
							content: '请上传菜品图片'
						});

          } else if (this.tempCode=='') {

            this.$Modal.warning({
              title: '菜品编码不能为空',
              content: '请填写编码，类别首字全拼加数字，且首字母大写，数字为该类菜品所加的第几个，如Rou1'
            });

          } else if (this.tempCategoryName=='') {

            this.$Modal.warning({
              title: '菜品类别不能为空',
              content: '请选择类别'
            });

          } else if (this.tempNewSpec=='') {

            this.$Modal.warning({
              title: '菜品规格不能为空',
              content: '请选择规格'
            });

          } else if (this.tempNewUnit=='') {

            this.$Modal.warning({
              title: '份数不能为空',
              content: '请选择份数'
            });

          } else if (this.tempNewStatus=='') {

            this.$Modal.warning({
              title: '状态不能为空',
              content: '请选择状态'
            });

          } else {
						this.$Modal.confirm({
						title:'确认修改',
						content:'确认对菜品信息进行修改？',
						loading:true,
						onOk: () => {

							var _this = this;
							this.axios.put('api/food/4/'+this.dishid, {
								food_name: _this.tempname,
								description: _this.tempdescription,
								price:_this.tempprice,
								image:_this.tempimage,
                newSpec:_this.tempNewSpec,
                categoryName:_this.tempCategoryName,
                newStatus:_this.tempNewStatus,
                newUnit:_this.tempNewUnit,
                newCode:_this.tempCode,
								priority:1,

							})
							.then(function(response) {
								_this.$Modal.remove();
								_this.$Message.success('修改成功！');
								console.log(response);
								_this.dishname = _this.tempname;
								_this.description = _this.tempdescription;
								_this.price = _this.tempprice;
								_this.image = _this.tempimage;
                _this.newSpec = _this.tempNewSpec;
                _this.categoryName = _this.tempCategoryName;
                _this.newStatus = _this.tempNewStatus;
                _this.newUnit = _this.tempNewUnit;
                _this.newCode = _this.tempCode;
							})
							.catch(function(error) {
								_this.$Modal.remove();
								_this.$Message.error('修改失败！');
								console.log(error);
							});

						}
						});
					}

				}
				this.change = false;
			},
			cancel() {
				this.$refs.editwin.reset()
			},
			Refresh(data) {
				this.tempname = data.EditedName;
				this.tempdescription = data.EditedDescription;
				this.tempprice = data.EditedPrice;
				this.tempimage = data.EditedImage;
        this.tempCode = data.EditedCode;
        this.tempCategoryName = data.EditedCategory;
        this.tempNewSpec = data.EditedNewSpec;
        this.tempNewUnit = data.EditedNewUnit;
        this.tempNewStatus = data.EditedNewStatus;
				this.change = true;
			}
		},
    props: ['dishname', 'description', 'price', 'dishid', 'image', 'newSpec', 'categoryName','newStatus', 'newunit', 'newCode'],
    // mounted() {
    //   getSelectedCategoryName = this.categoryName
    // },
    components: {
			Editwindow
		}
	}
</script>
