# WHAT IS AN INVENTORY FILE?

An inventory file contains a manifest of all the servers you plan to control
while using Ansible. It might contain one server address, hundreds, or even
thousands. For very complex deployments, it's common for inventory files to
be generated dynamically.

In addition to listing servers, inventory files are a critical organizational
tool for grouping machines. For example, an inventory file might contain many
groups, like application servers, search servers, or database servers. Each
of those in turn could be nested by the region they are located in. Later on,
we'll see how these groups can be used to assign unique variables to specific
sets of machines.

Ansible is capable of executing commands on every server in an inventory file
with a high level of concurrency. In other words, it's possible to orchestrate
entire fleets of servers from a single control machine with a single command.

Each time you run Ansible during this workshop, you will provide an inventory
file using the command line flag `-i`. For the purposes of these exercises,
our inventory will be very simple: a file containing a single domain or IP
address.

## EXERCISE

Let's start by creating our first inventory now. Keeping things simple, name
it `inventory`, and enter an IP address of a server you'd like to control.

Then, try to use it with the playbook from your previous exercise like so:

```
ansible-playbook -i inventory playbook.yml
```
