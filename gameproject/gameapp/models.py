from django.db import models

# Create your models here.


class CustomerFeedback(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(max_length=254)
    feedback = models.TextField()

class Customer(models.Model):
    CustomerIp=models.CharField(max_length=254)
    TimeofVisit=models.CharField(max_length=254)
