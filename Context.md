Lab Activity
Problem Scenario
You are tasked to create a REST API for managing students in a university system.
 The API must allow clients (web or mobile apps) to create, retrieve, update, and delete student records.
 
Part A: Environment Setup
1. Create Django Project and App
django-admin startproject student_api
cd student_api
python manage.py startapp students
2. Install Django REST Framework
pip install djangorestframework
3. Update settings.py
INSTALLED_APPS = [
	...
	'rest_framework',
	'students',
]
 
Part B: Model Design
Create Student Model (students/models.py)
from django.db import models
 
class Student(models.Model):
	student_id = models.CharField(max_length=20, unique=True)
	full_name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	course = models.CharField(max_length=100)
	year_level = models.IntegerField()
 
	def __str__(self):
    	return self.full_name
python manage.py makemigrations
python manage.py migrate
 
Part C: Serializer
Create Serializer (students/serializers.py)
from rest_framework import serializers
from .models import Student
 
class StudentSerializer(serializers.ModelSerializer):
	class Meta:
    	model = Student
    	fields = '__all__'
 
Part D: Views (REST API Endpoints)
Create API Views (students/views.py)
from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
 
class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	serializer_class = StudentSerializer
 
Part E: URL Routing
Configure URLs (students/urls.py)
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet
 
router = DefaultRouter()
router.register(r'students', StudentViewSet)
 
urlpatterns = router.urls
Include in Main URLs (student_api/urls.py)
from django.urls import path, include
 
urlpatterns = [
	path('api/', include('students.urls')),
]
 
Part F: Testing the API (Postman)
Method
Endpoint
Description
GET
/api/students/
Retrieve all students
POST
/api/students/
Create new student
PUT
/api/students/{id}/
Update student
DELETE
/api/students/{id}/
Delete student

Sample JSON Request
{
  "student_id": "2024-001",
  "full_name": "Juan Dela Cruz",
  "email": "juan@student.edu",
  "course": "BSIT",
  "year_level": 3
}
 
Lab Output
·   	Working REST API
·   	Screenshot of Postman test results
·   	Source code submission
