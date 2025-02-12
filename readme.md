# INKER BLOG

## HOW TO RUN
#### NOTE
The development environment is entirely dockerised so install docker first if you are on linux use your package manager if you are on windows install Docker desktop before continuing view.<i> Refer this documentation to setup docker.</i>
<br>
<b>https://docs.docker.com/engine/install</b>
<br>
<i>Install the docker compose plugin for your distribution.</i>
<br>
<a><b>https://docs.docker.com/compose/install/linux</b></a>
<br>


#### STEP 1
Go to the root directory of the project and run if everything is setup correctly you would be able to see it in the console.
```bash
sudo docker compose up
```
#### STEP 2
<b>React</b>:<b> http://localhost:5173</b>
<br/>
<b>Express</b>:<b> http://localhost:3000</b>
<br>
Ensure that these are live

#### STEP 4
##### ENSURE LIVENESS OF BACKEND
```bash
curl -X GET http://localhost:3000
```

## CONTRIBUTING GUIDE

## DOCUMENTATION