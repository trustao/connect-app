<template>
    <el-container ref="container" class="container">
        <el-header class="header">
            <div class="menu-btn" @click="drawer = !drawer">
                <i :class="drawer ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            </div>
            <el-input class="input-zone" placeholder="请输入内容" v-model="val">
                <el-button slot="append" icon="el-icon-search" @click="search" v-loading="loading"></el-button>
            </el-input>
        </el-header>
        <el-container class="main-wrap">
            <el-drawer
                    :visible.sync="drawer"
                    direction="ltr">
                <div slot="title">
                    <el-input placeholder="跳转" v-model="jumpUrl">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option v-for="i in options" :key="i" :label="i" :value="i"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-s-promotion" @click="jumpTo"></el-button>
                    </el-input>
                    <p></p>
                </div>
                <el-menu :default-active="$route.fullPath" class="el-menu-vertical-demo" router>
                    <el-menu-item v-for="(path) in routes" :key="path" :index="path">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{path}}</span>
                        <i class="el-icon-close" @click.stop="remove(path)"></i>
                    </el-menu-item>
                </el-menu>
            </el-drawer>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  import {searchData} from '../utils/request'

  export default {
    name: "layout",
    data() {
      return {
        val: '',
        drawer: false,
        loading: false,
        jumpUrl: '',
        select: '',
        options: [" ", "/list/release_date/", "/type/2/", "/list/hot_download/", "/play_list/", "/snp_list/", "/type/3/", "/stars/", "/series/213997/", "/series/215066/", "/series/217739/", "/series/13499/", "/companies", "/type/1/", "/type/4/", "/type/5/"]
      }
    },
    computed: {
      routes() {
        return this.$store.state.routes
      }
    },
    watch: {
      $route() {
        this.$refs.container.$el.scrollTo(0, 0)
      }
    },
    methods: {
      search() {
        this.loading = true
        const key = this.val
        searchData(key).then((res) => {
          const path = '/search/' + key
          if (res.code === 0) {
            this.$store.commit('addRoute', path)
            this.$store.commit('setPageData', {path, data: res.data})
            this.$nextTick(() => {
              this.$router.push(path)
            })
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false

        })
      },
      remove(path) {
        this.$store.commit('removeRoute', path)
        if (!this.routes.length) {
          this.$router.push('/')
          return
        }
        if (path === this.$route.fullPath) {
          this.$router.push(this.routes[0])
        }
      },
      jumpTo () {
        this.$router.push(this.select.trim() + this.jumpUrl)
      }
    }
  }
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: auto;
    }

    .header {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px solid #42b983;
        box-shadow: 0 0 8px -4px rgba(0, 0, 0, .4);

        .input-zone {
            width: 600px;
        }

        .menu-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 30px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 24px;
            cursor: pointer;
        }
    }

    .main-wrap {
        flex: 1
    }

    .left {
        background: #42b983;
    }

    .el-icon-close {
        float: right;
        margin-top: 16px;
    }
</style>