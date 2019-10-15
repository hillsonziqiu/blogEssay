<template>
  <div class="infinity-table">
    <div class="header">
      <ul>
        <li>
          <p v-for="item in columns" :key="item.dataIndex">{{item.title}}</p>
        </li>
      </ul>
    </div>
    <div class="content" @scroll="handleContentScroll">
      <ul ref="infinityTableContent">
        <li v-for="(item, i) in dataSrc" :key="i">
          <div class="col-block" v-for="it in columns" :key="it.dataIndex">
            <p v-if="!it.hasOwnProperty('render')">{{item[it.key]}}</p>
            <!-- <div v-else> -->
            <slot :name="it.key" :row="item"></slot>
            <!-- </div> -->
          </div>
        </li>
        <li class="is-loading" v-if="!isDone">{{this.loadingText}}</li>
        <li v-if="isDone && dataSrc.length > 11" class="is-done">{{this.loadedText}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfinityTable',
  props: {
    // 表头的配置
    columns: {
      type: Array,
      required: true
    },
    // 数据源
    dataSrc: {
      type: Array,
      default: []
    },
    // 加载中的文案配置
    loadingText: {
      type: String,
      default: '加载中...'
    },
    // 加载完的文案配置
    loadedText: {
      type: String,
      default: '没有更多了'
    },
    // 距离底部多少开始请求
    offset: {
      type: Number,
      default: 10
    },
    // 是否允许再请求
    loading: {
      type: Boolean,
      default: false
    },
    // 是否加载完成
    isDone: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleContentScroll(e) {
      // console.log('a', e.target.scrollTop + e.target.offsetHeight)
      // console.log('b', this.$refs.infinityTableContent.offsetHeight)
      const innerUl = e.target.getElementsByTagName('ul')[0]
      if (e.target.scrollTop + e.target.offsetHeight >= innerUl.offsetHeight - this.offset) {
        if (this.loading || this.isDone) {
          return false
        }
        this.$emit('toTheBottom')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.infinity-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #dcdcdc;
  height: 280px;
  font-size: 12px;
  .header {
    width: 100%;
    background: #f7f8fa;
    ul {
      li {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0 40px;
        p {
          flex: 1;
          line-height: 40px;
        }
      }
    }
  }
  .content {
    width: 100%;
    overflow: auto;
    ul {
      li {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0 40px;
        border-bottom: 1px solid #e4e4e4;
        line-height: 40px;
        .col-block {
          flex: 1;
          line-height: 40px;
        }
      }
      .is-loading {
        display: block;
        text-align: center;
      }
      .is-done {
        display: block;
        text-align: center;
      }
    }
  }
}
</style>