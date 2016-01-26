/**
 * Created by cl on 2016/1/22 022.
 */

/*
Copyright (c) 2011-2012 Weizoom Inc
*/
require('../../css/b.css');
var React = require('react');
require('react-dom');
var AddTimelineAction = require('../action/AddTimeLineAction');
var AddTimeLine = React.createClass({
    getInitialState: function(){
        return {
            content: ""
        }
    },
    handleChange: function(event){
        this.setState({
            content: event.target.value
        })
    },
	onClickAddTimeLine: function(event){
        console.log(this.refs.testValue,"DDDDDDDDDDDDDDDD");
        var content = this.state.content;
        if (content === ""){
            alert('请输入内容');
            return;
        }
        AddTimelineAction.addTimeLine(content);
        this.setState({
            content: ""
        })
    },
	render: function() {
		return (
            <div className="add_weibo" >
                <div className="timeline-content" ref="testValue">
                    <textarea className="w-content"  value={this.state.content} onChange={this.handleChange} placeholder="有什么新鲜事想告诉大家?" />
                    <div className="content-sub"><a  onClick={this.onClickAddTimeLine}>发布</a></div>
                </div>
            </div>
		);
	}
});
module.exports = AddTimeLine;