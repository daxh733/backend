# from django.shortcuts import render
import requests
from django.conf import settings
from rest_framework import generics,permissions
from .models import WeatherData
from .serializers import WeatherDataSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
    
# Create your views here.
class GetWeatherData(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request,city):
        api_key='a40d0a961367426cb6fbbe56a3dbe21c'
        url=f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'

        response=requests.get(url)
        data=response.json()
        print(data)
        if response.status_code==200:
            WeatherData.objects.create(user=request.user,city=city,result=data)
            return Response(data)
        else:
            return Response({"error": "City not found"}, status=404)


class UserWeatherHistory(generics.ListAPIView):
    serializer_class=WeatherDataSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        return WeatherData.objects.filter(user=self.request.user).order_by("-searched_at")