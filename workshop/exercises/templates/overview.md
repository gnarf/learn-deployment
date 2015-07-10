# HOW TO USE TEMPLATES

To facilitate file generation Ansible uses the Jinja2 templating engine and provides the `template` module. The template module takes a locally relative `src` and a remote absolute `dest` and idempotently generates files. 

```
  - name: install service
    template: src=relative/path/app.conf dest=/etc/nginx/conf.d/
```

Templates have access to all variables which will be inerpolated if they are wrapped in `{{var_name}}`.

Jinja2 also supports a [broad range of filters](http://jinja.pocoo.org/docs/dev/templates/#filters) which can be used to format, and evaluate variable values. Here's how to use the `default` filter to provide a default value in the case where a variable is undefined: `{{var_name|default('Some Default Value')}}`

# EXERCISE
In this exercise create a playbook that generates an `app.conf` upstart file and reads the full path for nodejs (`/usr/bin/nodejs`) and the full path to the application's js file `/mnt/app.js` from a variable defined in the playbook. You'll need to create a template called `app.conf` in addition to the playbook.