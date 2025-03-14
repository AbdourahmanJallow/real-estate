FROM node:20

WORKDIR /app

COPY package*.json ./

# Install dependencies, including development dependencies
RUN npm install --production=false

COPY . .

ENV PORT=8080

EXPOSE 8080

# build typescript code
RUN npm run build

# ru application in dev mode
CMD ["npm", "run", "dev"]