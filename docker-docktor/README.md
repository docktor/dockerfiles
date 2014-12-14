# Docker run

```
docker run -d \
    --name docktormongodb \
    docktor/mongodb:latest

docker run -d \
    -p 3000:3000 \
    --link docktormongodb:db_1 \
    docktor/docktor:latest
```

You can add `-v <pathOnYouHost>:/data` for mongoDB data.
You can add `-v <pathOnYouHost>:/opt/backups` for mongoDB backups (collections of Docktor).


Go to http://<ipOfYourContainer>:3000 to view Docktor