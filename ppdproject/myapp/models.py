from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=45)
    firstname=models.CharField(max_length=45)
    lasttname = models.CharField(max_length=45)
    gmail = models.CharField(max_length=60)
    password = models.CharField(max_length=200)
    id = models.CharField(max_length=200)
    accountstatusvarchar = models.CharField(max_length=45)
    registrationdate = models.DateTimeField(max_length=20)
    lastsignindate = models.DateTimeField(max_length=20)
    birthdate =models.DateTimeField(max_length=20)