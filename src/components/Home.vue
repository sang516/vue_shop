<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/login_title.png" alt="" />
        <!-- <span>电商平台管理系统</span> -->
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
            <template slot="title">
              <i :class="`el-icon-${iconsObj[item.id]}`"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item 
            v-for="subItem in item.children" 
            :key="subItem.id" :index="'/'+subItem.path" 
            @click="saveNavStatus('/'+subItem.path)"
              ><template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      menuList:[],
      iconsObj:{
        '125':'user-solid',
        '103':'s-management',
        '101':'shopping-bag-2',
        '102':'s-order',
        '145':'s-platform'
      },
      isCollapse:false,
      activePath:''
    }
  },
  created(){
    this.getMenuList();
    this.activePath = sessionStorage.getItem('activePath');
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
      const {data:res} = await this.$http.get('menus');
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList=res.data;
    },
    toggleCollapse(){
      this.isCollapse = ! this.isCollapse;
    },
    saveNavStatus(path){
      sessionStorage.setItem('activePath',path);
      this.activePath = path;
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
i[class^="el-icon-"] {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>