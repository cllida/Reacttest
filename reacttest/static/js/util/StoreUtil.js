/**
 * Created by cl on 2016/1/25 025.
 */
var FluxStore = require('flux/utils').Store;
var assign = require('object-assign');
var debug = require('debug')('mall:StoreUtil');
var _ = require('underscore');

var onDispatch = function(action) {
	if (!this.action2handler) {
		debug('[ERROR]: no actions!!! - (%s)', this.storeName);
		return;
	}

	var actionHandlerName = this.action2handler[action.actionType];
	if (!actionHandlerName) {
		debug('[WARN]: no handler for action %s - (%s)', action.actionType, this.storeName);
		return;
	}

	var actionHandler = this[actionHandlerName];
	if (!actionHandler) {
		debug('[ERROR]: no handler named %s - (%s)', actionHandlerName, this.storeName);
		return;
	}

	debug("handle action %s - (%s)", action.actionType, this.storeName);
	actionHandler.call(this, action);
};

var createStore = function(dispatcher, options) {
	var store = new FluxStore(dispatcher);

	assign(store, options);

	store.__onDispatch = onDispatch;
	store.storeName = options.name || 'unknown';

	//将<handler, action>映射转换为<action, handler>映射
	store.action2handler = {};
	if (store.actions) {
		_.each(store.actions, function(value, key) {
			store.action2handler[value] = key;
		});
	}

	if (!store.init) {
		debug('[ERROR] Every store MUST have a init function');
		return;
	}
	store.init();

	return store;
};

module.exports = {
	createStore: createStore
};