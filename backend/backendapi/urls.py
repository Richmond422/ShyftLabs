from django.conf.urls import include, url
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    url('students', views.getStudents, name='students'),
    url('addStudent', views.addStudent, name='addStudent')
]