<template>
    <el-container>
        <el-card>
            <div class="tt-header">
                {{ title }}  {{ sno }}
            </div>
            <div v-if="showError" class="tt-body">
                {{ errorMsg }}
            </div>
            <div class="tt-body">
                {{ ptext }}
            </div>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="译文" name="1">
                    <div class="tt-transbody">
                        {{ ttext }}
                    </div>
                </el-collapse-item>
                <el-collapse-item title="解读" name="2">
                    <div class="tt-transbody">
                        {{ tcomment }}
                        <p> {{ tcaption }} </p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </el-container>
</template>

<script>
export default {
  name: 'EveryDay',
  component: {
  },
  data () {
    return {
      title: '',
      sno: '',
      ptext: '',
      ttext: '',
      tcomment: '',
      tcaption: '',
      activeName: '0',
      showError: false,
      errorMsg: ''
    }
  },
  mounted () {
      this.$fetch('/everyday', { openid: 12341234 }).then(response => {
          console.log(response)
          this.title = response.subHead
          this.sno = response.seqNo
          this.ptext = response.content
          this.ttext = response.translate
          this.tcomment = response.comment
          this.tcaption = response.caption
          if (!response.content) {
              this.showError = true
              this.errorMsg = response
          }
      })
  }
}
</script>

<style scoped>
.el-card {
    width: 100%;
    padding: 6px 6px;
    overflow-y: scroll;
}
.tt-header {
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
}
.tt-body {
    text-align: justify;
    padding: 6px 6px;
}
.tt-transbody {
    font-size: 15px;
    padding: 6px 6px;
    text-align: justify;
}
</style>>
