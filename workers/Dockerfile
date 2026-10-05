FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["pm2-runtime", "workers/ecosystem.config.js"]

