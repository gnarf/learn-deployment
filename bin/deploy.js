#!/usr/bin/env node

const Learn = require('../learn/index');
const Deployment = new Learn(__dirname+'/../workshop/learn');

Deployment.menu();
