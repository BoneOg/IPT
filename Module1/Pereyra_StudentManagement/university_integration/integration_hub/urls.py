from django.urls import path
from .views import IntegrationHubView

urlpatterns = [
    path('hub/<str:student_id>/', IntegrationHubView.as_view()),
]
