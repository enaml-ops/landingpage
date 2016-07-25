+++
title = "Ops Manager restore on AWS"
description = "CFOps on AWS"
date = "2016-02-02"
+++

# CFOPS on AWS
CFOps is an automation tool to backup and restore Pivotal Cloud Foundry (PCF). Currently CFOPS supports PCF 1.4 and above.
This guide describes step by step directions on running cfops restore tool on AWS.

## Getting started
CFOps can be installed on your Ops Manager host or a jump host that has access to Ops Manager and PCF deployments.

### Download the CFOPS binary

1. Get the latest release for your OS from the <a class="page-scroll" href="./downloads/release">Downloads</a> page.

### Restore Ops Manager on AWS

1. Execute `cfops restore` command with the help option
```bash
ubuntu@pivotal-ops-manager: ./cfops restore --help
NAME:
   cfops restore - restores from an archive to the target tile
USAGE:
   cfops restore [command options] [arguments...]
DESCRIPTION:
   restore --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanageruser <opsuser> --opsmanagerpass <opspass> -d <dir> --tile elastic-runtime
OPTIONS:
   --destination, -d 		path of the Cloud Foundry archive [$CFOPS_DEST_PATH]
   --tile, -t 				a tile you would like to run the operation on [$CFOPS_TILE]
   --opsmanagerhost, --omh 	hostname for Ops Manager [$CFOPS_HOST]
   --adminuser, --du 		username for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_USER]
   --adminpass, --dp 		password for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_PASS]
   --opsmanageruser, --omu 	username for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_USER]
   --opsmanagerpass, --omp 	password for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_PASS]
   --encryptionkey, -k 		encryption key to encrypt/decrypt your archive (key lengths supported are 16, 24, 32 for AES-128, AES-192, or                            AES-256) [$CFOPS_ENCRYPTION_KEY]
   --clear-bosh-manifest 	set this flag if you would like to clear the bosh-deployments.yml (this should only affect a restore of                                   Ops-Manager) [$CFOPS_CLEAR_BOSH_MANIFEST]
   --pluginargs, -p 		Arguments for plugin to execute [$CFOPS_PLUGIN_ARGS]
```

2. Restore Ops Manager using <code>cfops restore</code><pre class='terminal'>
    $ ./cfops restore --opsmanagerhost x.x.x.x --du xxx --dp xxx --omu ubuntu -d . -t ops-manager
	__Note:__ OpsManager VM password is not required because it uses the pem file from installation_settings file
</pre>

3. Once the restore completes, you can verify it by logging into the OpsManager

__Note:__  cfops restore command can be run in debug mode by setting LOG_LEVEL=debug <pre class='terminal'>
ubuntu@pivotal-ops-manager: LOG_LEVEL=debug ./cfops restore --opsmanagerhost xx.xx.xx.xx --du xxx --dp xxx --omu ubuntu -d . -t ops-manager
</pre>

### Using S3

You can use an s3 compatible blobstore to restore from if you prefer. You must set the following environment variables:
```bash
export S3_ACCESS_KEY_ID="AKY83B2PMWVVY6EF89"
export S3_SECRET_ACCESS_KEY="PO+DKjfdakDKFDJ/gVDJDIEDKJFE3ZHdL"
export S3_BUCKET_NAME=pcfbackup
export S3_ACTIVE=true
```
where `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY` are your own AWS credentials and `S3_BUCKET_NAME` is the name of the bucket where the restore files are stored.

To disable S3 restore, all you need to do is set `S3_ACTIVE=false`
