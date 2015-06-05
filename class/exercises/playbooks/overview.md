# WHAT ARE PLAYBOOKS?

Playbooks are Ansible's top-level container for grouping tasks. In their most
basic form, they contain a list of operations to be run on a host or group of
hosts. In more complex scenarios they can be used to configure how the "plays"
will be performed (for example, running all tasks as a specific user).  

Playbooks are written in YAML. This is the most basic playbook possible:

`- hosts: all`

You can run this on any server (a "host") by using the `ansible-playbook`
command. Because this playbook has no tasks, the only thing it will do is
connect to the host(s) you specify and exit.

## EXERCISE

Create a simple playbook and run it against a host you have SSH access to
by using this command:  

`ansible-playbook -i IP_OR_DOMAIN, playbook.yml`

__Note__: The trailing comma after the IP or domain name is required for this
style of invocation. Typically, the value of the `-i` flag is a path to an
inventory file (discussed in the next exercise). When you are using `-i` with
a file, no comma is required.
