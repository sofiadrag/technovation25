# React Native + Firebase Seed

## Prerequisites

- an IDE, such as [VS Code](https://code.visualstudio.com/)
- [Git Client](https://git-scm.com/download/win)
- [NodeJs](https://nodejs.org/en/)
- [React Native / Expo CLI](https://reactnative.dev/docs/environment-setup)
- A [Firebase](https://firebase.google.com/docs/web/setup) web application

## Quick start

Setup a `firebase-config.json` file at the root of the project, as instructed [here](https://docs.expo.dev/guides/using-firebase/).

The file should look like this:

```
{
    "apiKey": "[YOUR_API_KEY]",
    "authDomain": "[YOUR_DOMAIN].firebaseapp.com",
    "projectId": "[YOUR_PROJECT_ID]",
    "storageBucket": "[YOUR_STORAGE_BUCKET].appspot.com",
    "messagingSenderId": "[YOU_GET_THE_POINT]",
    "appId": "[THIS_IS_THE_MOST_IMPORTANT_LINE]
  }
```

In a terminal:

```
git clone https://github.com/deroude/react-native-firebase-seed.git
cd react-native-firebase-seed
npm install
npm start
```
If when you open expo, it binds to a different ip than your local network, you can force it to bind on a specific ip, by changing the expo start command in package.json like following: `"start": "set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.x.xxx && expo start",`
