# LOOPING IN ANSIBLE

In the previous exercise, it's likely your task configuration was pretty
repetitive. Perhaps it looked something like this:

```
tasks:
  - name: install git
    apt: name=git state=latest update_cache=yes

  - name: install nodejs
    apt: name=nodejs state=latest update_cache=yes

  - name: install nginx
    apt: name=nginx state=latest update_cache=yes
```

If you thought while writing, geez, there must be a better way, you were right!
Ansible has rich capabilities for looping which can be used to reduce this kind
of thing to a single task. The most basic form is looping over a list using the
`with_items` keyword. It looks like this:

```
tasks:
  - name: debug some things
    debug: var={{item}}
    with_items:
      - hello
      - there
      - ansible
      - user
```

## EXERCISE

Try to simplify your configuration from the previous exercise to a single
task entry using `with_items`.

Documentation for more complex looping constructs can be found here:

https://docs.ansible.com/playbooks_loops.html
