#!/usr/bin/env node

const Learn = require('../learn/index');
const Deployment = new Learn(__dirname+'/../class/learn');

Deployment.menu();
