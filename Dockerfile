# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package.json .

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Install TypeScript globally and build the TypeScript code
RUN npm install -g typescript
RUN npm run build

# Expose the port Cloud Run will use
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/app.js"]
