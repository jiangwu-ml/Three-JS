FROM node:19-alpine
WORKDIR /app
COPY . .
RUN npm i anywhere -g

EXPOSE 3000
CMD anywhere -p 3000 -d . -s