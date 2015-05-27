var request = require('request-promise');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var hosts = {
  unrest:        Infinity,
  herokupad:     Infinity,
  awatemonosan:  Infinity,
  awatemonoblog: Infinity,
  dota2crutch:   Infinity
};

var defaultTimeout = 1000 * 60 * 60 * 24 * 7;

app.use(express.static(__dirname + '/client'));

app.get('/api/getHosts', function(request, response) {
  response.json( hosts );
});

app.post('/api/addHost', function(request, response) {
  hosts[request.body.host] = new Date().getTime() + defaultTimeout;
  response.end( );
});

app.listen(app.get('port'), function() {
  console.log( 'Unrest has awoken on port ' + app.get('port') );
});



var poke = function(){
  for(key in hosts){
    host=hosts[key];
    request("http://"+host+".herokuapp.com/");
  }
  console.log(new Date().toString() + ": Poking everyone...")
  setTimeout(poke,1000*60*4);
}
poke();
