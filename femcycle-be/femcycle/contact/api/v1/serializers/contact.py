from femcycle.commons.serializers import DynamicFieldsModelSerializer
from femcycle.contact.models import Contact, FAQ


class ContactSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Contact
        fields = ['uuid', 'name', 'email', 'subject', 'message']


class FAQSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = FAQ
        fields = ['uuid', 'name', 'subject', 'message']
