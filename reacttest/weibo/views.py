# -*- coding: utf-8 -*-
import json

from django.shortcuts import render, render_to_response

# Create your views here.
from django.template import RequestContext

from core import resource
import models
from core.jsonresponse import create_response


class products(resource.Resource):
	app = 'weibo'
	resource = 'list'

	def get(request):
		timelines = models.TimeLine.objects.all()
		timeline_list = []
		for timeline in timelines:
			timeline_list.append({
				"content": timeline.content,
				"created_at": timeline.created_at.strftime("%Y-%m-%d %H:%M:%S")
			})
		c = RequestContext(request, {
			'timelines': json.dumps(timeline_list)
		})
		return render_to_response('list.html', c)

	def api_get(request):
		timeline_count = models.TimeLine.objects.all().count()
		response = create_response(200)
		response.data = {
			"timeline_count": timeline_count,
		}
		return response.get_response()