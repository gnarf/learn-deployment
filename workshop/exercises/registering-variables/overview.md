# HOW DO YOU REGISTER VARIABLES?

It might not seem like it, but almost all Ansible tasks have output. That output
can be stored and referenced in templates, conditionals, and task definitions.
In Ansible, variables are `registered` rather than assigned.

Adding the `register` keyword followed by a variable name to any task stores the
returned data in that variable.

```
- shell: cat /etc/hosts
  register: hosts_contents

- debug var=hosts_contents

- shell: echo "/etc/hosts contains an entry for google"
  when: hosts_contents.stdout.find('google') != -1
```

Note that the output of the command is **not** the only thing registered when
creating a variable. In addition to capturing stdout, you can also access the
return code, stderr, the start and end time and more.

# EXERCISE

In this exercise we want to tell `upstart` exactly where to find the `node`
binary that it should use to run our `app.js` file. To accomplish this, register
a variable called `node_path` that contains the output of the command
`which nodejs`.

Then, use the `stdout` property of that variable in the `upstart` script
responsible for launching the application.
