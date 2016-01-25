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
			timelines: []
		}
	},

	handleTimeLineResponse: function(action) {
		this.data.timelineCount = action.data.timelineCount;
		this.data.timelines = action.data.timelines
		this.__emitChange();
	},

	getTimelineItem: function() {
		return this.data;
	}
});

module.exports = TimeLineStore;