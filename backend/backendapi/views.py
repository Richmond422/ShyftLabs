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
    else:
        student = Student(firstname=studentInfo["firstname"], familyname=studentInfo["familyname"], birthdate=studentInfo["birthdate"])
        student.save()
    return Response("success", status=status.HTTP_200_OK)