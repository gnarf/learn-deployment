# ROLES

If you've made it this far, congratulations, you now have Ansible basics down!
The rest of this workshop focuses on best practices around organizing code as
your deployment configuration grows.

Thus far, we've defined tasks directly in our playbooks. While this approach
can work nicely for very simple deployments, it's usually desirable to group
tasks into a higher level construct: roles.

As we move into the realm of modularizing our deployment configuration, it's
important to understand the conventions Ansible uses to connect all the pieces.

Setting up roles is easy (if a little verbose). All you need is a `roles` folder
sibling to your playbook. Inside the `roles` folder, make another folder. The
name of this folder is the name of your new role. Inside **that** folder, make
one more folder, called `tasks`. Finally, make a file called `main.yml` inside
the tasks folder. This is the default location Ansible will look for tasks in
a given role.

Here is the same configuration from the last exercise, organized with roles:

```
├── app.js
├── playbook.yml
└── roles
    ├── base
    │   └── tasks
    │       └── main.yml
    ├── configure
    │   ├── tasks
    │   │   └── main.yml
    │   └── templates
    │       ├── app.conf
    │       └── learndeployment.conf
    └── deploy
        └── tasks
            └── main.yml
```

...and the associated playbook:

```
-
  hosts: all
  sudo: true
  vars:
    apt_packages:
      - git
      - nodejs
      - nginx
    app_path: /mnt/app
    fqdn: workshop.learndeployment.com
    port: 8000
  roles:
    - base
    - configure
    - deploy
```

Generally speaking, roles are analogous to "modules" in programming. Configured
properly, they can be building blocks you share between multiple projects. For
example, the base role in this configuration

## EXERCISE

Re-organize your playbook from the previous exercise into three roles:

- base: install all system requirements (software packages)
- configure: configure nginx and upstart
- deploy: get code on the production server and start or restart the service.
