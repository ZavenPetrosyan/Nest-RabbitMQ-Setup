# Base Stage
FROM node:18 as base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3001

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

FROM base as dev
CMD ["npm", "run", "start:debug"]

FROM base as production
RUN npm run build
CMD ["npm", "run", "start:prod"]
