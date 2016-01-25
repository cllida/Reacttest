/*
Copyright (c) 2011-2012 Weizoom Inc
*/

/**
 * Api调用的总控器
 * @constructor
 */
W.SINA_WEIBO = 1;
W.API_VERSION = 2;
W.Api = function() {
	this.urlTemplate = _.template("/api/<%=name%>/?<%=args%>");
	this.appApiUrlTemplate = _.template("/<%=app%>/api/<%=name%>/?<%=args%>");

	this.defaultArgs = {
		version: W.API_VERSION
	};
	this.cant_call = {};

	this.buildArgs = function(args) {
		var base = {design_mode: W.isInDesignMode ? 1 : 0};
		if (W.projectId) {
			base['project_id'] = W.projectId;
		}
		var mergedArgs = _.extend(base, this.defaultArgs, args);
		var argList = [];

		if (mergedArgs) {
			$.each(mergedArgs, function(key, value) {
				argList.push(key+'='+value);
			});
		}

		return argList.join('&');
	};

	this.getUrl = function(app, name, args) {
		var url = null;
		if (app) {
			url = this.appApiUrlTemplate({app:app, name:name, args:this.buildArgs(args)});
		}
		else {
			url = this.urlTemplate({name:name, args:this.buildArgs(args)});
		}
		return url;
	};

	this.reportError = function(url, error) {
		if (!url) {
			xlog('logapi: no url');
			return;
		}
		$.post('/account/logapi/log_api_error/', {
			api: url,
			error: error
		});
	};

	/**
	 * 调用远程api
	 * @param options
	 */
	this.call = function(options) {
		var app = options.app;
		if (!app) {
			app = null;
		}
		var api_key = false;
		

		var method = options.method || 'get';

		if (method != 'get') {
			if(options.app && (options.resource||options.api)){
				if(options.api){
					var second_key = 'api_' + options.api
				}else{
					var second_key = 'resource_' + options.resource
				}
				var third_key = options.method;
				api_key = options.app + '_' + second_key + '_' + third_key;
				if(this.cant_call[api_key]){
					xlog('Api ERROR:'+api_key);
					xerror('Api ERROR, repeat call!!!!!!!');
					return;
				}else{
					this.cant_call[api_key] = true;
				}
			}
		}

		var name = options.api || options.resource;
		if (options.hasOwnProperty('resource')) {
			name = options.resource;
		}

		var args = options.args;
		if (!args) {
			args = {};
		}

		if (method === 'put') {
			method = 'post'
			args['_method'] = 'put'
		} else if (method === 'delete') {
			method = 'post'
			args['_method'] = 'delete'
		}

		var showLoading = true;
		if (options.hasOwnProperty('showLoading')) {
			showLoading = options.showLoading;
		}
		var onSuccess = options.success;
		var onError = options.error;
        var scope = options.scope;
        var disableCache = true;
        if (options.hasOwnProperty('disableCache')) {
        	disableCache = options.disableCache;
        }
		var url = 'unknown';

        if (disableCache) {
            args['timestamp'] = new Date().getTime();
        }
        var async_val = options.async == false ? false : true;
        _options = options;

		var _this = this;
		var options = {
			type: method,
			cache: false,
			async: async_val,
			dateType: 'json',
			success: function(resp) {
				if (showLoading && W.getLoadingView) {
					W.getLoadingView().hide();
				}
				//if (!(_options.app == 'new_weixin' && _options.resource == 'outline')) {
				//	W.finishConfirm();
				//}
				if (resp.code !== 200) {
					_this.reportError(url, resp.innerErrMsg);
					if (onError) {
                        if (scope) {
                            onError.call(scope, resp);
                        } else {
    						onError(resp);
                        }
					}
				}
				else {
					if (resp.sqls) {
						if(__W_DBG_parseSqls) {
							__W_DBG_parseSqls(resp.sqls, resp.apiSource);
						}
					}
					if (onSuccess) {
                        if (scope) {
                            // xlog('apply to scope');
                            onSuccess.call(scope, resp.data);
                        } else {
                            // xlog('not apply');
    						onSuccess(resp.data);
                        }
					}
				}
				if(api_key){
					_this.cant_call[api_key] = false;
				}
			},
			error: function(xhr, resp) {
				if (showLoading && W.getLoadingView) {
					W.getLoadingView().hide();
				}
				//if (!(_options.app == 'new_weixin' && _options.resource == 'outline')) {
				//	W.finishConfirm();
				//}
				_this.reportError(url, xhr.responseText);
                if (scope) {
                    onError.call(scope, resp);
                } else {
                    onError(resp);
                }
                if(api_key){
	                _this.cant_call[api_key] = false;
	            }
			}
		}
		// console.log(666, options)
		if (showLoading && W.getLoadingView) {
			W.getLoadingView().show();
		}
		if (method === 'get') {
			url = options.url = this.getUrl(app, name, args);
			$.ajax(options);
		}
		else if (method === 'post') {
			url = options.url = this.getUrl(app, name, {});
			options.data = args;
			$.ajax(options);
		}
		else {
			xlog('unsupported method ' + method);
		}
	}
};


/**
 * 获得Loading的单例实例
 * @param {int} width - 宽度
 */
W.getApi = function(options) {
	if (!W.registry) {
		W.registry = {};
	}
	var api = W.registry['apiController'];
	if (!api) {
		// xlog('create W.Api');
		api = new W.Api(options);
		W.registry['apiController'] = api;
	}

	return api;
};

/**
 * 使用api机制对Backbone进行扩展
 */
if (window.Backbone) {
	W.ApiModel = Backbone.Model.extend({
		app: null,
		
		getApiUrl: function(apiName, args) {
			var url = W.getApi().getUrl(this.app, apiName, args);
			this.apiUrl = url; //记录访问的api url
			return url;
		},

		save: function(attrs, options) {
			if (options && options.error) {
				options.error = function(onError) {
					return function(model, resp, options) {
						var info = resp.innerErrMsg || resp['responseText'] || resp;
						W.getApi().reportError(model.apiUrl, info);
						if (onError) {
							onError(model, resp, options);
						}
					};
				}(options.error);
			}


			if (options && options.success) {
				options.success = function(onSuccess) {
					return function(model, resp, xhr) {
						if (resp.code && resp.code != 200) {
							//W.getApi().reportError(model.apiUrl, resp);
							options.error(resp);
						}
						else {
							if (onSuccess) {
								onSuccess(model, resp, xhr);
							}
						}
					}
				}(options.success);
			}

			return Backbone.Model.prototype.save.call(this, attrs, options);
		},

		fetch: function(options) {
			if (options && options.error) {
				options.error = function(onError) {
					return function(model, resp, options) {
						var info = resp.innerErrMsg || resp['responseText'] || resp;
						W.getApi().reportError(model.apiUrl, info);
						if (onError) {
							onError(model, resp, options);
						}
					}
				}(options.error);
			}

			if (options && options.success) {
				options.success = function(onSuccess) {
					return function(model, resp, xhr) {
						if (resp.code && resp.code != 200) {
							//W.getApi().reportError(model.apiUrl, resp);
							options.error(resp);
						}
						else {
							if (onSuccess) {
								onSuccess(model, resp, xhr);
							}
						}
					}
				}(options.success);
			}

			return Backbone.Model.prototype.fetch.call(this, options);
		}
	});

	W.ApiCollection = Backbone.Collection.extend({
		app: null,
		
		getApiUrl: function(apiName, args) {
			var url = W.getApi().getUrl(this.app, apiName, args);
			this.apiUrl = url; //
			return url;
		},

		fetch: function(options) {
			if (options && options.error) {
				options.error = function(onError) {
					return function(collection, resp, options) {
						var info = resp.innerErrMsg || resp['responseText'] || resp;
						W.getApi().reportError(collection.apiUrl, info);
						if (onError) {
							onError(collection, resp, options);
						}
					}
				}(options.error);
			}

			if (options && options.success) {
				options.success = function(onSuccess) {
					return function(collection, resp, xhr) {
						if (resp.code && resp.code != 200) {
							options.error(resp);
						}
						else {
							if (onSuccess) {
								onSuccess(collection, resp);
							}
						}
					}
				}(options.success);
			}

			return Backbone.Collection.prototype.fetch.call(this, options);
		}
	});
}