FROM nginx
RUN mkdir /app
ADD dist/Kudo /app
COPY nginx.conf /etc/nginx/nginx.conf