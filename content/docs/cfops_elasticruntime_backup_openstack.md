+++
title = "Elastic Runtime backup on OpenStack"
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

### Backup Elastic Runtime on OpenStack
OpenStack requires the pem files as authentication mechanisms for ssh into virtual machines. The `cfops` tool will extract the pem file from Ops manager when taking backups from CF virtual machines.

1.  Execute `cfops backup` command with the help option
<pre class='terminal'>
ubuntu@ops-manager-1:~$ cfops backup --help
NAME:
   cfops backup - creates a backup archive of the target tile
   USAGE:
    cfops backup [command options] [arguments...]
  DESCRIPTION:
     backup --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanageruser <opsuser> --opsmanagerpass <opspass> -d <dir> --tile elastic-runtime
     OPTIONS:
        --opsmanageruser value, --omu value		username for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_USER]
        --opsmanagerpass value, --omp value		password for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_PASS]
        --tile value, -t value			a tile you would like to run the operation on [$CFOPS_TILE]
        --encryptionkey value, -k value		encryption key to encrypt/decrypt your archive (key lengths supported are 16, 24, 32 for AES-128, AES-192, or AES-256) [$CFOPS_ENCRYPTION_KEY]
        --pluginargs value, -p value			Arguments for plugin to execute [$CFOPS_PLUGIN_ARGS]
        --adminuser value, --du value		username for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_USER]
        --adminpass value, --dp value		password for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_PASS]
        --opsmanagerpassphrase value, --omr value	passphrase is used by Ops Manager 1.7 to decrypt the installation files during restore [$CFOPS_OM_PASSPHRASE]
        --destination value, -d value		path of the Cloud Foundry archive [$CFOPS_DEST_PATH]
        --clear-bosh-manifest value			set this flag if you would like to clear the bosh-deployments.yml (this should only affect a restore of Ops-Manager) [$CFOPS_CLEAR_BOSH_MANIFEST]
        --opsmanagerhost value, --omh value		hostname for Ops Manager [$CFOPS_HOST]
</pre>

2. Backup Elastic Runtime using <code>cfops backup</code>
<pre class='terminal'>
ubuntu@ops-manager-1:~$ cfops backup --opsmanageruser USERNAME --opsmanagerpass Password --opsmanagerhost HostName --adminuser USERNAME --adminpass Password --opsmanagerpassphrase Password --destination <path> --tile elastic-runtime
</pre>

3. Once the backup completes, you should see <code>opsmanager</code> backup directory with following files
<pre class='terminal'>
ubuntu@ops-manager-1:~$ ls
mysql.backup  nfs_server.backup  </pre>
__Note:__  cfops backup command can be run in debug mode by setting LOG_LEVEL=debug
<pre class='terminal'>
ubuntu@ops-manager-1:~$ LOG_LEVEL=debug cfops backup --opsmanageruser USERNAME --opsmanagerpass Password --opsmanagerhost HostName --adminuser USERNAME --adminpass Password --opsmanagerpassphrase Password --destination <path> --tile elastic-runtime
</pre>

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
