FROM node:12

# Create app directory
WORKDIR /usr/src/app  

COPY package*.json ./

# Install app dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production
# RUN npm run build

# Bundle app source
COPY . .

EXPOSE 9998
CMD [ "node", "dist/main" ]