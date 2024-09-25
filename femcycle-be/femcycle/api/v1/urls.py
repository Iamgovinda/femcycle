from django.urls import include, path

urlpatterns = [
    path('accounts/', include('femcycle.authentication.api.v1.urls')),
    path('commons/', include('femcycle.commons.api.v1.urls')),
    path('contact/', include('femcycle.contact.api.v1.urls')),
    path('user/', include('femcycle.accounts.api.v1.urls')),
]
