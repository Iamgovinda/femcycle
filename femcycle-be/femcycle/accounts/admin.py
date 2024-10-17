from django.contrib import admin

# Register your models here.
from femcycle.accounts.models import User, UserData

admin.site.register([User, UserData])
