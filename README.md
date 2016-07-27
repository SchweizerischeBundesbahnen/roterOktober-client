# roterOktober-client
"Anatoli, you're afraid of our fleet. Well, you should be. Personally, I'd give us...one chance in three. More tea anyone?" -- Capt. Marko Ramius

# Getting started
Der [RoterOktober-Server](https://github.com/SchweizerischeBundesbahnen/roterOktober-server) muss gestartet sein. Der Hostname des Servers kann in der Datei `app.js` konfiguriert werden:
```
constant('config', {
        [...]
        restEndPoint: 'http://localhost:8080'
    })
```

Jetzt kann der Client einfach über Gulp gestartet werden:
```
gulp
```