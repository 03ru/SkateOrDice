const app = getApp()
Page({
data:{
  items:[
    { name: 'LEVEL1', value: 'a' ,Set:'去除Switch、Nollie招式'},
    { name: 'LEVEL2', value: 'b' ,Set:'去除Switch、Nollie与Flip结合的招式'},
    { name: 'LEVEL3', value: 'c' ,Set:'去除Switch、Nollie与360与Flip结合的招式'},
    { name: 'LEVEL4', value: 'd' ,Set:'原始难度，没有约束'},
  ]
},
radioChange:function(e){
  console.log(e.detail.value),
    app.globalData.LevelSetting = e.detail.value;
  
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
  }
})
