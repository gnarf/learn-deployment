# Instructor Notes

## ssh-keys

At least one day prior to the class, students must provide their public key and
the username of their machine. The instructor should prepare a playbook to grant
everyone access to the machine, but it should NOT be run before this exercise
begins.

The class opens by having everyone log into `learn-deployment.bocoup.com` using
the provided private key and the username `ubuntu`. This illustrates the usage
of the command line flag `-i`, and how to specify a username by prefixing the
desired host with `user@` or using the command line flag `-l`.

Once all students have successfully connected as the user `ubuntu`, the class
should log off and try to connect as themselves. This will fail. Then, the
instructor will tell the class to wait a moment as they run a playbook to give
everyone access.

A few seconds later, everyone in the room has access to the machine. Cool! Once
everyone is logged in, move to the next exercise.

## authorized-keys

Students have completed the `ssh-keys` exercise and are now connected to
`learn-deployment.bocoup.com` under their own user. Because each student
provided their public key before the class, the instructor can now point
out that it is listed in `~/.ssh/authorized_keys`.

Students are encouraged to edit this file, log off, and try to log in again.
Once everyone is satisfied they understand how this works, the instructor can
run their setup playbook again, renewing access for everyone.

## known-hosts

Students have completed the `authorized-keys` exercise. Everyone should be able
to ssh to `learn-deployment.bocoup.com` before this exercise begins.

To illustrate what it could look like when a MiTM attack happens, the instructor
will switch EC2 instances for `learn-deployment.bocoup.com`. Students will then
be instructed to ssh to the server. This will trigger a SSH warning and the
instructor will explain how to fix this using ssh-keygen.

## key-permissions

Students

## ssh-agent

Students now understand how to SSH by providing a private key.

## permissions-elevation



## your-server

Students will each be given a username.bocoup.com domain that points to a server
of their own. They will then be instructed to connect using the provided private
key and to create a user for themselves that supports public key authentication.

If this goes quickly, students will be encouraged to make users for other users
in the class.

Finally, the existence of http://github.com/username.keys will be pointed out as
a matter of convenience.

## ansible

Students now have a basic understanding of SSH and public key authentication.
They also have a server with "mystery meat" configuration. Who knows how it got
into the state it is in now? How do we manage it?

We now explain at a high level how Ansible works, taking care to point out that
it communicates over SSH, which means that all of the troubleshooting steps one
might use for SSH can also be used for Ansible.

We now explain at a high level how Ansible works:

* What is Ansible
* Why is it different than Chef/Puppet (agentless, ssh only requirement, etc)
* YAML configuration
* Idempotentcy

## playbooks

## inventory-files

## tasks

Students now have an inventory file and playbook with a single task. We now
explore adding a task to install nginx, confirming that it works by hitting
the machine in a web browser.

We also experiment with the concept of idempotency by running the same tasks
repeatedly. Students should ssh into their machines and remove nginx before
re-running to see that things work.

At the end of this exercise, we should be installing three packages:
  - nginx
  - git
  - node

## loops

Students now have a playbook which installs multiple packages using apt. We
now explore the usage of `with_items` to simplify this repetitive work. Be
sure to mention `with_dict`, `with_fileglob`, `with_subelements`, etc.

## services

Students now understand how to install nginx, and we can see that it is running
on the machine. How is that? Services. Let's make our own application that we
want to have running all the time.

## templates

Problem: Need to figure out the full path to nodejs binary for the next
exercise. Solution: Register a variable based on the return of `command: which node`
Verification: Can debug variable

## templates




## variables

Students now have a playbook which installs multiple packages using `with_items`
One of those

## conditionals

## registering-variables

## copying-files

## services

## nginx
