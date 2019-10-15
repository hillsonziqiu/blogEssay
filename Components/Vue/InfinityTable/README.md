# 可以滚动翻页的表格组件（列表）

### 背景

公司需要一个组件，表格样式，并且要求可以滚动翻页。所以动手撸了一个可以滚动翻页的组件。开始希望模仿 antd 的实现形式来开发，然后发现我看的 react 组件，jsx 因为可以直接把代码块丢在对象里，渲染的时候直接 render 就好了。但是 vue 好像不大好执行这个东西，实现起来也比较麻烦，仍然参考了一下 antd for vue 的方法。这个方法很取巧: 通过 slot 实现。很有趣，然后就开始尝试手撸代码。

说是表格组件，实际上是列表来实现的，不管咋样吧，先通过列表实现一下基本样式好了。真的要求表格，那么再去做修改。

代码很简单，基本分成两部分，一个是表头部分，一个是 content 部分。表头通过传入的 column 列表来实现，content 部分通过做 v-if 判断展示不同的东西。在这里就要写了 slot 了。如果用到 render 的时候就让他加一个 slot div 上去即可。同时必不可少的还有两个文案，一个是加载中的文案，一个是加载完成的文案。到底部的加载判断，通过 scrollTop + offsetHeight >= content 部分的 offsetHeight 就是到底部了，为了更好的体验，所以增加了一点偏移量所以完整的判断就是

> e.target.scrollTop + e.target.offsetHeight >= this.\$refs.infinityTableContent.offsetHeight - this.offset

### 使用方法

```
import InfinityTable from 'XXXX'


<template>
  <InfinityTable
    :columns="tableColumns"
    :dataSrc="tableSource"
    :loading="isLoadingTable"
    :isDone="isLoaded"
    @toTheBottom="handleAddNextPage">
      <div slot="operation" slot-scope="scope">
        <a @click="() => handleEdit(scope)">修改</a>
        <a @click="() => handleRemove(scope)">删除</a>
      </div>
    </InfinityTable>
</template>

<script>
  data() {
    return {
      tableColumns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: true
        },
      ],
      tableSource: [
        {
          name: '子丘丘',
          sex: '男',
          age: '26',
          operation:
        }
      ],
      isLoadingTable: false,
      isLoaded: false,
      total: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async reqData() {
      return ajax().then(res => {
        this.total = res.data.total
        return res.data.list
      })
    },
    handleAddNextPage() {
      this.currentPage++
      this.isLoaded = true
      const resData = await reqData()
      this.tableSource = [...this.tableSource, ...resData]
      if (this.currentPage >= ~~(this.total / this.pageSize)) {
        this.isLoaded = true
      }
      this.isLoaded = false
    },
    handleEdit(row) {
      // 这里执行编辑操作
      console.log(row)
    },
    handleRemove(row)) {
      // 这里执行删除操作
      console.log(row)
    }
  }
</script>
```

入参
|参数|说明|类型|默认值|
|:-|:-:|:-:|-:|
|columns|列的配置，包含表头信息与内容格式等|{title: string, dataIndex: number, key: string}[]|[]|
|dataSrc|表格数据|{[key]: string: [val] any}[]|[]|
|loadingText|加载中的文案|string|'加载中...'|
|loadedText|加载完成|string|'没有更多了'|
|offset|距离底部多少 px 开始请求下一页的数据|number|10|
|loading|加载中|Boolean|false|
|isDone|是否已经加载完成|Boolean|false|

事件
|事件名称|说明|类型|默认值|
|:-|:-:|-:|
|toTheBottom|到底了，可以开始请求了|void|null|
