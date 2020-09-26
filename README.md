# API Test Cases

## TP » Insumos Médicos » UNQ » ArqSoft

### Repo Central » Info y Documentación

* <https://github.com/unq-arqsoft-difi/covid-doc>

### Clone

```bash
git clone https://github.com/unq-arqsoft-difi/covid-api-test-cases.git
cd covid-api-test-cases
npm install
cp .env.example .env
```

Modificar los valores en el archivo `.env` según corresponda.

### Run

Es necesario levantar los containers de docker antes de correr los tests.
Además, como hay tests que generan información persistente, hay que
reiniciar los containers antes de volver a correr los tests.

#### Consola 1

```bash
sudo docker-compose up
```

#### Consola 2

```bash
npm run test
```
