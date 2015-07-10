# HOW TO USE CONDITIONALS

You've seen how Ansible's declarative style implements loops and runs commands so it should come as no surprise that conditionals are also possible. The `when` statement ensures a task only executes *when* the provided conditional evaluates to true.

When we get into registering variables the `when` statement should seem a little more applicable. For this exercise try playing with the mechanics of `when` by joining multiple values with `and`, `or`, and `()`. If the `when` statement starts to seem to be overused in  a playbook with several tasks all relying on a single conditional check, consider breaking them out into a separate task file that is included conditionally.