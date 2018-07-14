// pages/index/index.js
var constants = require('../../utils/constants');
var storage = require('../../utils/lib/storage.js');
var ewx = require('../../utils/lib/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      '../../images/banner1.jpg'
    ],
    indicatorDots:true,
    height:500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getBanner(that);//banner
    // 动态给买家说加高度
    wx.createSelectorQuery().select('.swiper-item').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY']
      }, function (res) {
        console.log(res.height)
        that.setData({
          height: res.height+25
        })
      }).exec()
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
    console.log("test")
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getBanner:function(that){
      var ckey = 'banner';
      var banner_image = storage.get(ckey);
      if (banner_image){
          that.setData({imgUrls: banner_image})
      }else{
          var options = {
              url: constants.API_URL,
              data: {act: 'banner',code: 'mobileindexbanner'},
              success: function (res) {
                  let banner = res.data.data.mobileindexbanner;
                  let banner_image = ['../../images/banner1.jpg'];
                  for (var i in banner) {
                      banner_image.push(banner[i]['img'])
                  }
                  that.setData({imgUrls: banner_image});
                  storage.set('banner', banner_image, 86400);
              },
              fail: function (err) {
                   console.log('fail function'); 
                   console.log(err); 
              }
          };
          ewx.request(options);
      }
  },


  getNewGoods:function(that){

  }
})