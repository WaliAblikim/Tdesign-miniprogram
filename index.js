import { request } from "../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    note: "",
    remarks:'',
    titleInfo: [],
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let opt = JSON.parse(options.det); //传过来的参数进行处理
    this.setData({
      titleInfo: opt,
    });
  },
  handleBack() {
    wx.navigateBack({
      delta: 1,
    });
  },
  handleCalendar() {
    this.setData({ visible: true });
  },
  handleConfirm(e) {
    const { value } = e.detail;
    const format = (val) => {
      const date = new Date(val);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };
    this.setData({
      note: format(value),
    });
  },
  onClose({ detail }) {
    console.log(detail.trigger);
  },
  valueChange(e) {
    this.setData({
      remarks: e.detail.value,
    });
  },

  submit() {
    this.setData({
      loading: true,
    });
    let params = {
      method: "POST",
      data: {
        user_id: wx.getStorageSync("userinfo").user_id,
        appointment_date:this.data.note,
        service_type:this.data.titleInfo.text,
        remarks: this.data.remarks,
      },
    };
    request("/wechat/appointment", params)
      .then((res) => {
        if (res.code === 200) {
          wx.showToast({
            title: res.message,
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            });
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.setData({
      loading: false,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
