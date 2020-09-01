<template>
  <el-container style="text-align:center">
    <el-header>传习录</el-header>
    <el-main >
      <el-button @click.native='toEveryDay'>每日一篇</el-button>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  methods: {
    toEveryDay: function (event) {
      this.$router.push('/everyDay')
    }
  }
}
</script>
<style scoped>
.el-header {
  margin: 20px 0;
  line-height: 60px;
  color: #333;
  font-size: 24px;
}
.el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
