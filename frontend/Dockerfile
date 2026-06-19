FROM nginx:alpine

# remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy your frontend files
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

EXPOSE 80
