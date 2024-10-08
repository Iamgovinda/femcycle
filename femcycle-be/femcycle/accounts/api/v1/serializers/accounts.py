from rest_framework import serializers

from femcycle.accounts.models import User, UserData
from femcycle.commons.serializers import DynamicFieldsModelSerializer
from django.contrib.auth.password_validation import validate_password as dj_validate_password
from femcycle.accounts.utils import predictor


class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'name', 'is_active', 'groups', 'last_activity',
                  'updated_at', 'profile_picture', 'phone_number', 'gender', 'dob', 'receive_offer')
        read_only_fields = 'username', 'email', 'last_activity', 'updated_at',

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request and request.method.lower() == 'get':
            fields['profile_picture'] = serializers.URLField(source='profile_picture_thumb')
        if request and request.method.lower() == 'patch':
            fields.pop('groups')
            fields.pop('is_active')
            fields.pop('receive_offer')
        return fields

    @staticmethod
    def get_groups(obj):
        return obj.groups.all().values_list('name', flat=True)

    @staticmethod
    def validate_name(name):
        return name.title()

    @staticmethod
    def validate_phone_number(phone_number):
        import re
        reg_phone_number = re.compile("^(?:98|97|96)\d{8}$")
        if not reg_phone_number.match(phone_number):
            raise serializers.ValidationError("Please enter correct phone number!")
        return phone_number


class ProfilePictureUpdateSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ('profile_picture',)
        extra_kwargs = {
            'profile_picture': {
                'required': True,
                'allow_null': False,
            }
        }


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128, write_only=True,
                                         style={'input_type': 'password'})
    password = serializers.CharField(max_length=128, write_only=True,
                                     style={'input_type': 'password'})
    repeat_password = serializers.CharField(max_length=128, write_only=True,
                                            style={'input_type': 'password'})

    @staticmethod
    def validate_password(password):
        dj_validate_password(password)
        return password

    def validate(self, attrs):
        user = self.context['user']
        if not user.is_active:
            raise serializers.ValidationError('User not active')

        if attrs['password'] != attrs['repeat_password']:
            raise serializers.ValidationError('Passwords did not match')

        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError({'old_password': ['Old password did not match']})
        return attrs

    def create(self, validated_data):
        user = self.context['user']
        user.set_password(validated_data.get('password'))
        user._send_password_change_email = True
        user.save()
        return object()


class UserDataSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = UserData
        fields = "__all__"
        read_only_fields = 'id', 'user'

    def create(self, validated_data):
        age = validated_data.get('age')
        length_of_cycle = validated_data.get('length_of_cycle')
        length_of_luteal = validated_data.get('length_of_luteal')
        total_num_of_high_days = validated_data.get('total_num_of_high_days')
        total_num_of_peak_days = validated_data.get('total_num_of_peak_days')
        total_days_of_fertility = validated_data.get('total_days_of_fertility')
        bmi = validated_data.get('bmi')
        total_fertility_formula = validated_data.get('total_fertility_formula')
        length_of_menses = validated_data.get('length_of_menses')
        next_evolution_date = predictor(age, length_of_cycle, length_of_luteal, total_num_of_high_days,
                                        total_num_of_peak_days, total_days_of_fertility, bmi, total_fertility_formula,
                                        length_of_menses)
        print(next_evolution_date)
        user_data = UserData.objects.create(**validated_data)
        return user_data
