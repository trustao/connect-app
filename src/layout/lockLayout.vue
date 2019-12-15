<template>
    <div class="wrap">
        <i class="el-icon-lock"></i>
        <el-input type="password" class="pw-input" placeholder="please input password" v-model="pw"
                  :class="err"></el-input>
        <el-button class="btn" type="primary" icon="el-icon-s-promotion" @click="login" :loading="loading"></el-button>
    </div>
</template>

<script>
  import router from '../router'
  import {loginCheck} from '../utils/request'

  export default {
    name: "lockLayout",
    data() {
      return {
        pw: '',
        err: '',
        loading: false
      }
    },
    watch: {
      pw(val) {
        if (val) {
          this.err = ''
        } else {
          this.err = 'el-form-item is-error'
        }
      }
    },
    methods: {
      login() {
        if (!this.pw) return
        this.loading = true
        loginCheck(this.pw).then(({data}) => {
          if (data.code === 0) {
            this.$store.commit('login', this.pw)
            this.$router.push('/')
          } else {
            this.err = 'el-form-item is-error'
          }
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    .wrap {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        align-items: center;
        justify-content: center;

        .el-icon-lock {
            font-size: 60px;
            color: #CECECE;
        }

        .pw-input {
            width: 300px;
            margin: 40px 0;
        }

        .btn {
            width: 300px;
            font-size: 20px;
            margin-bottom: 40px;
        }
    }
</style>