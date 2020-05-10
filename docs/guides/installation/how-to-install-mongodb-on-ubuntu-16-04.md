---
last_modified_on: "2020-03-27"
$schema: "/.meta/.schemas/guides.json"
title: How to Install MongoDB on Ubuntu 16.04
description: In this tutorial you’ll install MongoDB, manage its service, and optionally enable remote access.
author_github: https://github.com/dalexhd
tags: ["type: guide", "service: MongoDB", "platform: Ubuntu 16.04"]
---

import Alert from '@site/src/components/Alert';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Assumptions from '@site/src/components/Assumptions';

<Assumptions name="guide">

* You understand what [SteamSpeak][docs.about.concepts] does and also understand how linux environment works.

</Assumptions>


## Introduction

MongoDB is a free and open-source NoSQL document database used commonly in modern web applications. This tutorial will help you set up MongoDB on your server for a production application environment.

## Step 1 — Adding the MongoDB Repository

MongoDB is already included in Ubuntu package repositories, but the official MongoDB repository provides most up-to-date version and is the recommended way of installing the software. In this step, we will add this official repository to our server.

Ubuntu ensures the authenticity of software packages by verifying that they are signed with GPG keys, so we first have to import they key for the official MongoDB repository.

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

After successfully importing the key, you will see:

Output

    gpg: Total number processed: 1
    gpg: imported: 1 (RSA: 1)

Next, we have to add the MongoDB repository details so `apt` will know where to download the packages from.

Issue the following command to create a list file for MongoDB.

    echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

After adding the repository details, we need to update the packages list.

    sudo apt-get update

## Step 2 — Installing and Verifying MongoDB

Now we can install the MongoDB package itself.

    sudo apt-get install -y mongodb-org

This command will install several packages containing latest stable version of MongoDB along with helpful management tools for the MongoDB server.

Next, start MongoDB with `systemctl`.

    sudo systemctl start mongod

You can also use `systemctl` to check that the service has started properly.

    sudo systemctl status mongod

Output

    ● mongodb.service - High-performance, schema-free document-oriented database
       Loaded: loaded (/etc/systemd/system/mongodb.service; enabled; vendor preset: enabled)
       Active: active (running) since Mon 2016-04-25 14:57:20 EDT; 1min 30s ago
     Main PID: 4093 (mongod)
        Tasks: 16 (limit: 512)
       Memory: 47.1M
          CPU: 1.224s
       CGroup: /system.slice/mongodb.service
               └─4093 /usr/bin/mongod --quiet --config /etc/mongod.conf

The last step is to enable automatically starting MongoDB when the system starts.

    sudo systemctl enable mongod

The MongoDB server is now configured and running, and you can manage the MongoDB service using the `systemctl` command (e.g. `sudo systemctl stop mongod`, `sudo systemctl start mongod`).

## Step 3 — Adjusting the Firewall (Optional)


If you intend to use the MongoDB server only locally with applications running on the same server, it is a recommended and secure setting. However, if you would like to be able to connect to your MongoDB server from the internet, we have to allow the incoming connections in `ufw`.

To allow access to MongoDB on its default port `27017` from everywhere, you could use `sudo ufw allow 27017`. However, enabling internet access to MongoDB server on a default installation gives unrestricted access to the whole database server.

in most cases, MongoDB should be accessed only from certain trusted locations, such as another server hosting an application. To accomplish this task, you can allow access on MongoDB’s default port while specifying the IP address of another server that will be explicitly allowed to connect.

    sudo ufw allow from your_other_server_ip/32 to any port 27017

You can verify the change in firewall settings with `ufw`.

    sudo ufw status

You should see traffic to `27017` port allowed in the output.If you have decided to allow only a certain IP address to connect to MongoDB server, the IP address of the allowed location will be listed instead of _Anywhere_ in the output.

Output

    Status: active

    To Action From
    -- ------ ----
    27017 ALLOW Anywhere
    OpenSSH ALLOW Anywhere
    27017 (v6) ALLOW Anywhere (v6)
    OpenSSH (v6) ALLOW Anywhere (v6)

[docs.about.concepts]: /SteamSpeak/docs/about/what-is-steamspeak/
