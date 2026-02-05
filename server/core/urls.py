from django.urls import path
from .views import submit_project, add_reduction_data, upload_emissions

urlpatterns = [
    path("projects/", submit_project),
    path("reduction-data/", add_reduction_data),
    path("emissions/", upload_emissions),
]
