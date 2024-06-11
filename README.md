<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## CLIENT GATEWAY
Client gateway is the main communication point between our services and clients.
It is the one that recieve the request, send the request to the services


## DEV MODE
1. Clone repository
2. Npm install
3. Create the `.env` based on `.env.template`
4. Be aware the whole microservices that you need to run
5. Start the project `npm run sdtart:dev`


## NATS
`docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats`