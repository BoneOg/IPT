from django.urls import path
from .views import upload_and_run, success_view
 
urlpatterns = [
    path("etl/", upload_and_run, name="etl"),
    path("success/", success_view, name="success"),
]
