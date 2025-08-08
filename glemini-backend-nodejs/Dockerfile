FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

RUN mkdir -p src/v1/uploads

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "run","start:prod"]
