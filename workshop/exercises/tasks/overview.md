# WHAT ARE TASKS?

Tasks are the most basic unit of work in your deployment configuration. Like
playbooks, tasks are specified using YAML. Each task is backed by an Ansible
module which provides the relevant functionality.

By default, Ansible runs tasks in a synchronous/blocking fashion. While it is
possible to execute tasks asynchronously, that use-case will not be covered in
this workshop.

Tasks are almost always defined by specifying a module name followed by a
list of key=value pairs to configure how it should run.

The example below shows a task listing that displays the hostname of the
machine the task is being run on, and then installs the latest version of
git using the apt package manager.

```
tasks
  - debug: var=ansible_distribution
  - apt: name=git state=latest update_cache=true
```

Help files are available for all modules via the `ansible-doc` command. To see
what the `update_cache` option does for the `apt` module, run `ansible-doc apt`.

Documentation for all modules is also available on the web at:
http://docs.ansible.com.

## NAMING TASKS

While the example above is fully functional, it would behoove you to take the
time to name your tasks so they are more easily understood, both for others
and yourself in the future. This can be done like so:

```
tasks:
  - name: show the distribution
    debug: var=ansible_distribution
  - name: install git
    apt: name=git state=latest update_cache=true
```

## IDEMPOTENCY

Most Ansible tasks are idempotent by default. This means that you can run the
same task repeatedly and your server will remain in the same state. This feature
may not seem compelling when considering something as simple as installing a
piece of software, but it quickly becomes critical as your tasks get more
complex.

For example, imagine running a task to add a line to a configuration file. Even
if you run that task twenty times, you only want the line added once (like most
things, Ansible has a module for that, it's called `lineinfile`).

## USING SUDO

If you run a task that requires administrative privileges, you'll need to
"elevate" it with the `sudo` keyword, e.g:

```
tasks:
  - name: install git
    apt: name=git state=latest update_cache=true
    sudo: true
```

You can also elevate an entire playbook with `sudo: true` at the top level.

## EXERCISE

Try creating a playbook that installs the apt packages `git`, `nodejs` and
`nginx`. Try running this playbook with and without names for the tasks to
see how the output changes.

Between each run pay close attention the output to see that (when possible)
Ansible will run idempotently.

Finally, try SSHing into your machine and running `sudo apt-get remove git`
to change the state of the server. Log off and run your playbook again. Note
how Ansible restores the machine to the correct state. Ansible leaves no
configuration on the machines it controls. Instead, it dynamically introspects
the state of the machine on a per-task basis as needed.
