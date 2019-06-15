//logs.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:'Rule',
        name:'规则/Rule',
        url:'Rule/Rule'
      },
      {
        id: 'FeedBack',
        name: '反馈/FeedBack',
        url:'FeedBack/FeedBack'
      },
      {
        id: 'About',
        name: '关于/About',
        url:'About/About'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '拿起滑板，走出家门，和朋友来一场SkateOrDice吧！',
      
      imageUrl: '/images/bgima.png',
      success: function (res) {
      },
      fail: function (res) { }
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        if (list[i].url) {
          wx.navigateTo({
            url: list[i].url
          })
          return
          }
      } else {
        console.log("都打开到页面了，为什么还要提交该信息")
        }
     }
  },
  HerryJones:function(e){
    wx.showModal({
      title: 'Tip',
      content: 'Logo by HerryJones',
      showCancel:false,
      confirmText:"OK,Fine"
    })
  }
})