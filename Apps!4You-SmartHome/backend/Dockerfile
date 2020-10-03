FROM python:3.8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /app

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev libffi libffi-dev
RUN pip install pipenv

ADD Pipfile /app/Pipfile
ADD Pipfile.lock /Pipfile.lock

RUN pipenv install

ADD manage.py /app/manage.py
COPY project /app/project

CMD pipenv run python manage.py runserver -h 0.0.0.0
