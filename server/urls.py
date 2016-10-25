"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from views import IndexView
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from django.conf import settings
from django.conf.urls.static import static

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # The url that contains api/v1 are routed to viewset
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    # Passthrough: All not matching go to index
    url('^.*$', IndexView.as_view(), name='index'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
