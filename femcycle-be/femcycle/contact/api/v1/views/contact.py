from femcycle.commons.mixins.viewsets import ListCreateRetrieveViewSetMixin
from femcycle.contact.api.v1.serializers.contact import ContactSerializer, FAQSerializer
from femcycle.contact.models import Contact, FAQ


class ContactViewSet(ListCreateRetrieveViewSetMixin):
    lookup_field = 'uuid'
    lookup_url_kwarg = 'uuid'
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class FAQViewSet(ListCreateRetrieveViewSetMixin):
    lookup_field = 'uuid'
    lookup_url_kwarg = 'uuid'
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    