#!/bin/bash

bundle exec unicorn -p 8080 -c ./config/unicorn.rb

#bundle exec rake jobs:work
