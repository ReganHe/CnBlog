//index.js

//导入three.js库
import * as THREE from '../../libs/three.js'
import ThreeHelper from '../../libs/threeHelper.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },

  /**
   * 页面加载回调函数
   */
  onLoad: function () {
    //初始化Canvas对象
    this.initWebGLCanvas()
  },
  /**
   * 初始化Canvas对象
   */
  initWebGLCanvas: function () {
    //获取页面上的标签id为webgl的对象，从而获取到canvas对象
    var query = wx.createSelectorQuery()
    query
      .select('#webgl')
      .node()
      .exec(res => {
        var canvas = res[0].node
        this._webGLCanvas = canvas
        //获取系统信息，包括屏幕分辨率，显示区域大小，像素比等
        var info = wx.getSystemInfoSync()
        this._sysInfo = info
        //设置canvas的大小，这里需要用到窗口大小与像素比乘积来定义
        this._webGLCanvas.width =
          this._sysInfo.windowWidth * this._sysInfo.pixelRatio
        this._webGLCanvas.height =
          this._sysInfo.windowHeight * this._sysInfo.pixelRatio
        //设置canvas的样式
        this._webGLCanvas.style = {}
        this._webGLCanvas.style.width = this._webGLCanvas.width.width
        this._webGLCanvas.style.height = this._webGLCanvas.width.height
        //设置显示层canvas绑定的样式style数据，页面层则直接用窗口大小来定义
        this.setData({
          canvasWidth: this._sysInfo.windowWidth,
          canvasHeight: this._sysInfo.windowHeight
        })
        const setting = {
          model: '../../model/trex_v3.fbx',
          scale: 0.02,
          position: [0, 0, 0]
        }
        const threeHelper = new ThreeHelper(this._webGLCanvas)
        threeHelper.loadObject(setting)
      })
  }
})