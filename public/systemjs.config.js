(function(global) {
  var paths={
    'npm':'node_modules/'
  }
  // map tells the System loader where to look for things
  var map = {
    'app':        'app', // 'dist',
    '@angular':   'node_modules/@angular',
    'rxjs':       'node_modules/rxjs',
    'angular-in-memory-web-api': 'node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
    'socket.io-client': 'node_modules/socket.io-client',
    '@angular/platform-browser/animations': 'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/animations/browser': 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/flex-layout': 'node_modules/@angular/flex-layout/bundles/flex-layout.umd.js'
    
    
    // '@angular2-material/core':'npm@angular2-material/core/core.umd.js',
    // '@angular2-material/card':'npm@angular2-material/card/card.umd.js',
    // '@angular2-material/icon':'npm@angular2-material/button/button.umd.js',
    // '@angular2-material/button':'npm@angular2-material/icon/icon.umd.js',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                       { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'socket.io-client':    { main: 'socket.io.js'}
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
    'material',
    'animations',
    'cdk'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    paths:paths,
    map: map,
    packages: packages
  };

  System.config(config);

})(this);