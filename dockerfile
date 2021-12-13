# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:alpine as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

RUN npm cache clean --force
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build && npm install --production --ignore-scripts --prefer-offline

# Install all the dependencies
#RUN npm install

# Generate the build of the application
#RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest AS ngi

# copiar la configuración nginx para el ruteo de angular/react
#COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/front-yaml/assets/nginx.conf /usr/share/nginx/html
COPY --from=build /usr/local/app/dist/front-yaml/assets/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/front-yaml /usr/share/nginx/html

# Expose port 80
EXPOSE 80