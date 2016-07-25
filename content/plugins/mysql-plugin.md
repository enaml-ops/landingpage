+++
title = "Downloads"
description = "MySql Plugin downloads"
date = "2016-01-14"
bucket = "mysql-plugin-release"
file = "cfops-mysql-plugin"
+++

# Setup
Install following steps on plugin [documentation page] (docs/cfops_plugin/)

Validate installed correctly by executing <pre class="terminal">
./cfops list-tiles
</pre>
Should output mysql-tile as one of tiles

# Backup

To run a backup execute the following command <pre class="terminal">
./cfops backup --opsmanagerhost x.x.x.x --omp xxx  --du xxx --dp xxx --omu ubuntu -d . -t mysql-tile
</pre>
This will output a dmp file in the target directory

# Restore
To run a restore execute the following command <pre class="terminal">
./cfops restore --opsmanagerhost x.x.x.x --omp xxx  --du xxx --dp xxx --omu ubuntu -d . -t mysql-tile
</pre>
This will take the mysql dump in the target directory and restore

# MySql Plugin Downloads

Below are the available downloads for the latest version of mysql plugin for cfops. Please
download the proper package for your operating system. You can also download
older versions of mysql from the
[GitHub releases page](https://github.com/pivotalservices/cfops-mysql-plugin/releases).
