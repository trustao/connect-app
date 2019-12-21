<template>
    <div v-loading="loading" style="padding-bottom: 40px;">
        <h1>{{pageData.title}}</h1>
        <el-collapse v-model="activeNames">
            <el-collapse-item v-if="pageData.info" title="介绍" name="1">
                <div class="info-wrap" v-if="pageData.info.desc">
                    <div>
                        <img :src="pageData.info.cover_img" alt="">
                    </div>
                    <div class="info-main">
                        <p v-for="(item, index) in pageData.info.desc" :key="index">
                            <b>{{item.title}}</b>
                            <template v-for="(text, i) in item.data">
                                <el-button class="btn" type="text" v-if="text.url" :key="i" @click="jump(text.url)">
                                    {{text.text}}
                                </el-button>
                                <span v-else :key="i" :title="text.url">{{text.text}}</span>
                            </template>
                        </p>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item v-if="pageData.info && pageData.info.images && pageData.info.images.length" title="图片" name="2">
                <el-image v-for="(e,i) in pageData.info.images" :key="i" :src="e" class="img"></el-image>
            </el-collapse-item>
            <el-collapse-item v-if="pageData.magnetic && pageData.magnetic.length" title="下载" name="3">
                <DownloadTable :tableData="pageData.magnetic"></DownloadTable>
            </el-collapse-item>
            <el-collapse-item title="列表" name="4">
                <div class="link-wrap">
                    <Link v-for="(item, i) in links" :key="i" :linkData="item"/>
                </div>
            </el-collapse-item>
            <el-collapse-item v-if="pageData.others && pageData.others.length" title="其他" name="5">
                <div class="link-wrap">
                    <el-tag v-for="(item, i) in pageData.others" :key="i">
                        <router-link :to="item.url">{{item.title}}</router-link>
                    </el-tag>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
  import Link from './Link'
  import DownloadTable from './DownloadTable'
  import {fetchData} from '../utils/request'

  export default {
    name: "viewer",
    components: {Link, DownloadTable},
    data() {
      return {
        pageData: {},
        activeNames: ['1', '2', '3', '4'],
        loading: true,
      }
    },
    computed: {
      links() {
        return (this.pageData && this.pageData.links) || []
      },
      routes () {
        return this.$store.state.routes
      },
      storePageData () {
        return this.$store.state.pageData[this.$route.fullPath] || {}
      }
    },
    watch: {
      $route () {
        this.pageData = {}
        this.$nextTick(() => {
          this.checkAlive()
        })
      }
    },
    created() {
      this.checkAlive()
    },
    methods: {
      checkAlive () {
        if (this.storePageData.title && this.routes.includes(this.$route.fullPath)) {
          this.pageData = this.storePageData
          this.loading = false
        } else {
          this.pageInit()
        }
      },
      pageInit() {
        const link = this.$route.fullPath
        const {type} = this.$route.params
        this.loading = true
        this.$store.commit('addRoute', link)
        fetchData(link, type).then(res => {
          console.log('received')
          if (link === this.$route.fullPath) {
            this.pageData = res
          }
          this.$store.commit('setPageData', {path: link, data:res})
          this.loading = false
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      },
      jump(link) {
        this.$router.push(link)
      }
    }
  }
</script>

<style lang="less" scoped>
    h1 {
        margin-bottom: 30px;
    }

    .link-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px 0;
    }

    .info-wrap {
        display: flex;

        img {
            width: 200px;
        }

        .info-main {
            flex: 1;
            margin-left: 20px;

            p {
                margin: 0 0 10px;

                b:after {
                    content: ':';
                }

                > * {
                    margin-right: 10px;
                }

                .btn {
                    padding: 0;
                }
            }
        }

    }

    .img {
        display: block;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }
</style>