# Stage 1: Build client
FROM node:latest AS client
WORKDIR /client
COPY client/package.json ./client/
RUN npm install
COPY client ./client/
RUN npm run build


# Stage 2: Build server
FROM node:latest AS server
WORKDIR /server
COPY server/package.json /.
RUN npm install
COPY server /.
COPY --from=client /client/build /client
EXPOSE 8080
CMD ["npm", "serve"]
