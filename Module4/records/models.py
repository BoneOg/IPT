from django.db import models
from django.contrib.auth.models import User

class StudentRecord(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    course = models.CharField(max_length=50)
    year_level = models.IntegerField()

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    encrypted_credit_card = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
