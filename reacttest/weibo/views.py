# -*- coding: utf-8 -*-
import json

from django.shortcuts import render, render_to_response

# Create your views here.
from django.template import RequestContext

from core import resource
import models
from core.jsonresponse import create_response


class timelines(resource.Resource):
	app = 'weibo'
	resource = 'list'

	def get(request):
		timelines = models.TimeLine.objects.all().order_by('-id')
		timelineCount = timelines.count()
		timeline_list = []
		for timeline in timelines:
			print timeline.created_at.strftime("%Y-%m-%d %H:%M:%S"),"DDDDDDDDDDDDDDDDD"
			timeline_list.append({
				"id": timeline.id,
				"content": timeline.content,
				"created_at": timeline.created_at.strftime("%Y-%m-%d %H:%M:%S")
			})
		data = {
			'timelines': timeline_list,
			'timelineCount': timelineCount
		}
		c = RequestContext(request, {
			"data": json.dumps(data)
		})
		return render_to_response('list.html', c)

# class timelinesCount(resource.Resource):
# 	app = 'weibo'
# 	resource = 'timeline_count'
#
# 	def api_get(request):
# 		timelineCount = models.TimeLine.objects.all().count()
# 		response = create_response(200)
# 		response.data = {
# 			"timelineCount": timelineCount,
# 		}
# 		return response.get_response()