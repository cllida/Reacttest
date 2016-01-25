/**
 * Created by cl on 2016/1/25 025.
 */
var AddTimeLineConstant = require('../constant/AddTimeLineConstant');
var TimeLineDispatcher = require('../dispatcher/TimeLineDispatcher');
var EventEmitter = require('events').EventEmitter
var _ = require('underscore');
var StoreUtil = require('../util/StoreUtil');

var TimeLineStore = StoreUtil.createStore(TimeLineDispatcher, {
	name: 'TimeLineStore',

	actions: {
		'handleTimeLineResponse': AddTimeLineConstant.ADDTIMELINE_RESOURCE_RESPONSE
	},

	init: function() {
		this.data = {
			timelineCount: 0,
			products: []
		}
	},

	handleTimeLineResponse: function(action) {
		console.log("HHHHHHHHHHHHHHHH")
		this.data.timelineCount = action.data.timelineCount;
		this.__emitChange();
	},

	getTimelineCount: function() {
		console.log(this.data.timelineCount,"SSSSSSSSSS");
		return this.data.timelineCount;
	}
});

module.exports = TimeLineStore;