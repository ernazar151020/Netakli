from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.permissions import BasePermission

from self_auth.models import Profile


class IsOnline(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            Profile.objects.get(user=request.user)


class IsAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            return request.user is obj.from_user
        except:
            return request.user.is_superuser


class InParticipantsPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            return request.user in obj.participants.all()
        except:
            return request.user.is_superuser


class PermissionsMixin:
    def get_permissions(self):
        if self.action == 'create':
            perm = [IsAuthenticated, InParticipantsPermission, IsOnline]
        elif self.action in ['update', 'partial_update', 'destroy']:
            perm = [IsAuthenticated, InParticipantsPermission, IsAuthor, IsOnline]
        else:
            perm = [IsAuthenticatedOrReadOnly, IsOnline]
        return [i() for i in perm]
