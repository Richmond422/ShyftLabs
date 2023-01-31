from django.urls import include, re_path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    re_path('students', views.getStudents, name='students'),
    re_path('addStudent', views.addStudent, name='addStudent'),
    re_path('courses', views.getCourses, name='courses'),
    re_path('addCourse', views.addCourse, name='addCourse')
]