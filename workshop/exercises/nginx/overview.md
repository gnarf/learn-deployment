# NGINX

In order for your host to respond to incoming HTTP requests from a user's web
browser it needs to be running an HTTP server. There are many available, like
`Apache`, `IIS`, `lighttpd` but this workshop focuses on `NGINX` because its
configuration files are relatively easy to understand.

Like many applications, NGINX looks inside a `conf.d` directory (located in
`/etc/nginx/`) for configuration files. It's a good idea for each service or
site being hosted to have its own descriptively named configuration file so
that it can be safely modified without concern of unintended consequences.

Even though NodeJS can function as an HTTP server, it's generally a better idea
to serve NodeJS applications with NGINX "in front", both for performance and
security reasons.

Besides being a fantastic HTTP server, NGINX is also an HTTP proxy; meaning it
can pass and distribute traffic to other HTTP servers. For example, your NodeJS
application.

## CONFIGURING UPSTREAMS

Within a NGINX configuration, an `upstream` block can be used to organize and
define a server (or group of servers) that should have traffic routed to them.

Here is how we would specify our node application as an "upstream":

```
upstream app {
  server localhost:8000;
}
```

Once we have an internal "upstream" established, we can connect it to the
outside world like so:

```
server {
  listen 80;
  server_name workshop.learn-deployment.com;
  location / {
    proxy_pass http://app;
    include proxy_params;
  }
}
```

## PROXY PASS DIRECTIVE

By using the `proxy_pass` directive, we are telling NGINX to send all HTTP
requests that arrive at our specified server to the NodeJS "upstream" running
on the machine.

## PROXY PARAMS

Be aware that using a HTTP proxy in front of an application will make it seem as
though all traffic hitting the application orginated from the proxy itself.

Because of this, HTTP provides special headers such as `X-FORWARDED-FOR` and
`X-REAL-IP` to inform services which are behind a proxy where on the wider
internet the request originated.

The need to send these headers is so common that NGINX ships with a default
configuration file to handle this. We see it represented in the line:
`include proxy_params;`

## EXERCISE

During the previous exercises, we created a playbook to install a NodeJS app and
associated service. For our final step, configure NGINX to route traffic to it.
You'll know you've succeeded when you can visit your application here:

http://username.learn-deployment.com
