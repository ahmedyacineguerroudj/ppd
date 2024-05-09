from django.db import models
from myapp.utils import upload_to

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,UserManager

from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Set password here
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)

class User (AbstractBaseUser, PermissionsMixin):
    User_ID = models.IntegerField(primary_key=True)
    First_Name=models.CharField(max_length=45)
    Last_Name = models.CharField(max_length=45)
    email = models.CharField(max_length=60, unique=True)
    Registration_Date = models.DateField(max_length=20)
    last_login = models.DateField(max_length=20)
    Birthday =models.DateField(max_length=20)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    Baned = models.BooleanField(default=False)
    DisableAccount=models.BooleanField(default=False)
    imageURL = models.CharField(max_length=255, blank=True, null=True)  # New field for storing image URL

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        managed = False
        db_table = 'User'
    def __str__(self):
        return self.email

class Blockchain(models.Model):
    BlockchainID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    launch_date = models.DateField()
    block_time = models.FloatField(null=True)
    consensus_mechanism = models.CharField(max_length=255)
    smart_contract_support = models.BooleanField()
    fork_date = models.DateField(null=True)
    fork_type = models.CharField(max_length=255, null=True)

    class Meta:
        managed = False
        db_table = 'Blockchain'

class Cryptocurrency(models.Model):
    CryptocurrencyID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    symbol = models.CharField(max_length=255, unique=True)
    Blockchain = models.ForeignKey(Blockchain, on_delete=models.CASCADE,db_column='BlockchainID')
    imageURL = models.CharField(max_length=255)
    launch_date = models.DateField()

    class Meta:
        managed = False
        db_table = 'Cryptocurrency'

class Currency(models.Model):
    CurrencyID= models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price_usd = models.FloatField()
    symbol=models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'Currency'

class Market(models.Model):
    Cryptocurrency = models.OneToOneField('Cryptocurrency', on_delete=models.CASCADE, primary_key=True,db_column='CryptocurrencyID')
    Price_USD = models.FloatField()
    Market_Cap = models.FloatField()
    Volume_24hr = models.FloatField()
    Change_24hr = models.FloatField()
    All_Time_High = models.FloatField()
    All_Time_Low = models.FloatField()
    Circulating_Supply = models.FloatField()
    Last_Updated = models.DateTimeField()
    changenow = models.FloatField(default=0)
    changes_in_1h = models.FloatField(default=0)
    changes_in_1d = models.FloatField(default=0)
    changes_in_7d = models.FloatField(default=0)
    downorupPrice = models.IntegerField(default=0)
    downorupin1h = models.IntegerField(default=0)
    downorupin1d = models.IntegerField(default=0)
    downorupin7d = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)

    class Meta:
        managed = False
        db_table = 'Market'

class Wallet(models.Model):
    WalletID = models.AutoField(primary_key=True)
    User = models.ForeignKey('User',on_delete=models.CASCADE,db_column='User_ID')
    Balance_Total = models.FloatField(default=0.0)
    Updated_At = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'Wallet'


class Transactionin(models.Model):
    Transaction_ID = models.AutoField(primary_key=True)
    Cryptocurrency = models.ForeignKey('Cryptocurrency', on_delete=models.CASCADE ,db_column='CryptocurrencyID')
    User = models.ForeignKey('User', on_delete=models.CASCADE, db_column='User_ID')
    Amount = models.FloatField()
    Transaction_Type = models.CharField(max_length=45)
    Transaction_Date = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'Transactionin'


class TransactionOut(models.Model):
    Transaction_ID = models.AutoField(primary_key=True)
    User= models.ForeignKey('User', on_delete=models.CASCADE,db_column='User_ID')
    Currency =models.ForeignKey('Currency', on_delete=models.CASCADE,db_column='Currency')
    Amount = models.FloatField()
    Transaction_Type = models.CharField(max_length=45, blank=True, null=True)
    Transaction_Date = models.DateTimeField(auto_now_add=True)
    class Meta:
        managed = False
        db_table = 'Transactionout'

class WalletCurrencies(models.Model):
    Wallet = models.OneToOneField('Wallet', on_delete=models.CASCADE,db_column='WalletID')
    Cryptocurrency = models.OneToOneField('Cryptocurrency', on_delete=models.CASCADE,db_column='CryptocurrencyID')
    Balance = models.FloatField(default=0.0)
    WalletCurrencyID = models.AutoField(primary_key=True)


    class Meta:
        managed = False
        db_table = 'Wallet_Currencies'
        unique_together = (('Wallet', 'Cryptocurrency'),)






class Transfer(models.Model):
    transfer_id = models.AutoField(primary_key=True)
    cryptocurrency = models.ForeignKey(Cryptocurrency, on_delete=models.CASCADE,db_column='CryptocurrencyID')
    transfer_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=45)
    sender = models.ForeignKey(User, on_delete=models.CASCADE,db_column='User_ID')
    wallet_id = models.IntegerField()
    amount = models.FloatField()
    class Meta:
        managed = False
        db_table = 'Transfer'

class VisaCards(models.Model):
    card_number = models.CharField(max_length=16,primary_key=True)
    cardholder_name = models.CharField(max_length=255)
    expiration_date = models.DateField()
    cvv = models.CharField(max_length=4)
    Country=models.CharField(max_length=60)
    city=models.CharField(max_length=100)
    Address=models.CharField(max_length=200)
    Code_Postal=models.IntegerField()
    User_ID = models.ForeignKey('User', on_delete=models.CASCADE,db_column='User_ID')

    class Meta:
        managed = False
        db_table = 'VisaCards'



