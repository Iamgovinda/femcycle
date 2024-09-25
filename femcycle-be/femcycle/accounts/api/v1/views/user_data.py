from rest_framework.viewsets import ModelViewSet
from femcycle.accounts.models import UserData


class UserDataViewset(ModelViewSet):
    serializer_class = UserData.objects.all()

