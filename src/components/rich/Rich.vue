<template>
  <div>
   <div  id="edit" ref="edit"></div>
 
  </div>
</template>

<script>
import E from 'wangeditor'
import{IMGURL,URL} from '../../lib/base'
export default {
    name:"Rich",
    props:{
      menus:{
          type:Array,
          default:function(){
              return [
    'head',  // 标题
    'bold',  // 粗体
    'fontSize',  // 字号
    'fontName',  // 字体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'image',  // 插入图片
    'table',  // 表格
    'video',  // 插入视频
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
]
          }
      },
      value:{
          type:String,
          default:""
      },
       formfield:{
        required:true,
        type:String
    },
   
    },
    data(){
        return{
            IMGURL,
            uploadurl:URL+'/admin/upload/index'
        }
    },
 methods:{
 initRichText(){
let edit = new E(this.$refs.edit);

   
  /*   let that = this; */
   
    edit.customConfig.menus=this.menus;
    console.log("111111111111111111")
    console.log(this)
       edit.customConfig.uploadImgServer = this.uploadurl;
       edit.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
       edit.customConfig.uploadFileName = 'file'
       edit.customConfig.onchange = (html)=> {
         console.log(html)
         this.$emit("change-rich",this.formfield,html);
      /*       this.stayhomeform[this.fromfield]=html;
            console.log(this.fromfield) */
            
        }
        edit.customConfig.uploadImgHooks = {
       customInsert: function (insertImg, result) {
        insertImg(this.IMGURL+result.imgpath)
    }
     
     }
      edit.create();
     this.value&&edit.txt.html(this.value)
 },
},
mounted(){
    this.initRichText();
}

}
</script>

<style>

</style>