from django.db import models

# Create your models here.

class User (models.Model):
    User_ID = models.IntegerField(primary_key=True)
    First_Name=models.CharField(max_length=45)
    Last_Name = models.CharField(max_length=45)
    email = models.CharField(max_length=60)
    Password = models.CharField(max_length=200)
    Registration_Date = models.DateField(max_length=20)
    last_login = models.DateField(max_length=20)
    Birthday =models.DateField(max_length=20)

    class Meta:
        managed = False
        db_table = 'User'

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
    launch_date = models.DateField()
    BlockchainID =models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Cryptocurrency'

class Market(models.Model):
    CryptocurrencyID = models.IntegerField(primary_key=True)
    Price_USD = models.DecimalField(max_digits=15, decimal_places=10)
    Market_Cap = models.DecimalField(max_digits=15, decimal_places=2)
    Volume_24hr = models.DecimalField(max_digits=15, decimal_places=2)
    Change_24hr = models.DecimalField(max_digits=15, decimal_places=2)
    All_Time_High = models.DecimalField(max_digits=15, decimal_places=10)
    All_Time_Low = models.DecimalField(max_digits=15, decimal_places=10)
    Circulating_Supply = models.DecimalField(max_digits=20, decimal_places=2)
    Last_Updated = models.DateField()

    class Meta:
        managed = False
        db_table = 'Market'
class Wallet(models.Model):
    WalletID = models.AutoField(primary_key=True)
    User_ID = models.IntegerField()
    Balance_Total = models.DecimalField(max_digits=15, decimal_places=10, null=True)
    Updated_At = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'Wallet'


class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    cryptocurrency = models.ForeignKey(Cryptocurrency, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=10)
    transaction_type = models.CharField(max_length=45, default='BUY')
    transaction_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        managed = False
        db_table = 'Transaction'


class WalletCurrencies(models.Model):
    WalletID = models.IntegerField()
    CryptocurrencyID = models.IntegerField()
    Balance = models.DecimalField(max_digits=15, decimal_places=10)
    class Meta:
        managed = False
        db_table = 'Wallet_Currencies'

class Transfer(models.Model):
    transfer_id = models.AutoField(primary_key=True)
    cryptocurrency = models.ForeignKey(Cryptocurrency, on_delete=models.CASCADE)
    transfer_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=45)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    wallet_id = models.IntegerField()
    amount = models.DecimalField(max_digits=15, decimal_places=10)
    class Meta:
        managed = False
        db_table = 'Transfer'