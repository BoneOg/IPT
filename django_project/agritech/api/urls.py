from django.urls import path, include

urlpatterns = [
    path('posts/', include('post.urls')),
]
