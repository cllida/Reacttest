# -*- coding: utf-8 -*-
"""
Django settings for reacttest project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^ir(4_))%9bd!w&&i(72nka4@v1wsnjq9+_92w606b@e6&=-$4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []
RESOURCE_LOADED = False
RESOURCES = [ 'weibo']
# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'weibo',
)

MIDDLEWARE_CLASSES = (
	'core.resource_middleware.RestfulUrlMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'reacttest.urls'

WSGI_APPLICATION = 'reacttest.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
	'default': {
		# Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
		'ENGINE': 'django.db.backends.mysql',
		# Or path to database file if using sqlite3.
		'NAME': 'react',
		'USER': 'weapp',                      # Not used with sqlite3.
		'PASSWORD': 'weizoom',                  # Not used with sqlite3.
		# Set to empty string for localhost. Not used with sqlite3.
		'HOST': 'db.react.com',
		# Set to empty string for default. Not used with sqlite3.
		'PORT': '',
		'CONN_MAX_AGE': 100
	}
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

TEMPLATE_LOADERS = [
	'django.template.loaders.filesystem.Loader',
	'django.template.loaders.app_directories.Loader',
	#     'django.template.loaders.eggs.Loader',
]

TEMPLATE_DIRS = [
	# Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
	# Always use forward slashes, even on Windows.
	# Don't forget to use absolute paths, not relative paths.
	'./templates',
]
