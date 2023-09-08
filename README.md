# simple-chat-app

# Setup
In order to run the project locally, you must have node and npm or yarn installed globally.

## Step1

Clone the project and install dependencies in both frontend and backend directory.

```
git clone https://github.com/pinpointdev90/simple-chat-app.git
cd simple-chat-app/frontend && npm install
cd simple-chat-app/backend && yarn install
```

## Step2

Create a mysql database and insert environement variables.

```
cp backend
cp .env.dev .env
```

## Step 3

```
cd simple-chat-app/frontend && npm start
cd simple-chat-app/backend && yarn start
```