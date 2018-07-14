var Storage = {
    set: function (k, v, t) {
        var timestamp = Date.parse(new Date());
        var expiration = timestamp + 1000 * t;
        wx.setStorageSync(k, v);
        wx.setStorageSync(k + 'expire', expiration);
    },

    get: function (k) {
        var timestamp = Date.parse(new Date());
        var v = wx.getStorageSync(k) || null;
        var expiration = wx.getStorageSync(k + 'expire') || null;
        //console.log(v);
        if (v && expiration && expiration > timestamp) {
            return v;
        } else {
            return null;
        }
    },

    remove: function (k) {
        wx.removeStorageSync(k);
        wx.removeStorageSync(k + 'expire');
    },

    clear: function () {
        wx.clearStorageSync();
    }
};

module.exports = Storage;