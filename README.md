Author: Arthur Kalikiti
Date: 20 February, 2019


This is a video library written and implemented in javascript.
This code base uses NodeJS for the backend and WebSockets to communicate in real time,
and WebRTC for real time video streaming.

NOTE: This application only runs in on HTTPS, as the use of HTTP with WebRTC is deprecated in most modern browsers.
Be certain to setup a self signed certificate for development purposes, and use LetsEncrypt free certificate in production (Any CA is applicable though).
