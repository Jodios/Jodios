FROM alpine:latest 

WORKDIR /app
COPY ./build/server ./
COPY ./static ./static

ENV JODIOS_SERVER_PORT=3000
ENV JODIOS_ENV=prod
EXPOSE 3000 
CMD [ "./server" ]