
import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ppdproject.settings')
django.setup()
import requests
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from datetime import datetime

class LuhnValidator(RegexValidator):
    def __init__(self, message=None):
        super().__init__(regex=r'^[0-9]{13,19}$', message=message or 'Invalid card number format.')

    def __call__(self, value):
        super().__call__(value)
        if not self.is_valid_luhn(value):
            raise ValidationError('Invalid card number.')

    @staticmethod
    def is_valid_luhn(card_number):
        """
        Check if the card number is valid according to the Luhn algorithm.
        """
        digits = [int(digit) for digit in str(card_number)]
        checksum = sum(digits[::-2]) + sum(sum(divmod(2 * digit, 10)) for digit in digits[-2::-2])
        return checksum % 10 == 0

class CVCValidator(RegexValidator):
    """
    Validator to check if a card verification code (CVC) is valid.
    """

    def __init__(self, message=None):
        super().__init__(regex=r'^[0-9]{3,4}$', message=message or 'Invalid CVC.')

class ExpiryDateValidator:
    def __call__(self, value):
        if not value:
            raise ValidationError('Expiration date is required.')
        try:
            # Check if the input contains a hyphen (-) to split the year and month
            if '-' in value:
                expiry_date = datetime.strptime(value + '-01', '%Y-%m-%d')
            else:
                raise ValueError("Invalid expiration date format. Please use YYYY-MM.")

            if expiry_date < datetime.now():
                ValidationError('Card has expired.')
        except ValueError as e:
            raise ValidationError(str(e))

class CardholderNameValidator(RegexValidator):
    def __init__(self, message=None):
        super().__init__(regex=r'^[a-zA-Z ]+$', message=message or 'Invalid cardholder name format.')
