from django.contrib import admin

# Register your models here.
from femcycle.accounts.models import User

admin.site.register(User)
