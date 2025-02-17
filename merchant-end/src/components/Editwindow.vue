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
  /* 设置下拉菜单的高度和行高 */
  .select {
    height: 40px;       /* 设置下拉菜单的高度 */
    line-height: 80px;
    width: 150px;/* 设置行高以匹配高度 */
    border-color: #dbdce0;
    color: #2b2b2c;
    /* 其他需要的样式 */
  }
  .Input {
    height: 40px;       /* 设置下拉菜单的高度 */
    /*line-height: 80px;*/
    width: 200px;/* 设置行高以匹配高度 */
    border-color: #dbdce0;
  }
  /* 设置下拉选项的样式 */
  option {
    color: #2b2b2c;/* 可以在这里设置选项的其他样式，但高度不能直接设置 */
  }
  .textarea-style {
    width: 200px; /* 设置宽度为100% */
    min-height: 100px; /* 设置最小高度为100px */
    /* 其它样式 */
  }
</style>


<template>

	<div>
		<Row span="20">
      <Col span="8">
        <div id="photo">
          <img :src="this.newEditedImage" style="height:100%;width:100%;">
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
          <select class="select" v-model="newEditedCategory" @change="DeliverData">
            <option disabled value="" >请选择一个选项</option>
            <option v-for="option in options" :key="option.value" :value="option.value" :autofocus="true" >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div>
          <p style="float: left">规格</p>
          <br></br>
          <select class="select" v-model="newEditedNewSpec" @change="DeliverData">
            <option disabled value="">请选择规格</option>
            <option v-for="option in options1" :key="option.value" :value="option.value" :autofocus="true" >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div>
          <p>份数</p>
          <select class="select" v-model="newEditedNewUnit" @change="DeliverData">
            <option disabled value="">请选择可点份数</option>
            <option v-for="option in options2" :key="option.value" :value="option.value" :autofocus="true">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div>
          <p>状态</p>
          <select class="select" v-model="newEditedNewStatus" @change="DeliverData">
            <option  disabled value="">请选择状态</option>
            <option  v-for="option in options3" :key="option.value" :value="option.value" :autofocus="true">
              {{ option.text }}
            </option>
          </select>
        </div>

      </Col>
      <Col span="6">
        <div>
          <p style="float: left">菜品名称</p>
          <br></br>
          <Tooltip content="菜品名称不能包含中文字符" placement="right-start">
            <Input class="Input" placeholder="请输入菜名..." :autofocus="true" @on-change="DeliverData" v-model="newEditedName"></Input>
          </Tooltip>
        </div>
        <div>
          <p>菜名编码</p>
          <Tooltip content="请输入数字" placement="right-start">
            <Input class="Input" placeholder="请输入菜品定价..." :autofocus="true" @on-change="DeliverData" v-model="newEditedCode"></Input>
          </Tooltip>
        </div>
        <div>
          <p>单价</p>
          <Tooltip content="请输入数字" placement="right-start">
            <Input class="Input" placeholder="请输入菜品定价..." :autofocus="true" @on-change="DeliverData" v-model="newEditedPrice"></Input>
          </Tooltip>
        </div>
        <div>
          <p style="float: left">菜品描述</p>
          <br></br>
          <Tooltip content="菜品描述不能包含中文字符" placement="right-start">
            <Input placeholder="请输入菜品简短描述..." :autofocus="true" @on-change="DeliverData" v-model="newEditedDescription" type="textarea" class="textarea-style"></Input>
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
				upload_finished:false,
        newEditedName: this.srcdishname,
        newEditedDescription: this.srcdescription,
        newEditedPrice: this.srcdishprice,
        newEditedImage: this.srcimage,
        newEditedCode: this.srcdishcode,
        newEditedCategory: this.getSelectedCategoryName,
        newEditedNewSpec: this.getSelectedNewSpec,
        newEditedNewUnit: this.getSelectedNewUnit,
        newEditedNewStatus: this.getSelectedNewStatus,
        options: [
          { text: '肉类', value: "1" },
          { text: '蔬菜', value: "2" },
          { text: '涮品', value: "3" },
          { text: '菌菇', value: "4" },
          { text: '海鲜', value: "5" },
          { text: '锅底', value: "6" },
          { text: '主食', value: "7" },
          { text: '特色锅', value: "8" },
          { text: '豆制品', value: "9" },
          { text: '其它', value: "10" }
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
					EditedName: this.newEditedName,
					EditedDescription: this.newEditedDescription,
					EditedPrice: this.newEditedPrice,
					EditedImage: this.newEditedImage,
          EditedCode: this.newEditedCode,
          EditedCategory: this.newEditedCategory,
          EditedNewSpec: this.newEditedNewSpec,
          EditedNewUnit: this.newEditedNewUnit,
          EditedNewStatus: this.newEditedNewStatus
				};
				this.$emit('UpdateDish', data);
			},
			handleSuccess(res, file) {
				console.log(res);
				console.log(file);
				this.newEditedImage = res.url;
				this.upload_finished = true;
				this.DeliverData();
				console.log(this.newEditedImage);
			},
			reset() {
				this.$refs.upload.clearFiles();
			}
		}
	}
</script>
