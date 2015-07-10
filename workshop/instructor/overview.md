# Instructor Notes

At least one day prior to the workshop, attendees must provide the public half
of their public/private keypair, and the username of their machine. This public
key should also be registered with github.

If attendees do not have a public/private keypair, they can follow this guide
to create one:
https://help.github.com/articles/generating-ssh-keys/

The instructor should prepare the ansible configuration in this folder to grant
all attendees access to `workshop.learndeployment.com`. This should **NOT** be
run before the first exercise begins.

The workshop opens by having everyone `npm install -g tkellen/learn-deployment`.
The instructor's terminal should be visible to the workshop as he or she demos
how to use the tool. Each time an exercise is selected, some files will be
copied to the current directory under a folder matching the exercise name.

Each exercise contains a detailed exploration of the concept being introduced,
as well as sample configuration files and solutions where applicable.

The instructor will begin each section by using the overview file as a guide to
explain the new concept. After fielding any questions, attendees will then run
`learn-deployment` on their own machine to begin development.

## asymmetric-cryptography

The instructor will explain asymmetric cryptography.

## ssh-basics

The exercise folder contains a private key which can be used to connect to
an EC2 instance accessible at `workshop.learndeployment.com` with the
username `ubuntu`. Notably, the key has the wrong permissions. Attendees must
first correct this before they can connect (chmod 400, owner read only).

Once all attendees have successfully connected, everyone should log off and
try to connect as themselves. This will fail.

Then, the instructor will tell the attendees to wait a moment as they run a
playbook to give everyone access. 

```
ansible-playbook --private-key=../../exercises/ssh-basics/privatekey.pem -u ubuntu -i inventory/studentservers users.yml
```

A few seconds later, everyone in the room has
access to the machine. Cool! Once everyone is logged in, move to the next
exercise.

## authorized-keys

Attendees should be connected to `workshop.learndeployment.com` as their own
user.

Because each attendee provided their public key before the workshop, the
instructor can now point out that it is listed in `~/.ssh/authorized_keys`.

Attendees are encouraged to edit this file, log off, and try to log in again.
Once everyone is satisfied they understand how this works, the instructor can
run their setup playbook again, renewing access for everyone.

## known-hosts

Everyone should be able to SSH to `workshop.learndeployment.com` as their own
user before this exercise begins.

To illustrate what a MiTM attack might look like, the instructor will switch EC2
instances for `workshop.learndeployment.com`. Attendees will then SSH to the
server. This will trigger a warning.

The instructor will then explain how to fix this problem using `ssh-keygen`,
with an emphasis that the veracity of the server should be verified before this
is done.

## ssh-key-passphrases

Attendees will now learn about passphrases, how to add them to their keys if
they don't have them, and how they are a type of two factor authentication.
This will lead into dealing with ssh-agent.

## ssh-agent

Attendees now understand the basic usage of private keys. We'll now make
managing them easier to deal with by adding to/listing the keys in our agent.

We can check if ssh-agent is running by echoing the environment variable
$SSH_AUTH_SOCK.

Attendees can then check to see if forwarding works by ssh-ing to
`workshop.learndeployment.com` and running `ssh git@github.com`. If agent
forwarding is functioning they should see "Hi <username>! ....".

The `-A` flag must be specified with SSH to enable this. We should also cover
how to configure `~/.ssh/config` to enable this for specific domains/machines
etc.

## permissions-elevation

Attendees will learn how to use sudo and su, the difference between them, and
how to manage sudoers.

## your-server

Attendees will each be given a `username.learndeployment.com` domain that
points to a server of their own. They will then be instructed to connect using
the provided private key, and to create a user for themselves that supports
public key auth.

If this goes quickly, attendees will be encouraged to make accounts for other
users in the workshop.

Finally, the existence of http://github.com/username.keys will be pointed out as
a matter of convenience.

## ansible

Attendees now have a basic understanding of SSH, public key authentication and
permissions elevation. They also have a server with "mystery meat" config. Who
knows how it got into the state it is in now? What happens in the event of a
hardware failure? A co-worker leaving?

We now explain at a high level how Ansible works, taking care to point out that
it communicates over SSH, which means that all of the troubleshooting steps we
might use for SSH can also be used for Ansible.

* What is Ansible
* Why is it different than Chef/Puppet (agentless, SSH only requirement, etc)
* YAML configuration
* Idempotentcy

## playbooks

Attendees will compose a basic playbook and run it on their own server using
the `ansible-playbook` command. It will do nothing but connect to the machine.

## inventory-files

Attendees will compose a basic inventory file and use it in conjunction with
`ansible-playbook` and a basic playbook which still does nothing but connect
to the machine and exit.

## tasks

Attendees now have an inventory file and playbook with no tasks. We now explore
adding a task to install git using the apt module, confirming that it works by
using the git command on the target server. We must now introduce the `sudo`
option in playbooks/tasks and discuss how sudoers affects this.

We also experiment with the concept of idempotency by running the same tasks
repeatedly. Attendees should SSH into their machines to remove git before
re-running to see how the output changes.

At the end of this exercise, we should be installing three packages:
  - git
  - nodejs
  - nginx

## loops

Attendees now have a playbook which installs multiple packages using apt. We
now explore the usage of `with_items` to simplify this repetitive work. Be
sure to mention `with_dict`, `with_fileglob`, `with_subelements`, etc.

Once students have their apt installation down to a single task, the concept
of playbook `vars` should be introduced to further abstract this, and to show
the first stages of centralized configuration.

## conditionals

Attendees will assign a variable to conditionally control the installation of
the packages from the previous exerise. They will also learn how to include
an external set of tasks based on a conditional (used to reduce repetitive
checking of the same variable across multiple tasks).

## services

TODO: systemd vs upstart?

Attendees now understand how to install nginx, but it isn't running because we
can't visit our machine in a browser. How do we get it started? By using the
service included with the package.

During this exercise, students should both manually start and stop the nginx
service, as well as doing so with the service module in their playbooks.
The success of this task can be measured by hitting the user's server in a
browser.

Next up, we demo a very simple node application and explain how to copy the
provided upstart script to the server and kick it off. Attendees can verify
success by hitting their server on port 8000.

The default logging location of the application should be noted during this
exercise as well (`/var/log/upstart/app.log`). For bonus points, show how to
use `tail -f`.

## templates

Next up, we discuss how the existing upstart script features a lot of hardcoded
values that we might want to generalize to variables. In this exercise, students
add more configuration: for the path to nodejs, the path to their application,
etc. It should be noted that the templating engine Ansible uses is Jinja2, and
that many filters are available (outside the scope of this workshop).

## registering variables

Next up, we discuss how sometimes it is desirable to assign variables based on
the state of a target machine. In this exercise, we use `which` to register the
path to nodejs and use it in our upstart template.

## nginx

More to write, but.... hook nginx and service together. Fin.
