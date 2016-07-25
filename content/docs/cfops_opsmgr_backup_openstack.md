+++
title = "Ops Manager backup on OpenStack"
description = "CFOps on OpenStack"
date = "2016-07-13"
+++

# CFOPS on OpenStack
CFOps is an automation tool to backup and restore Pivotal Cloud Foundry (PCF). Currently CFOPS supports PCF 1.4 and above.
This guide describes step by step directions on running cfops backup tool on OpenStack.

## Getting started
CFOps can be installed on your Ops Manager host or a jump host that has access to Ops Manager and PCF deployments.

### Download the CFOPS binary

Get the latest release for your OS from the <a class="page-scroll" href="./downloads/release">Downloads</a> page.

### Backup Ops Manager on OpenStack
OpenStack requires the pem files as authentication mechanisms for ssh into virtual machines. The `cfops` tool will extract the pem file from Ops manager when taking backups from CF virtual machines.

Execute `cfops backup` command with the help option

```bash
ubuntu@ops-manager-1:~$ cfops backup --help
NAME:
   cfops backup - creates a backup archive of the target tile

USAGE:
   cfops backup [command options] [arguments...]

DESCRIPTION:
   backup --opsmanageruser <opsusr> --opsmanagerpass <opspass> --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanagerpassphrase <passphrase> --destination . --tile elastic-runtime

OPTIONS:
   --destination value, -d value		path of the Cloud Foundry archive [$CFOPS_DEST_PATH]
   --tile value, -t value			a tile you would like to run the operation on [$CFOPS_TILE]
   --pluginargs value, -p value			Arguments for plugin to execute [$CFOPS_PLUGIN_ARGS]
   --opsmanagerhost value, --omh value		hostname for Ops Manager [$CFOPS_HOST]
   --adminuser value, --du value		username for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_USER]
   --opsmanagerpass value, --omp value		password for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_PASS]
   --opsmanagerpassphrase value, --omr value	passphrase is used by Ops Manager 1.7 to decrypt the installation files during restore [$CFOPS_OM_PASSPHRASE]
   --adminpass value, --dp value		password for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_PASS]
   --opsmanageruser value, --omu value		username for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_USER]
   --encryptionkey value, -k value		encryption key to encrypt/decrypt your archive (key lengths supported are 16, 24, 32 for AES-128, AES-192, or AES-256) [$CFOPS_ENCRYPTION_KEY]
   --clear-bosh-manifest value			set this flag to clear the bosh-deployments.yml (this should only affect a restore of Ops-Manager) [$CFOPS_CLEAR_BOSH_MANIFEST]
```

Backup Ops Manager using <code>cfops backup</code>
```bash
ubuntu@ops-manager-1:~$ cfops backup --opsmanageruser <opsusr> --opsmanagerpass <opspass> --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanagerpassphrase <passphrase> --destination <path> --tile ops-manager
```

Once the backup completes, you should see <code>opsmanager</code> backup directory with following files
```bash
ubuntu@ops-manager-1:~$ cd opsmanager/
ubuntu@ops-manager-1:~/opsmanager$ ls
deployments.tar.gz  installation.json  installation.zip
```
__Note:__  cfops backup command can be run in debug mode by setting LOG_LEVEL=debug
```bash
ubuntu@ops-manager-1:~$ LOG_LEVEL=debug cfops backup--opsmanageruser <opsusr> --opsmanagerpass <opspass> --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanagerpassphrase <passphrase> --destination <path> --tile ops-manager
```

### Using S3

You can use an s3 compatible blobstore for backups if you prefer. You must set the following environment variables:
```bash
export S3_ACCESS_KEY_ID="AKY83B2PMWVVY6EF89"
export S3_SECRET_ACCESS_KEY="PO+DKjfdakDKFDJ/gVDJDIEDKJFE3ZHdL"
export S3_BUCKET_NAME=pcfbackup
export S3_ACTIVE=true
export S3_DOMAIN=<some_compatible_s3_store_url>
```
where `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` are your own AWS credentials and `S3_BUCKET_NAME` is the name of the bucket where you want the backup files stored. `S3_DOMAIN` is optional
To disable S3 backups, all you need to do is set `S3_ACTIVE=false`
