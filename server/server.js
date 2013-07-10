/**
 * Created by kchen on 7/10/13.
 */
var express = require('express');
var app = express();

app.use(express.logger());
app.use(express.compress());
app.use(express.static(__dirname + '/../'));

app.listen(8080);