#!/bin/bash
BASE=`dirname $0`
chmod 400 $BASE/../privatekey.pem
ssh -i $BASE/../privatekey.pem ubuntu@workshop.learn-deployment.com
