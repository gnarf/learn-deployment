echo $SSH_AUTH_SOCK
ssh workshop.learn-deployment.com 'echo $SSH_AUTH_SOCK'
ssh -A workshop.learn-deployment.com 'echo $SSH_AUTH_SOCK'
