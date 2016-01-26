/**
 * Created by cl on 2016/1/21 021.
 */
'use strict';
var React = require('react');
var Timelines = React.createClass({
	render: function() {
		var timelines = this.props.timelines;
		var productNodes = timelines.map(function(timeline) {
			return (
				<div className="timelines-content" key={timeline.id}>
					<div className="xui-timeline-content">{timeline.content}</div>
					<div className="xui-timeline-created_at">{timeline.created_at}</div>
					<ul>
						<li><a><span><span>赞</span></span></a></li>
						<li><a><span><span>评论</span></span></a></li>
					</ul>
					<div className="cb"></div>
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
