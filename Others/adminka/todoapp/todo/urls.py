from rest_framework import routers
from .api import todoViewSet

router = routers.DefaultRouter()
router.register('api/todo', todoViewSet, 'todo')

urlpatterns = router.urls