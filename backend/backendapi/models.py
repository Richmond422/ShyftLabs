from __future__ import unicode_literals

from django.db import models


class Course(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'course'


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Grade(models.Model):
    studentid = models.ForeignKey('Student', models.DO_NOTHING, db_column='studentID')  # Field name made lowercase.
    courseid = models.ForeignKey(Course, models.DO_NOTHING, db_column='courseID')  # Field name made lowercase.
    score = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'grade'


class Student(models.Model):
    firstname = models.CharField(db_column='firstName', max_length=100)  # Field name made lowercase.
    familyname = models.CharField(db_column='familyName', max_length=100)  # Field name made lowercase.
    birthdate = models.DateField(db_column='birthDate')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'student'
