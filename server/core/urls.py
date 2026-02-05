from django.urls import path
from .views import (
    submit_project,
    add_reduction_data,
    upload_emissions,
    marketplace_credits,
    buy_credit_api,
    retire_credit_api,
)

from .views import (
    dashboard_api,
    my_credits_api,
    retire_credit_api,
    verify_emissions_api
)


urlpatterns = [
    path("projects/", submit_project),
    path("reduction-data/", add_reduction_data),
    path("emissions/", upload_emissions),
    path("marketplace/", marketplace_credits),
    path("buy/", buy_credit_api),
    path("retire/", retire_credit_api),
    path("dashboard/", dashboard_api),
    path("my-credits/", my_credits_api),
    path("retire/", retire_credit_api),
    path("verify-emissions/", verify_emissions_api),
]
