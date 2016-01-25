# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.

class TimeLine(models.Model):
	content = models.CharField(max_length=200)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta(object):
		db_table = 'weibo_timeline'
		verbose_name = '微博'
		verbose_name_plural = '微博'