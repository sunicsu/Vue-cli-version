<style>
    /* 设置下拉菜单的高度和行高 */
.select {
      height: 40px;       /* 设置下拉菜单的高度 */
      line-height: 80px;
      width: 130px;/* 设置行高以匹配高度 */
      border-color: #dbdce0;
      color: #2b2b2c;
      /* 其他需要的样式 */
    }
.Input {
      height: 40px;       /* 设置下拉菜单的高度 */
      /*line-height: 80px;*/
      width: 150px;/* 设置行高以匹配高度 */
      border-color: #dbdce0;
}
    /* 设置下拉选项的样式 */
option {
      color: #2b2b2c;/* 可以在这里设置选项的其他样式，但高度不能直接设置 */
    }
.textarea-style {
      width: 250px; /* 设置宽度为100% */
      min-height: 100px; /* 设置最小高度为100px */
      /* 其它样式 */
}

</style>
<template>
	<div>
		<Row span="24">
		<Col span="8">
			<div id="photo" v-if="upload_finished==true">
				<img :src="this.image_url" style="height:100%;width:100%;">
			</div>
			<br/><br/>
			<Upload action="/api/upload_image" style="float:right; margin-right:24px;" :on-success="handleSuccess" name="image" ref="upload">
				<Tooltip content="图片名称不能包含中文字符" placement="left">
				<Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
				</Tooltip>
			</Upload>
		</Col>
    <Col span="6">
      <div>
        <p style="float: left">选择分类</p>
        <br></br>
        <select class="select" v-model="selectedCategoryName">
          <option value="" disabled >请选择一个选项</option>
          <option v-for="option in options" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
            {{ option.text }}
          </option>
        </select>
      </div>
      <p style="float: left">规格</p>
      <br></br>
      <select class="select" v-model="selectedNewSpec">
        <option disabled value="">请选择规格</option>
        <option v-for="option in options1" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
          {{ option.text }}
        </option>
      </select>
      <p>份数</p>
      <select class="select" v-model="selectedNewUnit">
        <option disabled value="">请选择可点份数</option>
        <option v-for="option in options2" :key="option.value" :value="option.value" :autofocus="true" @on-change="DeliverData">
          {{ option.text }}
        </option>
      </select>
      <p>状态</p>
      <select class="select" v-model="selectedNewStatus">
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

		</Row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				image_url:'',
				upload_finished:false,
				srcdishname:'',
        srcdishcode:'',
				srcdescription:'',
				srcdishprice:'',
        selectedCategoryName: '',
        selectedNewSpec: '',
        selectedNewUnit: '',
        selectedNewStatus: '',
        options: [
          { text: '涮品', value: '涮品' },
          { text: '肉类', value: '肉类' },
          { text: '蔬菜', value: '蔬菜' }
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
		methods: {
			DeliverData() {
				let data = {
					EditedName: this.srcdishname,
					EditedDescription: this.srcdescription,
					EditedPrice: this.srcdishprice,
					EditedImage: this.image_url,
          EditedCode: this.srcdishcode,
          EditedCategory: this.selectedCategoryName,
          EditedNewSpec: this.selectedNewSpec,
          EditedNewUnit: this.selectedNewUnit,
          EditedNewStatus: this.selectedNewStatus
				};
				this.$emit('AddNewDish', data);
			},
			handleSuccess (res, file) {
				console.log(res);
				console.log(file);
				this.image_url = res.url;
				this.upload_finished = true;
				this.DeliverData();
				this.$refs.upload.clearFiles();
			},
			reset() {
				this.upload_finished=false;
				this.$refs.upload.clearFiles();
				this.image_url='';
				this.srcdishprice='';
				this.srcdescription='';
				this.srcdishname='';
        this.srcdishcode="";
        this.selectedCategoryName='';
        this.selectedNewSpec='';
        this.selectedNewUnit='';
        this.selectedNewStatus='';

			}
		}
	}
</script>
