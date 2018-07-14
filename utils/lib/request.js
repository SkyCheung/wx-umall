var constants = require('../constants');
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

    //var requireLogin = options.login;
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    
    // 成功回调
    var callSuccess = function () {
    	success.apply(null, arguments);
    	complete.apply(null, arguments);
    };

    var callFail = function (error) {
    	fail.call(null, error);
    	complete.call(null, error);
    }


    if (requireLogin) {
    	doRequestWithLogin();
    }else{
    	doRequest();
    }

    function doRequestWithLogin() {
    	return fail;
    }

    function doRequest(){
    	var authHeader = {};

    	if (requireLogin) {
    		var session = Storage.get(SESSION_KEY);

    		if (!session) {
    			return false;
    		}

    		authHeader = buildAuthHeader(session);
    	}

    	

    	return true;
    }




}