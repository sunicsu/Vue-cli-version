<style scoped>
	#qrcode {
		margin-left: auto;
		margin-right: auto;
		width: 20%;
	}
	#tableid {
		margin-left: auto;
		margin-right: auto;
		margin-top: 5%;
		width: 17%;
	}
	#notice {
		margin-left: 36%;
		margin-right: auto;
		width: 50%;
	}
	#input {
		margin-left: 43%;
		margin-right: auto;
	}

</style>


<template>
	<Content :style="{padding: '0 16px 16px'}">
  	<Breadcrumb :style="{margin: '16px 0'}">
    	<BreadcrumbItem>主页</BreadcrumbItem>
    	<BreadcrumbItem>定制餐桌二维码</BreadcrumbItem>
    </Breadcrumb>
  	<Card>
      <div style="height: 1000px">
      	<h2 style="color: #80848f">定制餐桌二维码</h2>
      	<h2 id="tableid">餐桌编号：{{result}} {{table_name}}</h2>
      	<br></br>
      	<div id="qrcode"></div>
      	<br></br>
      	<h3 style="color: #9ea7b4" id="notice">输入餐桌编号，点击确定即可生成相应二维码</h3>
      	<br></br>
		    <InputNumber :min="1" v-model="table_id" id="input" @on-change="GetTableName"></InputNumber>
		    <Button type="ghost" shape="circle" v-on:click="generate_qrcode">确定</Button>
      </div>
  	</Card>
  </Content>



</template>

<script>
	import QRCode from 'qrcodejs2'
	export default {
		data() {
			return {
				table_id:1,
				qrcode:'',
				result:1,
        table_name: '富贵',
        status: '',
        station: "",
        // url: 'https://wx.91htwh.top/dist/miniprograme/',
			}
		},
		methods: {
      GetTableName() {
        this.axios.get('/api/get_table_name/' + parseInt(this.table_id))
          .then(res => {
            if(res.status =='200') {
              console.log(res)
              this.$set(this,'table_name', res.data.tableinfo[0].table_name)
              this.$set(this,'status', res.data.tableinfo[0].status)
              this.$set(this,'station', res.data.tableinfo[0].station)
            } else {
              console.log("获取桌名失败")
            }

          })
          .catch(err => {
            console.log('err: ', err)
            if(err.status == '400') {
              console.log("获取桌名失败")
            }
          });

        /* dangerous!! */
        if (this.timeout)
          setTimeout(this.GetTableName.bind(this), 10000);
      },

			UpdateCode() {
				var obj = {
					restaurantId:4,
          table_id:this.table_id,
          table_name:this.table_name,
          status:this.status,
          station:this.station,
          // url:this.url
				};

				this.qrcode.makeCode(JSON.stringify(obj));

				console.log(qrcode);
			},
			generate_qrcode() {
        // this.GetTableName();
				this.UpdateCode();
				this.result=this.table_id;
				this.$Message.config({
					duration: 2
				});
				this.$Message.success('生成二维码成功，餐桌编号为'+this.result);
				this.table_id='';

			}
		},
		mounted() {
			var obj = {
				restaurantId:4,
				table_id: this.table_id,
        table_name: this.table_name,
        status: this.status,
        station: this.station,
        // url:this.url
			};

			this.qrcode = new QRCode('qrcode', {
				width:200,
				height:200,
        colorDark:'#e4e4eb',
        colorLight:'#2b2b2c',
        correctLevel:3,
        text:JSON.stringify(obj)
			});
		}
	}
</script>
