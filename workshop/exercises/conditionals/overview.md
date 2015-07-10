# HOW TO USE CONDITIONALS

You've seen how Ansible's declarative style implements loops and runs commands,
so it should come as no surprise that conditionals are also possible. The `when`
statement ensures a task only executes *when* the provided conditional evaluates
to true:

```
-
  tasks:
    - debug: var="You will always see me!"
      when: true
```

In more complex Ansible configurations the `when` statement is often used to
augment which tasks will execute based on the environment they are being run in.
For example, it is common to have a vagrant development machine configured in a
a slightly different manner than a production server using the same playbook.

If you find yourself using the same `when` statement for multiple tasks, try
breaking them into a separate task file that is included conditionally:

```
-
  tasks:
    - name: install git
      apt: name=git state=latest update_cache=true

    - include: other.yml
      when: not true
```

## EXERCISE

In later exercises the `when` statement will become much more powerful. For now,
try playing with the mechanics of `when` by joining multiple values with `and`,
`or`, `not` and `()` to conditionally run any task.
