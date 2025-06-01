FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalar netcat para que wait-for-it.sh funcione
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

EXPOSE 3000

# Aquí es donde se usa wait-for-it.sh para esperar a la DB
CMD ["./wait-for-it.sh", "db_cinerex:5432", "--", "npm", "run", "start:dev"]
