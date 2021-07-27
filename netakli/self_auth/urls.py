from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny

from .views import RegistrationView, LogoutView, ChangePasswordView, UpdateProfileView, ProfileAPIView, \
    ForgotPasswordView, ChangeForgotPasswordView

urlpatterns = [
    path('registration/', RegistrationView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(permission_classes=(AllowAny,)), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('forgot_password/', ForgotPasswordView.as_view(), name='auth_forgot_password'),
    path('change_forgot_password/<int:pk>/', ChangeForgotPasswordView.as_view(), name='auth_change_forgot_password'),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('profile/', ProfileAPIView.as_view(), name='auth_profile'),
    path('update_profile/<int:pk>/', UpdateProfileView.as_view(), name='auth_update_profile'),
]
