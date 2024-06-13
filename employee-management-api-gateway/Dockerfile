FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Copy the employee.proto file to the dist directory
RUN cp src/employee.proto dist/

EXPOSE 4000

CMD ["npm", "start"]
