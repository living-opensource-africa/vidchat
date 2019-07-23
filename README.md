# Vidchat

A lightweight javascript webrtc based application for video/audio and screen sharing.

## INSTALLATION

To run this application, make sure you have nodejs already installed.
After installation of NodeJs, head over to the path of this app, e.g.

```bash
cd /path/where/app/is/located/vidchat
npm install
```

Also make sure you have a `.env` file that contains the port number you want the app to listen on.
This can be done by creating `.env` in your working directory.

```bash
cd /path/where/app/is/located/vidchat
touch .env
```

And adding the following to the file:

```.env
# .env file
PORT=3443
CERT_KEY=vidchat.key
CERT_FILE=vidchat.crt
```

That will install all required node modules for the application to run.

## RUN THE APP

To run the app, head to the directory where the app is, i.e

```bash
cd /path/to/where/the/app/is/located/vidchat
npm run start
```

## LICENSE

This is an open source project released under the MIT licence, meaning anyone with access to this code can literally do whatever pleases them with the code.
The author(s) of this source code, do not in any way assume any lose and/or damanage that may arise from the use or acquisition of this software.

## CONTRIBUTING

Currently the platform is being maintained by a single developer, if you have any feature request and/or want to add a few whistles and bells, feel free to contact us.
