# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url

from django.contrib import admin
from core.restful_url import restful_url, restful_url2
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'reacttest.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),
    # (r'^$', views.index),
    url(r'^weibo/', restful_url2('weibo')),

)
