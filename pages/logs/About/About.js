Page({
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
