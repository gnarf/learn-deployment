# WHAT ARE TASKS?

Tasks are the most basic unit of work in your deployment configuration. Like
playbooks, tasks are specified using YAML. Each task is backed by an Ansible
module which provides the relevant functionality.

By default, Ansible runs tasks in a synchronous/blocking fashion. While it is
possible to execute tasks asynchronously, that use-case will not be covered in
this class.

Tasks are almost always defined by specifying a module name followed by a
list of key=value pairs to configure how it should run.

The example below shows a task listing that displays the hostname of the
machine the task is being run on, and then installs the latest version of
git using the apt package manager.

```
tasks
  - name: show the hostname
    debug: var=ansible_hostname

  - apt: name=git state=latest
```

In the previous exercise, we used the `debug` module in a task to output the
value of a variable to the screen. You can read documentation about the debug
module (or any other module) by running `ansible-doc debug`, or searching
for "debug" at http://docs.ansible.com.

Here is an example of using the `apt` module to install git:
