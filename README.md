# DONE #
* REST listener
* REST project organized
* Deploy db on RDS
* Deploy EC2 server

#Mu.city#

### folder structure ###
* react // react core files
    * common // shared elements like selects, buttons, modals
    * components // nested by dom level
    * js // scripts to be referenced directly by components
    * landing // separate for landing page components
* rest // backend core files
    * core // base logic files
    * data // Data access files, by entity. Accessible by services only
    * services // api
* scripts // build scripts, test scripts, dev scripts

### TODO ###
* install NGINX
* install TLS
* configure PM2
* setup front end proxy to backend
* update daos to use crud based functions create remove update delete
* look at sing assets for main project (remove from public)
* connect service layer
* tedious switch to connection pooling
* add session jwt cookie
* switch patter to (err,res)
* add error logging
* add server logging

### POSTPONED ###
* integration with facebook auth
* db transactions
* switch to 3 branch GIT

