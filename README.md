# ScreenCast

A lightweight javascript webrtc based application for video/audio and screen sharing.

## INSTALLATION

This application makes use of janus webserver to make a 1 to many WebRTC connection.
So make sure you start by installing janus webserver.

if you are on Ubuntu or any Debian based Linux that supports snaps. 
You can install it by:

```bash
sudo snap install janus-gateway
```

If you need to install it on a RHEL based machine, please check
[this](https://www.agix.com.au/installing-janus-on-redhat-enterprise-linux/) tutorial

And for any other OS you can use [this howto](https://github.com/meetecho/janus-gateway/blob/master/README.md)

To run this application, you need a web server, any will do. This is just normal
html code, but because we are using WebRTC, you need a webserver for it to work.
You can configure an nginx server block or apache virtualhost, or any web server of your choice.

After that you can access this app in your browser suing either http or https.

>*Note well!* If you want to share your screen, you may need to open the HTTPS version of this page. If Janus is not behind the same webserver as the pages that are served (that is, you didn't configure a proxying of HTTP requests to Janus via a web frontend, e.g., Apache HTTPD), make sure you started it with HTTPS support as well, since for security reasons you cannot contact an HTTP backend if the page has been served via HTTPS. Besides, if you configured Janus to make use of self-signed certificates, try and open a generic link served by Janus in the browser itself, or otherwise AJAX requests to it will fail due to the unsafe nature of the certificate.

## LICENSE

This is an open source project released under the MIT licence, meaning anyone with access to this code can literally do whatever pleases them with the code.
The author(s) of this source code, do not in any way assume any lose and/or damanage that may arise from the use or acquisition of this software.

## CONTRIBUTING

If you have any feature request and/or want to add a few whistles and bells, feel free to contact us.
But first, have a look at our [CONTRIBUTING.md](CONTRIBUTING.md)
