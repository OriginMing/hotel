<template>
  <div>
    <loading :isshow="showLoading"></loading>
    <el-form :model="stayhomeform" ref="stayhomeform">
      <el-form-item label="所属分类">
        <el-select v-model="stayhomeform.cid" placeholder="请选择">
          <el-option
            v-for="item in categorys"
            :key="item.cid"
            :label="item.cname"
            :value="item.cid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民宿名称">
        <el-input v-model="stayhomeform.sname"></el-input>
      </el-form-item>
      <el-form-item label="民宿描述">
        <el-input type="textarea" v-model="stayhomeform.sdesc"></el-input>
      </el-form-item>
      <el-form-item label="民俗标签">
        <el-input v-model="stayhomeform.stag"></el-input>
      </el-form-item>
      <el-form-item label="民宿评分">
        <el-input v-model="stayhomeform.score"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="stayhomeform.sprice"></el-input>
      </el-form-item>
      <el-form-item label="民宿省份" v-if="province.length">
       
        <el-select  v-model="stayhomeform.sprovince">
          <el-option v-for="(item,index) in province" :key="index" :value="item" ></el-option>
        </el-select>
      </el-form-item>

        <el-form-item label="民宿城市" v-if="citylist.length">
        <el-select  v-model="stayhomeform.scity">
          <el-option v-for="(item,index) in citylist" :key="index" :value="item" ></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="民宿地区" v-if="area.length">
        <el-select  v-model="stayhomeform.sarea">
          <el-option v-for="(item,index) in area" :key="index" :value="item" ></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="民宿地址">
        <el-input v-model="stayhomeform.saddress"></el-input>
      </el-form-item>
      <el-form-item label="民宿缩略图"></el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="uploadurl"
          :show-file-list="false"
          :on-success="handleThumbSuccess"
          :before-upload="beforeThumbUpload"
        >
          <img v-if="stayhomeform.sthumb" :src="IMGURL+stayhomeform.sthumb" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="民宿轮播图"></el-form-item>
      <el-form-item>
        <el-upload
          multiple
          :limit="3"
          class="avatar-uploader"
          :action="uploadurl"
          list-type="picture-card"
          :on-success="handleBannerSuccess"
          :on-remove="handleBannerRemove"
          :on-preview="handleBannerCardPreview"
        >
          <img v-if="stayhomeform.sbanner" :src="IMGURL+stayhomeform.sbanner" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="民宿详情"></el-form-item>
      
      <el-form-item>
        <div id="sdetail" ref="sdetail"></div>
      </el-form-item>
      <el-form-item label="入住须知"></el-form-item>
      <el-form-item>
        <rich :menus='["head"]' :value="stayhomeform.snotice" @change-rich="setSnotice" fromfield="snotice"></rich>
      </el-form-item>
      <el-form-item>
        <el-button @click="addAll">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <img width="50%" :src="dialogPreviewImgs" alt />
    </el-dialog>
  </div>
</template>

<script>
import { SUCCESS, URL, IMGURL } from "@/lib/base";
import loading from "../../../loading/loading";
import Rich from "../../../components/rich/Rich";
import E from "wangeditor";
import  city  from "../../../lib/city.json"
import instance from '../../../http/http';

export default {
  
  name: "stayhomeadd",
  components: {
    loading,
    Rich,
  },
  data() {
    return {
      showLoading: true,
      IMGURL,
      uploadurl: URL + "/admin/upload/index",
      bannerArr: [],
      categorys: [],
      dialogVisible: false,
      dialogPreviewImgs: "",
      city,
      province:[],
    
      stayhomeform: {
       
        sname: "",
        sdesc: "",
        sthumb: "",
        sprice: "",
        stag: "",
        sprovince:"",
        scity: "",
        sarea: "",
        saddress: "",
        sbanner: "",
        snotice: "",
        sdetail: "",
        cid: "",
        score: "",
      },
    };
  },
  methods: {
    initCategory() {
      this.showLoading = true;
      let url = URL + "/admin/category/indexall";

      console.log(url);
      let token = sessionStorage.getItem("token");
      this.$http({
        url,
        headers: {
          token,
        },
      }).then((res) => {
        if (res.status === 200 && res.data.code === SUCCESS) {
          this.showLoading = false;
          console.log(res);
          if (res.data.data) {
            this.categorys = res.data.data;
          }
        }
      });
    },
    //缩略图上传成功
    handleThumbSuccess(res) {
      if (res.code === SUCCESS) {
        this.stayhomeform.sthumb = res.imgpath;
        console.log(res.imgpath);
      }
    },
    beforeThumbUpload(file) {
      let { size, type } = file;
      let uploadMax = 200 * 102400;
      let uploadType = ["image/jpg", "image/png", "image/webp", "image/jpeg"];
      let sizeFlage = true,
        typeFlag = true;
      sizeFlage = size < uploadMax;
      typeFlag = uploadType.some((ele) => ele == type);

      if (!typeFlag) {
        this.$message.error("格式错误i");
      }
      if (!sizeFlage) {
        this.$message.error("图片过大");
      }
      return sizeFlage && typeFlag;
    },
    handleBannerSuccess(res) {
      
      this.bannerArr.push(res.imgpath);
      this.stayhomeform.sbanner = this.bannerArr.join(",");
      console.log(this.stayhomeform.sbanner,"哈哈啊哈哈");
    },
    handleBannerRemove(file) {
      console.log(file);
      let url = file.response.imgpath;
      this.bannerArr = this.bannerArr.filter((ele) => {
        ele != url;
      });
      this.stayhomeform.sbanner = this.bannerArr.join(",");
    },
    handleBannerCardPreview(file) {

      let url = this.IMGURL + file.response.imgpath;
      console.log(url);
      this.dialogPreviewImgs = url;
      this.dialogVisible = true;
    },
    initWangEditor() {
      let edit = new E(this.$refs.sdetail);

      let that = this;
      edit.customConfig.uploadImgServer = this.uploadurl;
      edit.customConfig.uploadFileName = "file";
      edit.customConfig.onchange = (html) => {
        console.log(html);
        this.stayhomeform.sdetail = html;
      };
      edit.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result) {
          insertImg(that.IMGURL + result.imgpath);
        },
      };
      edit.create();
    },
    setSnotice(field, html) {
      this.stayhomeform[field] = html;
    },
    setProvince(){
    this.province = this.city.map(ele=>{
     return ele.name })
    },
    addAll(){
     let params= this.stayhomeform
      instance.post("/api/stayhome",params).then(res=>{
        this.$message.success(res.msg)
        this.$router.push({name:"stayhomeindex"})
      }).catch(error=>{
        console.log(error);
        this.$message.error("添加失败")

      })
       }
  },
  computed:{
    
    citylist(){
      let citylist=[];
    
      let currentPro=this.city.find(ele=>ele.name=== this.stayhomeform.sprovince)
      if(currentPro){
        citylist  =  currentPro.city.map(ele=>ele.name)
      }
         return  citylist;
    
    },
    area(){
      let area=[];
      let current=this.city.find(ele=>ele.name===this.stayhomeform.sprovince)
      if(current){
        let city= current.city.find(ele=>ele.name===this.stayhomeform.scity);
        if(city){
          area = city.area;
           
        }
       
      }
    return  area;
         
    }
  },
  mounted() {
    this.setProvince();
    this.initCategory();
    console.log("hhhh")
    this.initWangEditor();
  },
};
</script>

<style>
.el-icon-plus.avatar-uploader-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>