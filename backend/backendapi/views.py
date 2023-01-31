# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from .serializers import StudentSerializer, CourseSerializer, GradeSerializer
from .models import Student, Course, Grade
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

@api_view(['GET'])
def getStudents(request):
    allStudents = Student.objects.all()
    seriazlied_students = StudentSerializer(allStudents, many=True, default=True)
    res = json.dumps(seriazlied_students.data, indent=4, sort_keys=True, default=str)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
def addStudent(request):
    studentInfo = dict(request.data)
    if "firstname" not in studentInfo.keys() or "familyname" not in studentInfo.keys() or "birthdate" not in studentInfo.keys():
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    if Student.objects.filter(firstname=studentInfo["firstname"], familyname=studentInfo["familyname"], birthdate=studentInfo["birthdate"]).exists():
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    student = Student(firstname=studentInfo["firstname"], familyname=studentInfo["familyname"], birthdate=studentInfo["birthdate"])
    student.save()
    return Response("success", status=status.HTTP_200_OK)


@api_view(['GET'])
def getCourses(request):
    allCourses = Course.objects.all()
    serialized_courses = CourseSerializer(allCourses, many=True, default=True)
    res = json.dumps(serialized_courses.data, indent=4, sort_keys=True, default=str)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
def addCourse(request):
    courseInfo = dict(request.data)
    if "name" not in courseInfo.keys():
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    if Course.objects.filter(name=courseInfo["name"]):
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    course = Course(name=courseInfo["name"])
    course.save()
    return Response("success", status=status.HTTP_200_OK)
