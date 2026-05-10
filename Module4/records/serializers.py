from rest_framework import serializers
from .models import StudentRecord, Payment
from django.conf import settings
from cryptography.fernet import Fernet

class StudentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentRecord
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    credit_card = serializers.CharField(write_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'user', 'credit_card', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        credit_card = validated_data.pop('credit_card')
        cipher = Fernet(settings.FERNET_KEY)
        encrypted_cc = cipher.encrypt(credit_card.encode('utf-8'))
        payment = Payment.objects.create(
            encrypted_credit_card=encrypted_cc,
            **validated_data
        )
        return payment
