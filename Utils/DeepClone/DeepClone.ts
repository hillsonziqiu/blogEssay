// 深复制
function DeepClone(obj: any) {
  // 如果是基本值类型
  if (typeof obj !== 'object') {
    return obj
  }
  // 定义结果对象
  let copy: any = {}
  // 如果对象是数组，则定义结果数组
  if (obj.constructor === Array) {
    copy = []
  }

  // 遍历对象的key
  for (let key in obj) {
    // 如果key是对象的自有属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      copy[key] = DeepClone(obj[key])
    }
  }

  return copy
}
