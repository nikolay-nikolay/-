from rest_framework import viewsets, permissions
from .models import Todo
from .serializers import TodoSerializers

class todoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    permission_classes = [
        permissions.AllowAny
		]
    serializer_class = TodoSerializers