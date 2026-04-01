from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('student_app.urls')),
    path('api/', include('library_app.urls')),
    path('api/', include('payment_app.urls')),
    path('api/', include('integration_hub.urls')),
]
