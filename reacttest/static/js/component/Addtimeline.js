/**
 * Created by cl on 2016/1/22 022.
 */

/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var React = require('react');
var AddTimelineAction = require('../action/AddTimeLineAction');
var AddTimeLine = React.createClass({
	onClickAddTimeLine: function(){
        var content = $('.w-content').val();
        AddTimelineAction.addTimeLine(content);
    },
	render: function() {
		return (
			<div className="add_weibo">
                <div className="timeline-content" >
                    <textarea className="w-content" />
                    <a onClick={this.onClickAddTimeLine}>发布</a>
                </div>
            </div>
		);
	}
});
module.exports = AddTimeLine;