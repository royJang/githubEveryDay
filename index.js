var schedule = require("node-schedule");
var shell = require('shelljs/global');
var fs = require("fs-extra");

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
//rule.hour = 24;
//rule.minute = 0;
var times = [];
for(var i=1; i<60; i+=10){
    times.push(i);
}
rule.second = times;

var userName = "royjang";
var email = "zzl1108@hotmail.com";

exec('git config --global github.user ' + userName);
exec('git config --global github.email ' + email);

var j = schedule.scheduleJob(rule, function(){
    tryToCommit();
});

function tryToCommit (){
    changeFiles(function (err){
        try {
            exec('git add -A');
            exec('git commit -m "'+ now() + '"');
            exec("git push origin master");
        } catch (e){
            tryToCommit();
        }
    })
}

function changeFiles ( callback ){
    fs.writeFile("./file", now() , callback);
}

function now (){
    var d = new Date();
    return d.getFullYear() + "-"
            + (d.getMonth() + 1) + "-"
            + d.getDate() + " "
            + d.getHours() + ":"
            + d.getMinutes() + ":"
            + d.getSeconds();
}





















