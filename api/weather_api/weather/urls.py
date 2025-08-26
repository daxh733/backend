from django.urls import path
from .views import GetWeatherData,UserWeatherHistory

urlpatterns=[
    path('weather/history/', UserWeatherHistory.as_view(), name='user_weather_history'),
    path('weather/<str:city>/', GetWeatherData.as_view(), name='get_weather_data'),
]