import random
import threading

from django.core.mail import send_mail
from django_q.tasks import async_task

from config import settings
from config.settings import HOST_EMAIL
from femcycle.authentication.models import UserOTPVerification


def user_account_activation_otp_to_email(user):
    otp = settings.DEFAULT_OTP
    if not settings.OTP_TEST_MODE:
        import random
        otp = random.randrange(100000, 999999)

    otp_request = UserOTPVerification.objects.create(email=user.email, otp=otp)
    print("here")
    t1 = threading.Thread(target=send_mail_reset, args=(
        user, f"Hello user, the otp for user registration is {otp}. OTP expires in a day.",))
    t1.start()
    return otp_request


def send_mail_reset(user, message):
    print(user, message)
    send_mail(
        "Password reset",
        message,
        HOST_EMAIL,
        [user.email],
        fail_silently=True
    )


#
def send_password_reset_email(user):
    otp = settings.DEFAULT_OTP
    if not settings.OTP_TEST_MODE:
        otp = random.randrange(100000, 999999)

    otp_request = UserOTPVerification.objects.create(email=user.email, otp=otp)
    t1 = threading.Thread(target=send_mail_reset, args=(
    user, f"Hello user, the otp for account password reset is {otp}. OTP expires in a day."))

    t1.start()
    return otp_request
