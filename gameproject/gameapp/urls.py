from django.conf.urls import url
from gameapp import views

app_name = 'gameapp'

urlpatterns =[
    url(r'^feedback/$',views.feedback,name='feedback'),
    url(r'^game1pvp/$',views.game1pvp,name='game1pvp'),
    url(r'^game2pvp/$',views.game2pvp,name='game2pvp'),
    url(r'^game1/$',views.game1,name='game1'),
    url(r'^game2/$',views.game2,name='game2'),
]
