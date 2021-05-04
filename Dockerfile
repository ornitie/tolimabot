FROM node:10-stretch as intermediate
RUN mkdir /code
COPY . /code
WORKDIR /code
RUN npm i

CMD sh entrypoint.sh