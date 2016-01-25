/**
 * Created by cl on 2016/1/25 025.
 */
var TimeLineDispatcher = require('../dispatcher/TimeLineDispatcher');
var AddTimeLineConstant = require('../constant/AddTimeLineConstant');
var AddTimeLineAction = {
	getTimeLineCount: function() {
		W.getApi().call({
			app: 'weibo',
			resource: 'timline_count',
			args: {},
			success: function(data) {
				console.log(data,"DDDDDDDDDDDDdd");
				var payload = {
					actionType: AddTimeLineConstant.ADDTIMELINE_RESOURCE_RESPONSE
				};
				payload.data = data;
				TimeLineDispatcher.dispatch(payload);
			}
		});
	},
	addTimeLine: function(content) {
		W.getApi().call({
			app: 'weibo',
			resource: 'add',
			args: {
				content: content
			},
			success: function(data) {
				console.log("发布成功！");
				var payload = {
					actionType: AddTimeLineConstant.ADDTIMELINE_RESOURCE_RESPONSE
				};
				payload.data = data;
				TimeLineDispatcher.dispatch(payload);
			},
			error: function(resp) {

			}
		});
		TimeLineDispatcher.dispatch({
			actionType: AddTimeLineConstant.ADDTIMELINE_WAIT_CREATE_ITEM
		});
	}
};

module.exports = AddTimeLineAction;