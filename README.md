# API Use Cases

## TP » Insumos Médicos » UNQ » ArqSoft

### Repo Central » Info y Documentación

* <https://github.com/unq-arqsoft-difi/covid-doc>

### Use Cases

#### Use Case 1

1. Failed Registration
2. Successful Registration
3. Login & Get Token
4. View Request Supplies
5. Create Request Supply

#### Use Case 2

1. Failed Login
2. Successful Registration
3. Login OK & Get Token
4. Create Request Supply
5. Cancel Request Supply

#### Use Case 3

1. Registration
2. Login OK & Get Token
3. Create Request Supply
4. Get Request Supply

#### Use Case 4

1. Registration
2. Login OK & Get Token
3. Create Request Supply
4. Login Admin & Get Token
5. Admin Approve Request Supply
6. View Request Supplies

#### Use Case 5

1. Registration
2. Login OK & Get Token
3. Create Request Supply
4. Login Admin & Get Token
5. Admin Reject Request Supply
6. View Request Supplies

### Clone

```bash
git clone https://github.com/unq-arqsoft-difi/covid-api-use-cases.git
cd covid-api-use-cases
npm install
cp .env.example .env
```

Modificar los valores en el archivo `.env` según corresponda.

### Run

Es necesario levantar los containers de docker antes de correr los scripts.
Además, como hay scripts que generan información persistente, hay que
reiniciar los containers antes de volver a correr los scripts.

#### Consola 1

```bash
sudo docker-compose up
```

#### Consola 2

```bash
node scripts/use-case-1.js
```

```bash
node scripts/use-case-2.js
```

```bash
node scripts/use-case-3.js
```

```bash
node scripts/use-case-4.js
```

```bash
node scripts/use-case-5.js
```

Casa Use Case es independiente, con lo cual se pueden correr indistintamente.

También se puede definir el tiempo de delay entre cada step dentro de un use case,
por si se necesita simular diferentes escenarios. El valor por defecto es `100 ms`.

```bash
node scripts/use-case-5.js --delay=500 # en ms
```

##### Correr todos

Se pueden correr todos los scripts mediante el comando

```bash
npm run cases
```

### Performance Tests

Correr los tests de performance (previamente levantar el docker-compose)

#### Support Test

```sh
cd test-performance
npx artillery run -e dev register.yml
```

#### Register Test

```sh
cd test-performance
npx artillery run -e dev register.yml
```
