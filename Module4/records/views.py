from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import StudentRecord, Payment
from .serializers import StudentRecordSerializer, PaymentSerializer

class IsAdminOrFaculty(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['Admin', 'Faculty']).exists()

class StudentRecordViewSet(ModelViewSet):
    queryset = StudentRecord.objects.all()
    serializer_class = StudentRecordSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            permission_classes = [IsAdminUser]
        elif self.action in ['update', 'partial_update']:
            permission_classes = [IsAdminOrFaculty]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class PaymentViewSet(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

import logging
from django.http import JsonResponse
from ratelimit.decorators import ratelimit

logger = logging.getLogger('records')

@ratelimit(key='ip', rate='5/m', block=True)
def login_view(request):
    # For lab purposes, we log the warning on access to show the trace
    logger.warning("Multiple failed login attempts detected")
    return JsonResponse({"message": "Login view accessed. Rate limit is active."})
