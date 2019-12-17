<template>
    <div>
        <div class="wrap">
            <el-input v-model="protocol"></el-input>
            <el-input v-model="host"></el-input>
            <el-input v-model="path"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search" v-loading="loading"></el-button>
        </div>
        <div>
            {{text}}
        </div>
    </div>

</template>

<script>
import {customR} from "../utils/request";

export default {
  name: 'HelloWorld',
  data () {
    return {
      protocol: '',
      host: '',
      path: '',
      loading: false,
      text: ''
    }
  },
  methods: {
    search () {
      const {protocol, host, path} = this
      if ([protocol, host, path].some(i => !i)) return
      this.loading = true
      customR({protocol, host, path}).then(value => {
        this.loading = false
        this.text = value
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 300px;
    margin: 40px auto;
}
</style>
