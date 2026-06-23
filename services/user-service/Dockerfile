# Start with official Node.js image
# alpine = lightweight version — smaller image size
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json first
# Why? Docker caches layers — if package.json hasn't changed
# it won't re-run npm install every time. Saves build time.
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Tell Docker this container listens on port 3001
EXPOSE 3001

# Command to start the app
CMD ["node", "index.js"]