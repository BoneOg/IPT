from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentRecordViewSet, login_view

router = DefaultRouter()
router.register(r'student-records', StudentRecordViewSet, basename='student-record')

urlpatterns = [
    path('', include(router.urls)),
    path('secure-login/', login_view, name='secure-login'),
]
