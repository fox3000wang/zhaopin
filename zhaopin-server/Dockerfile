FROM node:12

# Create app directory
WORKDIR /usr/src/app  

COPY . .

# Install app dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production
#RUN npm run build

EXPOSE 9998
CMD ["npm","run","beta"]
