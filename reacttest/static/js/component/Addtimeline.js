/**
 * Created by cl on 2016/1/22 022.
 */

/*
Copyright (c) 2011-2012 Weizoom Inc
*/
var React = require('react');
var AddTimelineAction = require('../action/AddTimeLineAction');
var TimeLineStore = require('../store/TimeLineStore');
var TimeLines =  require('../component/Timelines');
var AddTimeLine = React.createClass({
	getInitialState: function() {
		return {
			isLiked: false,
			TimeLineCount: 0
		}
	},
	componentDidMount: function() {
		TimeLineStore.addListener(this.onTimeLineStoreChange);
		AddTimelineAction.getTimeLineCount();
	},
	onTimeLineStoreChange: function() {
		console.log(TimeLineStore.getTimelineCount(),"getTimelineCount()");
		this.setState({
			TimeLineCount: TimeLineStore.getTimelineCount()
		});
	},
	onClickAddTimeLine: function(){
		var content = $('.w-content').val();
		AddTimelineAction.addTimeLine(content);
	},
	render: function() {
		var timelines = this.props.timelines;
		return (
			<div>
				<div className="left-content">
                    <div id="add_weibo">
						<div className="timeline-content">
							<textarea className="w-content" name="content" />
							<a onClick={this.onClickAddTimeLine}>发布</a>
						</div>
					</div>
					<div className="left-content-list">
						<hr/>
						<div id="list" >
							<TimeLines timelines={this.props.timelines} />
						</div>
					</div>
                </div>
                <div className="right-content" >数量：{this.state.TimeLineCount}</div>
			</div>
		);
	}
});
module.exports = AddTimeLine;