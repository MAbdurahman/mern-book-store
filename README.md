# mern-book-store

## Features
- MongoDB, Express.js, ReactJS, and Node.js
- Authentication and Authorization with JWT
- Cloudinary
- Stripe

### Create config.env file in config directory
```env
PORT=
NODE_ENV=
FRONTEND_URL=
API_ENV=
MONGO_DB_URI=

JWT_SECRET=
JWT_EXPIRES_TIME=
JWT_LIFETIME='90d'

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
STRIPE_API_KEY=

```
### Start the app
```shell
npm install
```
or 
```shell
yarn install
```
then
```shell
npm start
```
or 

```shell
yarn start
```

### Build the app
```shell
npm run build
```
or 

```shell
yarn build
```