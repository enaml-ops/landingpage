+++
title = "ER backup on vSphere"
description = "CFOps on vSphere"
date = "2016-02-02"
+++

# CFOPS on vSphere
CFOPS is automation tool to backup and restore Pivotal Cloud Foundry(PCF). Currently CFOPS supports PCF 1.6.
This Guide will describe step by step directions on running cfops backup for Elastic Runtime tile on vSphere

# Step 1 : Download the CFOPS tool from github

1. Sign into github.com using your github credentials

2. Access cfops latest release using following link : https://github.com/pivotalservices/cfops/releases/latest
3. Download and save the cfops binaries - <code>cfops_binaries.tgz</code>

# Step 2 : Backup Elastic Runtime on vSphere


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
    $ ubuntu@ip-10-0-0-154:~/cfops/pipeline/output/builds/linux64$ ./cfops backup --help
NAME:
   cfops backup - creates a backup archive of the target tile
USAGE:
   cfops backup [command options] [arguments...]
DESCRIPTION:
   backup --opsmanagerhost <host> --adminuser <usr> --adminpass <pass> --opsmanageruser <opsuser> --opsmanagerpass <opspass> -d <dir> --tile elastic-runtime
OPTIONS:
   --tile, -t 			a tile you would like to run the operation on [$CFOPS_TILE]
   --opsmanagerhost, --omh 	hostname for Ops Manager [$CFOPS_HOST]
   --adminuser, --du 		username for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_USER]
   --adminpass, --dp 		password for Ops Mgr admin (Ops Manager WebConsole Credentials) [$CFOPS_ADMIN_PASS]
   --opsmanageruser, --omu 	username for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_USER]
   --opsmanagerpass, --omp 	password for Ops Manager VM Access (used for ssh connections) [$CFOPS_OM_PASS]
   --destination, -d 		path of the Cloud Foundry archive [$CFOPS_DEST_PATH]
   --encryptionkey, -k 		encryption key to encrypt/decrypt your archive (key lengths supported are 16, 24, 32 for AES-128, AES-192, or                            AES-256) [$CFOPS_ENCRYPTION_KEY]
   --clear-bosh-manifest 	set this flag if you would like to clear the bosh-deployments.yml (this should only affect a restore of                                   Ops-Manager) [$CFOPS_CLEAR_BOSH_MANIFEST]
   --pluginargs, -p 		Arguments for plugin to execute [$CFOPS_PLUGIN_ARGS]
</pre>

5. Backup Elastic Runtime tile using <code>cfops backup ></code><pre class='terminal'>
    $ ER_VERSION=1.6  ./cfops backup --opsmanagerhost x.x.x.x  --omp xxxx  --du xxx --dp xxxx  --omu ubuntu -d . -t elastic-runtime
       </pre>


6. Once the backup completes, you should see <code>Elasticruntime</code> backup directoy with following files <pre class='terminal'>  ubuntu@pivotal-ops-manager:~/cfops/pipeline/output/builds/linux64$ ls
cfops  mysql.backup  nfs_server.backup

__Note: __  cfops manager backup command can be run with LOG Level DEBUG mode <pre class='terminal'> 
ER_VERSION=1.6 LOG_LEVEL=debu ./cfops backup --opsmanagerhost x.x.x.x  --omp xxxx  --du xxx --dp xxxx  --omu ubuntu -d . -t elastic-runtime
</pre>

 
 
 

     

 


 
   

 
