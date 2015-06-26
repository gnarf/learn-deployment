# WHAT IS KNOWN_HOSTS AND HOW DOES IT WORK?

So far, we've focused on why a remote machine would trust an incoming connection from the open internet, but we haven't addressed why the machine which originated the request would trust the machine that responds. It might seem this step isn't necessary, as the request was issued directly by a user which should know the IP address or domain name of the machine that it wants to connect to. Unfortunately that's not the case, as poisoned DNS or a man-in-the-middle can be difficult to detect and could cause an unsuspecting user to communicate with a bad actor; leaving unintentional digital footprints that can be used to frame a user or otherwise compromise confidential information.

To control for this, SSH stores the public key of every remote host it has ever made a connection to inside `~/.ssh/known_hosts` so it can verify that the corresponding private key is held by that machine for all future connections using one of the asymmetric scenarios we discussed in the SSH Keys section. Like `authorized_keys` this file contains public keys delimited with the newline character and is maintained distinctly for each user on the machine originating the SSH connection. Unlike `authorized_keys`, each line starts with a machine identifier, either the IP address or fully qualified domain name followed by a space and the public key.

If the remote machine cannot prove it has the correct private key SSH will warn the user that there might be someone eavesdropping and refuse to connect. This process is called host key checking and is the first thing which occurs when an SSH request is made. SSH provides the `StrictHostKeychecking` option for those brave and foolish souls who wish to communicate with anything that picks up the line.

Unfortunately for us, today's tools make it easier than ever to redeploy servers and DNS propagation can happen almost instantly; meaning there are lots of times when a server's keypair has changed legitimately. If SSH warns you that a server's identity cannot be verified ask yourself the following questions:

  - Is this a server I know has been recreated?
  - If connecting via fully qualified domain name does the `dig` command report the IP address I expect this server to have? ([Google provides a web based version of dig](https://toolbox.googleapps.com/apps/dig/) if it's not already installed on your system)
  - Do I trust the network I'm currently connected to?

It's important to note that the server uses the same keypair for all incoming user connections, and restarting a server will not cause the keypair to change; only completely swapping out the underlying machine or reinstalling the operating system will. Remember `vagrant destroy` and `vagrant up` completely destroys the underlying virtual machine and creates a new one.

To remove an outdated record from `known_hosts` the command `ssh-keygen -R DOMAIN_OR_IP` can be used. Alternatively, `known_hosts` can be manually edited and the outdated line removed. If the `known_hosts` file is removed completely it will be recreated and any established trust relationships will be lost.