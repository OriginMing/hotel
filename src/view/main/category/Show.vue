<template>
  <div>
    <el-form :inline="true" :model="search">
      <el-form-item label="分类名称">
        <el-input v-model="search.cname" placeholder="分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="categories">
      <el-table-column prop="cid" label="ID"></el-table-column>
      <el-table-column prop="cname" label="分类名称"></el-table-column>
      <el-table-column prop="cdesc" label="分类描述"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.cid)" type="text" size="small">编辑</el-button>
<!--          <router-link :to="{path:'/categoryedit',query:{cid:scope.row.cid}}">编辑</router-link>-->
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginate">
      <el-pagination
          :total="total"
          :page-size.sync="paginate.limit"
          :current-page.sync="paginate.page"
          layout="total,prev,pager,next,jumper"
          @current-change="handlerCurrentPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {URL, SUCCESS, FAIL} from "@/lib/base";

export default {
  name: "Show",
  data() {
    return {
      //搜索条件
      search: {cname: ''},
      //分页
      paginate: {
        page: 1,
        limit: 3
      },
      categories: [],
      total: 10
    }
  },
  methods: {
    initCategory() {
      let url = URL + '/admin/category/index';
      console.log(url);
      let token = sessionStorage.getItem('token');
      let params = Object.assign({}, this.paginate, this.search);
      console.log(params)
      
      axios({
        method: 'GET',
        url,
        params,
        headers: {
          token
        }
      }).then(res => {
        if (res.status && res.data.code === SUCCESS) {
          if (res.data.data) {
            this.categories = res.data.data;
            this.total = res.data.total;
          } else {
            this.$message.info(res.data.msg)
          }
        }
      }).catch(() => {
        FAIL
      })
    },
    handlerCurrentPageChange(val) {
      this.paginate.page = val;
      this.initCategory()
    },
    handleSearch() {
      this.paginate.page = 1;
      this.initCategory()
    },
    handleEdit(cid) {
      // console.log(scope);
      this.$router.push({path: '/categoryedit', query: {cid}})
    }
  },
  mounted() {
    this.initCategory();
  }
}
</script>

<style scoped>

</style>