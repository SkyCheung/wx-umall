var constants = require('../constants');
var utils = require('./utils');
var Storage = require('./storage');

var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID;

var noop = function noop() {};

var buildAuthHeader = function buildAuthHeader(session) {
    var header = {};
    if (session) {
        header[constants.WX_HEADER_SKEY] = session;
    }
    return header;
};


/***
 * @class
 * 表示请求过程中发生的异常
 */
var RequestError = (function () {
    function RequestError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    RequestError.prototype = new Error();
    RequestError.prototype.constructor = RequestError;

    return RequestError;
})();


function request(options) {
	if (typeof options !== 'object') {
        var message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型';
        throw new RequestError(constants.ERR_INVALID_PARAMS, message);
    }

    var requireLogin = options.login;
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    var method = options.method || 'GET';
    var originHeader = { 
        'content-type': 'application/x-www-form-urlencoded',
        'x-app-name':'xb-mini-v-1.0.0'
    };
    originHeader = utils.extend({}, originHeader, options.header);

    console.log(options); 
    // 成功回调
    var callSuccess = function () {
    	success.apply(null, arguments);
    	complete.apply(null, arguments);
    };
    
    // 失败回调
    var callFail = function (error) {
    	fail.call(null, error);
    	complete.call(null, error);
    }

    //if (requireLogin) {
    //	doRequestWithLogin();
    //}else{
    doRequest();
    //}

    function doRequestWithLogin() {
    	return fail;
    }

    function doRequest(){
    	var authHeader = {};
        Storage.set(SESSION_KEY,'test_skey',60*60);
    	if (requireLogin) {
    		var session = Storage.get(SESSION_KEY);
    		if (!session) {
                console.log('no login, login again');
                //return doRequestWithLogin();
    			return false;
    		}
    		authHeader = buildAuthHeader(session);
    	}
        console.log(authHeader);

        wx.request({
            url: options.url,
            method: method,
            header: utils.extend({}, originHeader, authHeader),
            data:options.data,

            success:function(response){
                //console.log(response.data);
                var data = response.data;

                var error, message;
                if(data && data.code === -1){
                    message = '登录态已过期';
                    error = new RequestError(data.err, message);
                    callFail(error);
                    return;
                }else{
                    callSuccess.apply(null, arguments);
                }
            },

            fail: callFail,
            complete:noop,
        });
    };
};

module.exports = {
    RequestError: RequestError,
    request: request,
};