/**
 * Created by cl on 2016/1/25 025.
 */

'use strict';
var React = require('react');
var AddTimelineAction = require('../action/AddTimeLineAction');
var TimeLineStore = require('../store/TimeLineStore');
var TimeLines =  require('../component/Timelines');
var AddTimeLine = require('../component/AddTimeLine');
var Timelinelist = React.createClass({
    getInitialState: function() {
        var datas = JSON.parse(this.props.datas);
        return {
            TimeLineCount: datas.timelineCount || 0,
            TimeLines: datas.timelines || []
        }
    },
    componentDidMount: function() {
        TimeLineStore.addListener(this.onTimeLineStoreChange);
        // AddTimelineAction.getTimeLineCount()
    },
    onTimeLineStoreChange: function() {
        var TimeLines = this.state.TimeLines;
        TimeLines.unshift(TimeLineStore.getTimelineItem().timelines[0]);
        this.setState({
            TimeLineCount: TimeLineStore.getTimelineItem().timelineCount,
            TimeLines: TimeLines
        });
    },
    // onClickAddTimeLine: function(){
    //     var content = $('.w-content').val();
    //     AddTimelineAction.addTimeLine(content);
    // },
    render: function() {
        console.log(this.state)
        return (
            <div>
                <div className="left-content">
                    <AddTimeLine />
                    <div className="left-content-list">
                        <hr/>
                        <div id="list" >
                            <TimeLines timelines={this.state.TimeLines}/>
                        </div>
                    </div>
                </div>
                <div className="right-content" >
                    <div className="user-img">
                        <img src="/static/img/user-pic.jpg"/>
                    </div>
                    <div className="timeline-count">微博：{this.state.TimeLineCount}</div>
                </div>
            </div>
        );
    }
});
module.exports = Timelinelist;