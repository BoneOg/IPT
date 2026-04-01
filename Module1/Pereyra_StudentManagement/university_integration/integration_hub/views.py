import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class IntegrationHubView(APIView):
    def get(self, request, student_id):
        student_response = requests.get(f'http://127.0.0.1:8000/api/students/{student_id}/')
        library_response = requests.get(f'http://127.0.0.1:8000/api/library/?student_id={student_id}')
        payment_response = requests.get(f'http://127.0.0.1:8000/api/payments/?student_id={student_id}')
        
        student_data = student_response.json() if student_response.status_code == 200 else {}
        library_data = library_response.json() if library_response.status_code == 200 else []
        payment_data = payment_response.json() if payment_response.status_code == 200 else []

        consolidated_data = {
            "student_profile": student_data,
            "library_records": library_data,
            "payment_records": payment_data
        }
        
        return Response(consolidated_data)
