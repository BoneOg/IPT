from django.shortcuts import render, redirect, HttpResponse
from .etl import run_etl
 
def upload_and_run(request):
    if request.method == "POST":
        file = request.FILES['csvfile']
        with open("students.csv", "wb+") as f:
            for chunk in file.chunks():
                f.write(chunk)
        run_etl()
        return redirect("success")
    return render(request, "upload.html")

def success_view(request):
    return HttpResponse("Data has been Extracted, Transformed, and Loaded successfully!")
