from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from chat.views import UserViewSet, MessageViewSet, register_user, login_user

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'messages', MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', register_user),
    path('api/login/', login_user),
]