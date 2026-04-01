from django.db import models

class SensorData(models.Model):
    plant_name = models.CharField(max_length=100, default="Unknown Crop")
    
    soil_moisture = models.FloatField()
    soil_temperature = models.FloatField()
    soil_ph = models.FloatField()
    
    air_temperature = models.FloatField()
    humidity = models.FloatField()
    leaf_wetness = models.FloatField()

    def __str__(self) -> str:
        return f'{self.plant_name} - {self.id}'
