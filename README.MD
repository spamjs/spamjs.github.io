/************************
  Installation steps
************************/
1. Clone project from https://bitbucket.org/unicommercetechnology/unicommercechat
2. instal node module : npm install
3. npm update
4. install bower dependencies : bower install
5. grunt bundlify
6. grunt start-cdn-server

/************************
  devlopment steps
************************/

1. For generating sprite image : compass compile
2. For watching all changes from scss to css : compass watch
3. Each time any change in json file : grunt bundlify
4. For starting server : grunt start-cdn-server