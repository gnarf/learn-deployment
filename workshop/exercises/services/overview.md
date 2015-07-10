# SERVICES

Say you've written a web application in node and you'd like to make it available
on the internet. So, you copy the application to your server, start it, and walk
away. Success ...right!?

Not quite.

While this approach could work in theory, in practice it is inadvisable for many
reasons. Here are a few:

- If the application crashes for any reason, you'll have to restart it manually.
- If the server is restarted, the application will not start at startup.
- There is no clear way to start, stop, restart, or check the status of the
  application.
- Unless you took care to pipe the output somewhere, there will be no record of
  the application's activity.

Typically speaking, the easiest way to handle all of these concerns is to use
the default "init system" that ships with the OS on the server.

At the time of this writing, this workshop targets Ubuntu 14.04. As a result,
the init system we will be using to create our service will be Upstart. The
code below is a very minimal example of a service script for Upstart.

```
description "daemon for node app"

start on startup
stop on shutdown
respawn

script
  /usr/bin/nodejs /mnt/app
end script
```

If this text was placed in the file `/etc/init.d/app.conf`, it would become a
the "app" service. As you might imagine, this service would automatically start
at startup, stop at shutdown, and respawn if it crashes.

It also becomes possible to control via the `service` command.

For example:
```
sudo service app start
sudo service app stop
sudo service app restart
sudo service app status
```

## LOGGING

Upstart stores log files in `/var/log/upstart/<servicename>.log`. If you have
trouble starting your service, or need to monitor its output while running, try
the command `sudo tailf /var/log/upstart/app.log`.

## EXERCISE

This exercise includes a simple node application which keeps a hit count for
any url visited. It also includes a sample upstart script to keep it running.

Using Ansible, copy both the application and the init script to the remote
server and start the service. The application should be located at /mnt/app.js.

The modules you'll need for your tasks are `copy` and `service`. You'll know you
have succeeded when you can visit http://username.learndeployment.com:8000 and
see the hit counter!
