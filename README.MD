# DEMO

Demo is available: https://d3hmaq22obd6wq.cloudfront.net/

# Prerequisites
* Install Node.js v14
* Set an environment variable **AWS_REGION** to **us-east-1**
* Configure a default AWS profile ```aws configure``` (if you start it locally)

# Deploy DB
```
cd db && npm i && npm run deploy
```

# Deploy API
Note: DB stack should be deployed
```
cd api && npm i && npm run deploy
```
Note: **Unit** and **Integration** tests will be run automatically

# Run unit test locally
*
  ```
  cd api && npm i && npm run test
  ```

# Run integration test locally
* DB and API should be deployed
*
  ```
  cd api && npm i && npm run test:integration
  ```
