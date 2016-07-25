+++
title = "ER restore on vSphere"
description = "CFOps on vSphere"
date = "2016-02-01"
+++

# CFOPS on vSphere
CFOPS is automation tool to backup and restore Pivotal Cloud Foundry(PCF). Currently CFOPS supports PCF 1.6.
This Guide will describe step by step directions on running cfops restore for Elastic Runtime tile on vSphere.

# PreRequisite
Prior to restoring the Elastic Runtime make sure OpsManager has been restored and Apply Changes completed successfully.

__Note:__ This is not a migration tool therefore it will only restore PostGres DB to PostGres DB and MySql to MySql.  Tool is not meant to be used to migrate your DB from PostGres to MySql for newer releases of PCF.

# Step 1 : Download the CFOPS tool from github

1. Sign into github.com using your github credentials

2. Access cfops latest release using following link : https://github.com/pivotalservices/cfops/releases/latest
3. Download and save the cfops binaries - <code>cfops_binaries.tgz</code>

# Step 2 : Restore Elastic Runtime on vSphere


CFOps must be installed on your ops manager host as Ops manager host has access to Pivotal Cloud Foundry deployments which includes the elastic runtimes and BOSH.

1. Upload <code>cfops_binaries.tgz</code> to Ops manager host.
2. Uncompress <code>cfops_binaries.tgz</code> into a directory and extract the binary content.<pre class='terminal'>
$ uncompress cfops_binaries.tgz
$tar xvf cfops_binaries.tar
pipeline/output/builds/
pipeline/output/builds/osx/
pipeline/output/builds/osx/cfops
pipeline/output/builds/win64/
pipeline/output/builds/win64/cfops.exe
pipeline/output/builds/linux64/
pipeline/output/builds/linux64/cfops
</pre>

3. Traverse to <code>pipeline/output/builds/</code> directory to find your operating system specific directory : For example : linux64 or win64 for cfops linux executable or cfops.exe for win64.
4. Execute cfops command for verbose help option <pre class='terminal'>
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

5. Restore Elastic Runtime tile using <code>cfops restore ></code><pre class='terminal'>
    $ ER_VERSION=1.6  ./cfops restore --opsmanagerhost x.x.x.x  --omp xxxx  --du xxx --dp xxxx  --omu ubuntu -d . -t elastic-runtime
       </pre>


6. Once the restore completes you can try targeting your CLI or logging into the Apps Manager to verify everything is restored./

__Note:__  cfops manager restore command can be run with LOG Level DEBUG mode <pre class='terminal'> 
ubuntu@pivotal-ops-manager: ER_VERSION=1.6 LOG_LEVEL=debug ./cfops restore --opsmanagerhost xx.xx.xx.xx --omp x --du xxx --dp xxx --omu ubuntu -d . -t elastic-runtime
</pre>

 
 
 

     

 


 
   

 
