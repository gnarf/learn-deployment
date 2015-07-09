# WHAT IS ANSIBLE

Ansible is an IT automation tool. It can configure systems, deploy software, and
orchestrate advanced IT tasks such as continuous deployments or zero downtime
rolling updates.

Ansible’s main goals are simplicity and ease-of-use. It also has a strong focus
on security and reliability, featuring a minimum of moving parts and usage of
OpenSSH for transport.

Ansible manages machines in an "agentless" manner. This means that Ansible can
orchestrate actions on remote servers without having to first install special
client software on them (e.g. puppet agent).

Ansible configuration is declarative, all tasks are defined using YAML. It ships
with several hundred built-in modules that can be used to perform just about any
infrastructure management task you can imagine in an idempotent fashion.

In the next exercise, we'll start using it on our servers!
