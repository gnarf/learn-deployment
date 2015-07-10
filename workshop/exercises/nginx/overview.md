# NGINX

In order for your host to respond to incoming HTTP requests from a user's web browser it needs to be running an HTTP server. There are many available, like `Apache`, `IIS`, `lighttpd` but this workshop focuses on `NGINX` because it's configuration files are relatively easy to understand.

Like many applications NGINX looks inside a `conf.d` directory (located in `/etc/nginx/`) for configuration files to load. It's a good idea for each service or site being hosted to have its own descriptively named configuration file so that it can be safely modified without concern of unintended consequences.

Even though NodeJS can function as an HTTP server on a high numbered port it's generally a better idea to front NodeJS applications with NGINX both for performance and security reasons. NGINX is lightening fast at serving static files and is capable of handling a high load without over taxing the machine's underlying hardware.

Besides being an HTTP server NGINX is also an HTTP proxy; meaning it can pass and distribute traffic to other HTTP servers. Within it's configuration file NGINX makes use of the `upstream` directive to organize and define a server or group of servers that should have traffic routed to them that initially arrived somewhere else. For the purpose of this exercise we'll be focusing on NGINX's `proxy_pass` directive.

By telling NGINX to include the `proxy_params` module and then using the `proxy_pass` directive a NodeJS application which is running on a high numbered port can be served on the standard HTTP port: `80`. Be aware that using an HTTP proxy in front of an application will give the appearance that all traffic to that application is originating from a single place (because it is: the proxy). HTTP provides special headers such as `X-FORWARDED-FOR` and `X-REAL-IP` to help services which are behind a proxy determine where on the wider internet a request originated.