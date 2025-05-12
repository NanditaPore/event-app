from django.urls import path
from . import views

urlpatterns=[
    path('',views.events_list),
    path('<int:event_id>/',views.events_detail),
]