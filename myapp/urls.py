from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns =[
    path('',views.home,name='home'),
    path('settings/',views.settings,name='settings'),
    path('butandsell/', views.buyandsell, name='buyandsell'),
    path('sign/', views.sign, name='sign'),
    path('depost&withdraw/', views.deposit, name='depost&withdraw'),
    path('exchange/', views.exchange, name='exchange'),
    path('Marketpage/', views.Marketpage, name='Marketpage'),
    path('walletpage/', views.walletpage, name='walletpage'),
    path('adminpage/', views.adminpage, name='adminpage'),
    path('signout/', views.signout, name='signout'),
    path('home/', views.home, name='home'),
    path('trade/', views.trade, name='trade'),
















    path('sendallcrypto/',views.sendallcrypto),
    path('sendmarket/',views.sendmarket),
    path('sendtransction/',views.sendtransction),
    path('sendcurrecny/',views.sendcurrecny),
    path('hhhhh/',views.hhhhh),

    path('validthecard/',views.validthecard),
    path('sendassists/',views.sendassets),
    path('fild1/', views.fild1),
    path('fild2/', views.fild2),
    path('sendhotcrypto/', views.sendhotcrypto),
    path('senddata/', views.senddata),
    path('sendtopvaluecrypto/', views.sendtopvaluecrypto),
    path('sendtopgainercrypto/', views.sendtopgainercrypto),
    path('sendnewlistedcrypto/', views.sendnewlistedcrypto),
    path('senduserinfo/', views.senduserinfo),
    path('sendalluser/', views.sendalluser),
    path('sendalluser/', views.sendalluser),
    path('sendallvisacard/', views.sendallvisacard),
    path('islogin/', views.islogin),
    path('sendallcurroncy/', views.sendallcurroncy),
    path('sendtradeinfo/', views.sendtradeinfo),


]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)