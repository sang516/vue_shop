<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="rightsList" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
              <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
              <el-tag type="warning" v-else>三级权限</el-tag>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      rightsList:[]
    }
  },
  created(){
    this.getRigthsList();
  },
  methods:{
    async getRigthsList(){
      const {data:res} = await this.$http.get('rights/list');
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.rightsList = res.data;
    }
  }
}
</script>

<style>

</style>