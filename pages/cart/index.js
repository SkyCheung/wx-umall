// pages/cart/index.js
var constants = require('../../utils/constants');
var ewx = require('../../utils/lib/request.js');

Page({

  /**  
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      var options = {
          url: constants.API_URL,
          method:'POST',
          login:true,
          data:{test:'test'},
          //success: function (res) { console.log('success function'); console.log(res);},
          success:this.test,
          fail: function (err) { console.log('fail function'); console.log(err);},
          complete: function (res) { console.log('complete function'); console.log(res); },
      }
      ewx.request(options);
  },

  test: function (res){
      console.log('success function'); console.log(res);
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})