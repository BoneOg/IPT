import pandas as pd
import math
from .models import StudentRaw, StudentClean
 
def extract_csv():
    data = pd.read_csv("students.csv")
    for _, row in data.iterrows():
        StudentRaw.objects.create(
            student_id=row['id'],
            name=row['name'] if not (isinstance(row['name'], float) and math.isnan(row['name'])) else None,
            course=row['course'] if not (isinstance(row['course'], float) and math.isnan(row['course'])) else None
        )
    print("Extraction completed!")

def transform_data():
    raw_data = StudentRaw.objects.all()
    cleaned = []
    for student in raw_data:
        name = student.name if student.name else "Unknown"
        course = student.course if student.course else "Not Assigned"
        cleaned.append({
            "student_id": student.student_id,
            "full_name": name.title(),
            "course": course.upper()
        })
    return cleaned

def load_data(cleaned_data):
    for row in cleaned_data:
        StudentClean.objects.create(
            student_id=row['student_id'],
            full_name=row['full_name'],
            course=row['course']
        )
    print("Loading completed!")

def run_etl():
    extract_csv()
    cleaned = transform_data()
    load_data(cleaned)
