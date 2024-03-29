# top-streamers

The dataset comes from https://www.kaggle.com/aayushmishra1512/twitchdata.

## Requirements
* Java11
* Kotlin
* MongoDB

Open command prompt. Type 
```
javac -version
```
and press enter. You should see `javac 11.0.4`.
If you do not have a Java Development Kit on your system, install it. 

### Download and install Kotlin
1. Check if kotlin is installed. Type
```
kotlinc -version
```
If command ended with error, you have to install kotlin.
* Windows: follow instruction https://downlinko.com/download-install-kotlin-windows.html
* OSx / Linux: https://kotlinlang.org/docs/command-line.html

### Database
1. Download project and find files `insert.main.kts` and `twitchdata.csv`
2. Run script
```
kotlinc -script insert.main.kts <mongo_connection_string> <absolute_path_to_twitchdata.csv>
```
mongo_connection_string - is a uri which enables connection to mongodb. If you use local 
database type `mongodb://localhost:27017`. Change to proper port.
3. Verify if data is saved in the database. 


_______________________

## Run with Vagrant:
### Requirements
* Vagrant
* Ansible
* Java11
* node


1. Run `./build.sh`
2. Run `vagrant up`
3. Open `localhost:3000`


## Run with Docker:
1. Run `./build.sh`
1. Run `docker compose up --build`
2. Run the mongoDB script with `mongodb://localhost:37017` as connection string
3. Open `localhost:4200`


## k8s
kind create cluster --config=kind-cluster.yaml
1. Mongo:
    docker pull mongo
    kind load docker-image mongo
    kubectl apply -f mongo-deployment.yaml
    kubectl apply -f mongo-service.yaml

2. Backend
    gradlew clean build
    docker build -t backend .
    kind load docker-image backend
    kubectl apply -f backend-deployment.yaml
    kubectl apply -f backend-service.yaml
3. Front
    ng build
    docker build -t frontendvm .
    kind load docker-image frontendvm
    kubectl apply -f nginx-deployment.yaml
    kubectl apply -f nginx-service.yaml
