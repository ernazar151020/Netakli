"""Netakli URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.routers import DefaultRouter

from chat.views import get_filter_by_total, ThemeViewSet, \
    TotalThemeAPIView, get_self_groups, MessageViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='API Docs',
        default_version='v1',
    )
)
router = DefaultRouter()
router.register('theme', ThemeViewSet)
router.register('total-theme', TotalThemeAPIView)
router.register('message', MessageViewSet)

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path("api/v1/accounts/", include("self_auth.urls")),
    path('api/v1/filter_by_total/<str:slug>/', get_filter_by_total, name='filter-by-total'),
    path('api/v1/theme/get_self_groups/<str:slug>/', get_self_groups, name='filter-self-groups'),
    path('api/v1/', include(router.urls))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, docement_root=settings.STATICFILES_DIRS)
