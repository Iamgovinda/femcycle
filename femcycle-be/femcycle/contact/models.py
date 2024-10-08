from django.db import models

# Create your models here.
from femcycle.commons.models import UUIDBaseModel


class Contact(UUIDBaseModel):
    name = models.CharField(max_length=100, default='')
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=500, null=True, blank=True)
    message = models.TextField(null=True, blank=True)


class FAQ(UUIDBaseModel):
    name = models.CharField(max_length=100, default='')
    subject = models.CharField(max_length=1000, null=True, blank=True)
    message = models.TextField(null=True, blank=True)

