from rest_framework import viewsets
from .models import LibraryRecord
from .serializers import LibraryRecordSerializer

class LibraryRecordViewSet(viewsets.ModelViewSet):
    serializer_class = LibraryRecordSerializer

    def get_queryset(self):
        queryset = LibraryRecord.objects.all()
        student_id = self.request.query_params.get('student_id', None)
        if student_id is not None:
            queryset = queryset.filter(student_id=student_id)
        return queryset
