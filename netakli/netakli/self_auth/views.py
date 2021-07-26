from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework import status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
from .serialzers import RegistrationSerializer, ChangePasswordSerializer, UpdateUserSerializer, ProfileSerializer, \
    ForgotPasswordSerializer, ChangeForgotPasswordSerializer
from .validators import check_serializer


class RegistrationView(APIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        return Response(*check_serializer(serializer))


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer


class ForgotPasswordView(APIView):
    serializer_class = ForgotPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(request.data, context={'request': request})
        check_serializer(serializer)


class ChangeForgotPasswordView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = ChangeForgotPasswordSerializer
    lookup_url_kwarg = 'activation_code'


class ProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request):
        try:
            profile = Profile.objects.get(user=request.user)
        except:
            profile = Profile.objects.create(user=request.user)
        serializer = ProfileSerializer(instance=profile, context={'request': request})
        check_serializer(serializer)


class UpdateProfileView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer



