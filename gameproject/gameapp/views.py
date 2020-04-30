from django.shortcuts import render
from gameapp.forms import NewCustomerFeedback
from gameapp.models import Customer
import socket
import datetime
# Create your views here.

def visitor_ip_address(request):

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    try:
        socket.inet_aton(ip)
        ip_valid = True
    except socket.error:
        ip_valid = False

    return ip


def index(request):
    Ip= visitor_ip_address(request)
    if Ip=="127.0.0.1":
        Ip="admin"
    Dateandtime=datetime.datetime.now()
    CustomerID=Customer(CustomerIp=Ip,TimeofVisit=Dateandtime)

    CustomerID.save()

    return render(request,'gameapp/index.html')

def game1(request):
    return render(request,'gameapp/game1.html')

def game2(request):
    return render(request,'gameapp/game2.html')



def game1pvp(request):
    return render(request,'gameapp/game1pvp.html')

def game2pvp(request):
    return render(request,'gameapp/game2pvp.html')



def feedback(request):

    form = NewCustomerFeedback()

    if request.method == "POST":
        form = NewCustomerFeedback(request.POST)

        if form.is_valid():
            form.save(commit=True)
            return index(request)
        else:
            print('ERROR FORM INVALID')

    return render(request,'gameapp/forms.html',{'form':form})
