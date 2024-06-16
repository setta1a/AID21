from django.db import models

class User(models.Model):
    name = models.CharField(max_length=64)
    surname = models.CharField(max_length=64)
    middleName = models.CharField(max_length=64)
    birthDate = models.CharField(max_length=64)
    gender = models.CharField(max_length=64)
    citizenship = models.CharField(max_length=64)
    region = models.CharField(max_length=64)
    mobile = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    contacts = models.CharField(max_length=64)
    about = models.CharField(max_length=64)
    avatar = models.CharField(max_length=64)

