<style>
	h2 {
		font-size: 25px;
	}
	p {
		font-size: 15px;
		margin: 5px;
	}
	#photo {
		margin-top: 20px;
		width: 180px;
		height: 180px;
		background-color: gray;
		margin-left: auto;
		margin-right: auto;
	}
</style>


<template>

	<div>
		<Row span="24">
		<Col span="8">
			<div id="photo">
				<img :src="srcimage" style="height:100%;width:100%;">
			</div>
			<br/><br/>
			<Upload action="/api/upload_image" style="float:right; margin-right:24px;" :on-success="handleSuccess" name="image" ref="upload" :before-upload="reset">
				<Tooltip content="图片名称不能包含中文字符" placement="left">
				<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
				</Tooltip>
			</Upload>

		</Col>
    <Col span="6">
      <div>
        <p style="float: left">选择分类</p>
        <br></br>
        <select class="select" v-model="getSelectedCategoryName">
          <option disabled value="" >请选择一个选项</option>
          <option v-for="option in options" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
            {{ option.text }}
          </option>
        </select>
      </div>
      <p style="float: left">规格</p>
      <br></br>
      <select class="select" v-model="getSelectedNewSpec">
        <option disabled value="">请选择规格</option>
        <option v-for="option in options1" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
          {{ option.text }}
        </option>
      </select>
      <p>份数</p>
      <select class="select" v-model="getSelectedNewUnit">
        <option disabled value="">请选择可点份数</option>
        <option v-for="option in options2" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
          {{ option.text }}
        </option>
      </select>
      <p>状态</p>
      <select class="select" v-model="getSelectedNewStatus">
        <option  disabled value="">请选择状态</option>
        <option  v-for="option in options3" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
          {{ option.text }}
        </option>
      </select>
    </Col>
    <Col span="10">
      <div>
        <p style="float: left">菜品名称</p>
        <br></br>
        <Tooltip content="菜品名称不能包含中文字符" placement="right-start">
          <Input class="Input" placeholder="请输入菜名..." :autofocus="true" @on-change="DeliverData" v-model="srcdishname"></Input>
        </Tooltip>
      </div>
      <div>
        <p>菜名编码</p>
        <Tooltip content="请输入数字" placement="right-start">
          <Input class="Input" placeholder="请输入菜品定价..." :autofocus="true" @on-change="DeliverData" v-model="srcdishcode"></Input>
        </Tooltip>
      </div>
      <div>
        <p>单价</p>
        <Tooltip content="请输入数字" placement="right-start">
          <Input class="Input" placeholder="请输入菜品定价..." :autofocus="true" @on-change="DeliverData" v-model="srcdishprice"></Input>
        </Tooltip>
      </div>
      <div>
        <p style="float: left">菜品描述</p>
        <br></br>
        <Tooltip content="菜品描述不能包含中文字符" placement="right-start">
          <Input placeholder="请输入菜品简短描述..." :autofocus="true" @on-change="DeliverData" v-model="srcdescription" type="textarea" class="textarea-style"></Input>
        </Tooltip>
      </div>
    </Col>

      <!--		<Col span="16">-->

<!--			<p style="float: left">菜品名称</p>-->
<!--			<br></br>-->
<!--			<Tooltip content="菜品名称不能包含中文字符" placement="right-start">-->
<!--			<Input placeholder="请输入菜名..." :autofocus="true" @on-change="DeliverData" v-model="srcdishname"></Input>-->
<!--			</Tooltip>-->
<!--			<p>菜品描述</p>-->
<!--			<Tooltip content="菜品描述不能包含中文字符" placement="right-start">-->
<!--			<Input placeholder="请输入描述..." :autofocus="true" @on-change="DeliverData" v-model="srcdescription" type="textarea" :rows="5" ></Input>-->
<!--			</Tooltip>-->
<!--			<p>定价</p>-->
<!--			<Tooltip content="请输入数字" placement="right-start">-->
<!--			<Input placeholder="请输入..." :autofocus="true" @on-change="DeliverData" v-model="srcdishprice"></Input>-->
<!--			</Tooltip>-->
<!--		</Col>-->
		</Row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				upload_finished:false,
        srcdishname:'',
        srcdishcode:'',
        srcdescription:'',
        srcdishprice:'',
        // selectedCategoryName: '',
        // selectedNewSpec: '',
        // selectedNewUnit: '',
        // selectedNewStatus: '',
        options: [
          { text: '肉类', value: "1" },
          { text: '涮品', value: "2" },
          { text: '蔬菜', value: "3" },
          { text: '菌菇', value: "4" },
          { text: '海鲜', value: "5" },
          { text: '主食', value: "6" }
        ],
        options1: [
          { text: '大盘', value: '大盘' },
          { text: '中盘', value: '中盘' },
          { text: '小盘', value: '小盘' }
        ],
        options2: [
          { text: '0.5', value: '0.5' },
          { text: '1', value: '1' }
        ],
        options3: [
          { text: '新品', value: '新品' },
          { text: '热销', value: '热销' }
        ]
			}
		},
		props: ['srcdishname', 'srcdescription', 'srcdishprice', 'srcimage', 'srcdishcode', 'getSelectedCategoryName', 'getSelectedNewSpec', 'getSelectedNewUnit', 'getSelectedNewStatus'],
		methods: {
			DeliverData() {
				let data = {
					EditedName: this.srcdishname,
					EditedDescription: this.srcdescription,
					EditedPrice: this.srcdishprice,
					EditedImage: this.srcimage
				};
				this.$emit('UpdateDish', data);
			},
			handleSuccess(res, file) {
				console.log(res);
				console.log(file);
				this.srcimage = res.url;
				this.upload_finished = true;
				this.DeliverData();
				console.log(this.srcimage);
			},
			reset() {
				this.$refs.upload.clearFiles();
			}
		}
	}
</script>
