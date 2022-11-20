FROM node:16-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy dependency files files
COPY package*.json /app/
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci --legacy-peer-deps
# Copy app files
COPY . /app/
# Expose port
EXPOSE 3000
# Run dev server
CMD ["npm", "run", "dev"]
