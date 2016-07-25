+++
title = "Ops Manager backup on vSphere"
description = "CFOps on vSphere"
date = "2016-01-19"
+++

# CFOPS on vSphere
CFOps is an automation tool to backup and restore Pivotal Cloud Foundry (PCF). Currently CFOPS supports PCF 1.4 and above.
This guide describes step by step directions on running cfops backup tool on vSphere.

## Getting started
CFOps can be installed on your Ops Manager host or a jump host that has access to Ops Manager and PCF deployments.

### Download the CFOPS binary

1. Get the latest release for your OS from the <a class="page-scroll" href="./downloads/release">Downloads</a> page.

### Backup Ops Manager on vSphere

1. Execute `cfops backup` command with the help option
```bash
$ ubuntu@ip-10-0-0-154:~$ ./cfops backup --help
NAME:
   cfops backup - creates a backup archive of the target tile
USAGE:
   cfops backup [command options] [arguments...]
DESCRIPTION:
   backup --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanageruser <opsuser> --opsmanagerpass <opspass> -d <dir> --tile elastic-runtime
OPTIONS:
   --tile, -t 			a tile you would like to run the operation on [$CFOPS_TILE]
   --opsmanagerhost, --omh 	hostname for Ops Manager [$CFOPS_HOST]
   --adminuser, --du 		   username for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_USER]
   --adminpass, --dp 		   password for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_PASS]
   --opsmanageruser, --omu 	username for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_USER]
   --opsmanagerpass, --omp 	password for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_PASS]
   --destination, -d 		path of the Cloud Foundry archive [$CFOPS_DEST_PATH]
   --encryptionkey, -k 		encryption key to encrypt/decrypt your archive (key lengths supported are 16, 24, 32 for AES-128, AES-192, or                            AES-256) [$CFOPS_ENCRYPTION_KEY]
   --clear-bosh-manifest 	set this flag if you would like to clear the bosh-deployments.yml (this should only affect a restore of                                   Ops-Manager) [$CFOPS_CLEAR_BOSH_MANIFEST]
   --pluginargs, -p 		   Arguments for plugin to execute [$CFOPS_PLUGIN_ARGS]
```

2. Backup Ops Manager using <code>cfops backup</code><pre class='terminal'>
    $ ./cfops backup --opsmanagerhost x.x.x.x --omp xxx  --du xxx --dp xxx --omu ubuntu -d . -t ops-manager
</pre>

3. Once the backup completes, you should see <code>opsmanager</code> backup directory with following files <pre class='terminal'>
ubuntu@ip-10-0-0-154:~$ ls -l
total 11068
-rwxr-xr-x 1 ubuntu ubuntu 11327680 Jan 18 15:11 cfops
drwxrwxr-x 2 ubuntu ubuntu     4096 Jan 18 19:38 opsmanager
ubuntu@ip-10-0-0-154:~$
ubuntu@ip-10-0-0-154:~$ cd opsmanager/
ubuntu@ip-10-0-0-154:~/opsmanager$ ls
deployments.tar.gz  installation.json  installation.zip
</pre>
__Note:__  cfops backup command can be run in debug mode by setting LOG_LEVEL=debug <pre class='terminal'>
ubuntu@ip-10-0-0-154:~$ LOG_LEVEL=debug ./cfops backup --opsmanagerhost xx.xx.xx.xx --omp x --du xxx --dp xxx --omu ubuntu -d . -t ops-manager
</pre>

### Using S3

You can use an s3 compatible blobstore for backups if you prefer. You must set the following environment variables:
```bash
export S3_ACCESS_KEY_ID="AKY83B2PMWVVY6EF89"
export S3_SECRET_ACCESS_KEY="PO+DKjfdakDKFDJ/gVDJDIEDKJFE3ZHdL"
export S3_BUCKET_NAME=pcfbackup
export S3_ACTIVE=true
```
where `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` are your own AWS credentials and `S3_BUCKET_NAME` is the name of the bucket where you want the backup files stored.

To disable S3 backups, all you need to do is set `S3_ACTIVE=false`
