/**
 * Created by cl on 2016/1/25 025.
 */

'use strict';
var React = require('react');
var AddTimeLine = require('./AddTimeLine');
var Timelinelist = React.createClass({
	render: function() {
        return (
            <div>
                <div className="left-content">
                    <AddTimeLine timelines={this.props.timelines} />
                </div>
                <div className="right-content">dfsdfsdf</div>
            </div>
        )
	}
});
module.exports = Timelinelist;