# API Django App

This folder contains the `api` Django app responsible for handling all RESTful API endpoints and backend logic related to data exchange in the project.

---

## Overview

- Built with Django REST Framework (DRF)
- Contains serializers, views, URLs, and models specific to the API
- Designed to be modular and integrated within the main Django backend project

---

## Folder Structure

api/
├── migrations/ # Database migrations
├── serializers.py # DRF serializers
├── urls.py # API endpoint routes
├── views.py # API views and logic
├── models.py # Database models
├── tests.py # Test cases for the API
└── apps.py # App configuration


Make sure the `api` app is included in the main project's `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    # other apps
    'api',
]


python manage.py migrate
python manage.py runserver
