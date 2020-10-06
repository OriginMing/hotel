<template>
  <div>
    <loading :isshow="isShow"></loading>
    <el-form inline :model="stayhome">
      <el-form-item label="所属分类">
      </el-form-item>
      <el-form-item label="民宿名称">
        <el-input v-model="stayhome.sname"></el-input>
      </el-form-item>
      <el-form-item label="民宿名称">
        <el-input v-model="search.scity"></el-input>
      </el-form-item>
      <el-form-item label="民宿名称">
        <el-button> 提交 </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="stayhome">
        <el-table-column label="ID" prop="sid"></el-table-column>
        
        <el-table-column label="名称" prop="sname"></el-table-column>
        <el-table-column label="描述" prop="sdesc"></el-table-column>
        <el-table-column label="价格" prop="sprice"></el-table-column>
        <el-table-column label="标签" >
             <template slot-scope="scope">
                <el-button v-for="(item) in scope.row.stag.split(/,|，/)" :key="item">{{item}}</el-button>
            </template>
        </el-table-column>
        <el-table-column label="位置" >
            <template slot-scope="scope">
                <span>{{scope.row.sprovince}}---{{scope.row.scity}}--------{{scope.row.sarea}}</span>
            </template>
        </el-table-column>
         <el-table-column label="缩略图" >
           <template>
              <img v-for="item in scope" :key="item.sid" :src="item.sthumb" alt="" class="type_img">
           </template>
         </el-table-column>
          <el-table-column label="创建时间" prop="stime">
           <template slot-scope="scope">
             <span>{{scope.row.stime|formateTime}}</span>
           </template>
         </el-table-column>
        <el-table-column label="操作">
              <template slot-scope="scope">
                    <el-button  type="info">删除</el-button>
                   
                        <el-button @click="homestayedit(scope.row.sid)" type="text">
                            编辑
                        </el-button>
                   
                </template>
            </el-table-column>
    </el-table>
  </div>
</template>

<script>
import instance from "../../../http/http";
import loading from "../../../loading/loading";
export default {
  components: {
    loading,
  },
  data() {
    return {
      isShow:false,
      search: { sname: "", scity: "", cid: "" },
      paginate: { limit: 10, page: 1 },
      stayhome: [],
    };
  },

  methods: {
    initStayhome() {
      this.isShow = true;
      let params = Object.assign({}, this.search, this.paginate);
      instance.get("/api/stayhome", {
          params,
        })
        .then((res) => {
          this.isShow = false;
          console.log("首页加载",res)
          if(res.data){ 
            this.stayhome=res.data
          this.total=res.total}
          else{
                 this.$message.error("暂无数据")
          }
        })
        .catch(() => {});
    },
    homestayedit(sid){
     this.$router.push({name:'homestayedit',params:{id:sid}})
    }
  },
  mounted() {
    this.initStayhome();
  },
};

</script>

<style>
</style>