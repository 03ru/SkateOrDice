// pages/dice/dices.js
var utils = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    isShow: false,
    diceNum:  1,
    diceCount: 4,
    dicesText: [],  //用这个数组/栈去保存dice 的位置和关键字
    Footposition:0,
    Flip:0,
    angle:0,
    Level_Setting: 'd'
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.diceData_Footposition = {
      1: '/images/Dice_reg.png',
      2: '/images/Dice_Nollie.png',
      3: '/images/Dice_Fakie.png',
      4: '/images/Dice_sw.png',
      5: '/images/Dice_Logo1.png',
      6: '/images/Dice_Logo2.png'
    }
    this.diceData_Flip = {
      1: '/images/Dice_KF.png',
      2: '/images/Dice_HF.png',
      3: '/images/Dice_KF.png',
      4: '/images/Dice_HF.png',
      5: '/images/Dice_Logo1.png',
      6: '/images/Dice_Logo2.png',
    }
    this.diceData_Varial = {
      1: '/images/Dice_BS.png',
      2: '/images/Dice_FS.png',
      3: '/images/Dice_BS.png',
      4: '/images/Dice_FS.png',
      5: '/images/Dice_Logo1.png',
      6: '/images/Dice_Logo2.png',
    }
    this.diceData_angle = {
      1: '/images/Dice_180.png',
      2: '/images/Dice_360.png',
      3: '/images/Dice_180.png',
      4: '/images/Dice_360.png',
      5: '/images/Dice_Logo1.png',
      6: '/images/Dice_Logo2.png',
    }
    
    this.timer = null;
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    });
    // 摇一摇
    utils.shake(this.onRollTap);
  },
  onReady: function () {
    console.log('test1')// 页面渲染完成
  },
  onShow: function () {
    console.log('isShow = true')
    var that = this;
    this.isShow = true;
    console.log(app.globalData.LevelSetting),//测试全局变量app.globalData.LevelSetting是否有获取到
      this.setData({ Level_Setting: app.globalData.LevelSetting }),
      console.log(this.data.Level_Setting)//测试该文件内的值来接受全局变量
    },

  // 产生骰子的对应招式属性
  creatediceText: function () {
    console.log('成功产生骰子对应招式属性')
   
      //在这里设置循环与switch的嵌套来实现每个骰子的随机属性的不同
      var Num = this.data.diceNum;
    switch (Num) {
        case 0: 
              var num = Math.ceil(Math.random() * 6); 
              this.setData({ Footposition : num})
              var diceText = this.diceData_Footposition[num];   
              console.log("产生脚位骰子")
              return diceText;
              break;
        case 1: 
              var num = Math.ceil(Math.random() * 6);
              this.setData({ Flip: num })
              var diceText = this.diceData_Flip[num];   
              console.log("产生Flip骰子")
              return diceText;
              break;
        case 2:
               var num = Math.ceil(Math.random() * 6);
              var diceText = this.diceData_Varial[num];
              console.log("产生方向骰子")
              return diceText;
              break;
       case 3:
              var num = Math.ceil(Math.random() * 6);
              this.setData({ angle: num })
              var diceText = this.diceData_angle[num];
              console.log("产生角度骰子")
              return diceText;
              break;

              default:console.log("骰子初始化失败0")
    }
  },

  // 产生色子动画
  createAnim: function (left, top) {
    // 色子移入屏幕
    console.log("准备将骰子抛到屏幕")
    this.animation.top(top + "rpx").left(left + "rpx").rotate(Math.random() * 360).step({ duration: 2000, timingFunction: "ease-out" });
    return this.animation.export();
  },

  // 产生色子移动终点位置
  createDicesPos: function () {
    var dicesPos = [];
    // 色子位置判断
    console.log("产生最终位置")
    function judgePos(l, t) {
      for (var j = 0; j < dicesPos.length; j++) {
        // 判断新产生的色子位置是否与之前产生的色子位置重叠
        if ((dicesPos[j].left - 146 < l && l < dicesPos[j].left + 146) && (dicesPos[j].top - 146 < t && t < dicesPos[j].top + 146)) {
          return false;
        }
      }
      return true;
    }
    for (var i = 0; i < this.data.diceCount; i++) {
      var posData = {},
        left = 0,
        top = 0;
      do {
        // 随机产生色子的可能位置
        left = Math.round(Math.random() * 600); // 0~600,根据色子区域和色子的大小计算得出
        top = Math.round(Math.random() * 550); // 0~550,根据色子区域和色子的大小计算得出
      } while (!judgePos(left, top));
      posData.left = left;
      posData.top = top;
      dicesPos.push(posData);
    }
    return dicesPos;
  },

  // 设置色子数据
  setDicesText: function (diceCount) {
    var dicesText = [];  //设置一个dicesText来接受位置和内容信息
    var LS= this.data.Level_Setting;
    console.log("传值成功",LS);
    // 色子动画数据
    

    switch (LS){
            //Level 1
            case 'a': {
        
                    console.log("L1")
                        var dicesPos = this.createDicesPos(); // 所有色子的位置数据
                        for (var i = 0; i < diceCount; i++) {
                        do { var CT = this.creatediceText(); }
                        while ((this.data.Footposition === 2 || this.data.Footposition === 4));
                        var diceText = {};
                        this.setData({ diceNum: i })
                        diceText.anim = this.createAnim(dicesPos[i].left, dicesPos[i].top);
                        //骰子位置
                        diceText.src = CT;//骰子的内容
                        dicesText.push(diceText);
        }
        this.setData({ dicesText: dicesText }); //将本函数内的dicesText传到data中的dicesText 
        break};
            //Level 2
            case 'b': {
        
                     console.log("L2")
                        var dicesPos = this.createDicesPos(); // 所有色子的位置数据
                        for (var i = 0; i < diceCount; i++) {
                        do { var CT = this.creatediceText(); }
                        while ((this.data.Footposition === 2 && this.data.Flip || this.data.Footposition === 4 && this.data.Flip));
                        var diceText = {};
                        this.setData({ diceNum: i })
                        diceText.anim = this.createAnim(dicesPos[i].left, dicesPos[i].top);
                        //骰子位置
                        diceText.src = CT;//骰子的内容
                        dicesText.push(diceText);
        }
        this.setData({ dicesText: dicesText }); //将本函数内的dicesText传到data中的dicesText 
        break};
            //Level 3
            case 'c': {
        
                    console.log("L3")
                      var dicesPos = this.createDicesPos(); // 所有色子的位置数据
                      for (var i = 0; i < diceCount; i++) {
                      do { var CT = this.creatediceText(); }
                      while ((this.data.Footposition === 2 && this.data.Flip && this.data.angle === 2 || this.data.Footposition === 4 && this.data.Flip && this.data.angle === 4));
                      var diceText = {};
                      this.setData({ diceNum: i })
                      diceText.anim = this.createAnim(dicesPos[i].left, dicesPos[i].top); 
                      //骰子位置
                      diceText.src = CT;//骰子的内容
                      dicesText.push(diceText);
        }
        this.setData({ dicesText: dicesText }); //将本函数内的dicesText传到data中的dicesText 
         break}; 
            //Level 4
            case 'd': {
        
                    console.log("L4")
                    var dicesPos = this.createDicesPos(); // 所有色子的位置数据
                    for (var i = 0; i < diceCount; i++) { 
                    var diceText = {};
                    this.setData({ diceNum: i })
                    diceText.anim = this.createAnim(dicesPos[i].left, dicesPos[i].top); 
                    //骰子位置
                      diceText.src = this.creatediceText();//骰子的内容
                    dicesText.push(diceText);         }
        this.setData({ dicesText: dicesText }); //将本函数内的dicesText传到data中的dicesText
        break};

            default:console.log("骰子初始化失败1")
      }
      
     

    

  },

  // 摇色子
  onRollTap: function () {
    // 设置色子移出动画
    if(this.isShow == true){
      var newData = this.data.dicesText;
      if (newData.length < this.data.diceCount) {
        for (var i = 0; i < this.data.diceCount; i++) {
          var data = {};
          newData.push(data);
        }
      }
      for (var i = 0; i < newData.length; i++) {
        this.animation.left("300rpx").top("-800rpx").rotate(-180).step();
        newData[i].anim = this.animation.export();
        this.setData({ dicesText: newData });
      }
      //骰子产生时振动提醒
      wx.vibrateLong();
      var that = this;
      
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        // 色子改变点数并移入屏幕
        that.setDicesText(that.data.diceCount);
        //骰子产生时音效提醒
        var audio = wx.createInnerAudioContext();
        audio.src = '/images/Play.mp3';
        audio.play();
        console.log("色子改变点数并移入屏幕");
      }, 2000)
    }
  }, 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '拿起滑板，走出家门，和朋友来一场SkateOrDice吧！',
      
      imageUrl:'/images/bgima.png',
            success: function (res) {
      },
      fail: function (res) { }
    }
  },

  onHide: function () {
        this.isShow = false;
    console.log('isShow = false')
  }
})