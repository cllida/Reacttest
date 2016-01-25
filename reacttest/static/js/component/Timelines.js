/**
 * Created by cl on 2016/1/21 021.
 */
'use strict';
var React = require('react');
var Timelines = React.createClass({
	render: function() {
		console.log(this.props.timelines,"DDDDDDDDDDDD")
		if ((typeof this.props.timelines) === String){
		}
		var timelines = this.props.timelines;
		var productNodes = timelines.map(function(timeline) {
			return (
				<div className="timelines-content">
					<div className="xui-timeline-content">{timeline.content}</div>
					<div className="xui-timeline-created_at">{timeline.created_at}</div>
				</div>
			)
		});
		return (
			<div className="xui-timelines">
				{productNodes}
			</div>
		);
	}
});
module.exports = Timelines;
