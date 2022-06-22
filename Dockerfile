#FROM node:10-alpine
FROM node:12

RUN mkdir -p /app

WORKDIR /app

# install package
ADD package*.json ./
RUN npm install

# copy source code
ADD . ./

# environment variable
ENV HOST=0.0.0.0
ENV PORT=1337
ENV APP_KEYS=BCvxZC03vZ0bhzrvP2pIaQ==,R0629ghN8wvWxnZlWkILpw==,QmutAxGpKDV1hCq0BNLrXA==,YNmnjqbzliSXSRvNBBq4JQ==
ENV API_TOKEN_SALT=TXtuXikPZ3v4Ykq4ZIJfsQ==
ENV ADMIN_JWT_SECRET=YljzaukkZmnCZ/Wo4HI/cA==
ENV JWT_SECRET=Dv03LCXHoHiBf7h7G94bww==

EXPOSE 8000

CMD ["node", "server.js"]
