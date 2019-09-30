/**
 * 全屏用法
 * const title: any = document.getElementById('root')
 * const s: any = new Screen(title)
 * console.log(title)
 * s.fullScreen()
 *
 * 退出全屏的用法
 * const title: any = document.getElementById('root')
 * const s: any = new Screen(title)
 * console.log(title)
 * s.exitScreen()
 */

export default class Screen {
  constructor(element: any) {
    this.element = element
  }

  public element: any

  //全屏
  public fullScreen() {
    const RFS: any =
      this.element.requestFullScreen ||
      this.element.webkitRequestFullScreen ||
      this.element.mozRequestFullScreen ||
      this.element.msRequestFullScreen

    if (RFS) {
      RFS.call(this.element)
    } else if (typeof (window as any).ActiveXObject !== 'undefined') {
      //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
      let wscript: any = new (window as any).ActiveXObject('WScript.Shell')
      if (wscript != null) {
        wscript.SendKeys('{F11}')
      }
    }
  }

  //退出全屏
  public exitScreen() {
    const documentElement: any = document
    const CFS =
      documentElement.cancelFullScreen ||
      documentElement.webkitCancelFullScreen ||
      documentElement.mozCancelFullScreen ||
      documentElement.exitFullScreen
    const browserWindow: any = window
    if (CFS) {
      CFS.call(documentElement)
    } else if (typeof browserWindow.ActiveXObject !== 'undefined') {
      //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
      let wscript = new browserWindow.ActiveXObject('WScript.Shell')
      if (wscript != null) {
        wscript.SendKeys('{F11}')
      }
    }
  }
}
