from django.urls import path
from .views import SensorDataListCreateAPIView, SensorDataRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', SensorDataListCreateAPIView.as_view(), name='sensordata-list-create'),
    path('<int:pk>/', SensorDataRetrieveUpdateDestroyAPIView.as_view(), name='sensordata-detail'),
]