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
    res = json.dumps(seriazlied_students.data, sort_keys=True, default=str)
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
    res = json.dumps(serialized_courses.data, sort_keys=True, default=str)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
def addCourse(request):
    courseInfo = dict(request.data)
    if "name" not in courseInfo.keys():
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    if Course.objects.filter(name=courseInfo["name"]).exists():
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    course = Course(name=courseInfo["name"])
    course.save()
    return Response("success", status=status.HTTP_200_OK)

@api_view(['GET'])
def getGrades(request):
    allGrades = Grade.objects.all()
    gradeDict = list(allGrades.values())
    res = []
    for grade in gradeDict:
        student = Student.objects.get(id=grade["studentid_id"])
        course = Course.objects.get(id=grade["courseid_id"])
        res.append({
            "student": student.firstname + " " + student.familyname,
            "course": course.name,
            "score": grade["score"]
        })
    
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
def addGrades(request):
    gradeInfo = dict(request.data)
    if "course" not in gradeInfo.keys() or "student" not in gradeInfo.keys() or "score" not in gradeInfo.keys():
        return Response("", status=status.HTTP_400_BAD_REQUEST)

    course = gradeInfo["course"]
    student = gradeInfo["student"]
    print(student.split())
    if len(student.split()) != 2:
        print("invalid student name")
        return Response("", status=status.HTTP_400_BAD_REQUEST)
    
    firstName = student.split()[0]
    familyName = student.split()[1]

    if Course.objects.filter(name=course).exists() and Student.objects.filter(firstname=firstName, familyname=familyName).exists():
        student = Student.objects.get(firstname=firstName, familyname=familyName)
        course = Course.objects.get(name=course)
        if Grade.objects.filter(studentid=student, courseid=course).exists():
            return Response("grade exists for this course", status=status.HTTP_400_BAD_REQUEST)
        
        grade = Grade(studentid=student, courseid=course, score=gradeInfo["score"])
        grade.save()

        return Response("success", status=status.HTTP_200_OK)
    return Response("invalid input", status=status.HTTP_400_BAD_REQUEST)


