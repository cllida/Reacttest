# -*- coding: utf-8 -*-
import json
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from core import resource
import models
from core.jsonresponse import create_response

class TimeLine(resource.Resource):
	app = 'weibo'
	resource = 'add'

	def api_get(requset):
		content = requset.GET.get('content','')
		timeline = models.TimeLine.objects.create(content=content)
		timelineCount = models.TimeLine.objects.all().count()
		response = create_response(200)
		response.data = {
			"timelines": [{"content": timeline.content,"created_at": timeline.created_at.strftime("%Y-%m-%d %H:%M:%S"),}],
			"timelineCount": timelineCount
		}
		return response.get_response()