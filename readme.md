# SpyLens JS Client

## Data required in the response

- name
- surname
- date of birth
- age

## TODO

1. Define the response body when configuring the mock server.
2. Use matchers to improve the test
3. Publish the results

## Tips

### Axios

    return axios.request({
        method: <http method>,
        baseURL: <url:port>,
        url: <path>,
        headers: { Accept: "application/json" },
    });


### Adding Matchers

    const { Pact, Matchers  } = require("@pact-foundation/pact")
    const { <matcher name> } = Matchers 

### Matchers reference

    https://github.com/pact-foundation/pact-js#matching


### Publisher code

https://gist.github.com/milodotnet/fa5e5ceffa4cf05025624b85cbb80702

Running the publisher after you're test is complete

    after(() => {
        return provider.finalize().then(_ => publishPact());
    })

### Setting up a local broker

1. Setup postgres

        docker run --name pactbroker-db -e POSTGRES_PASSWORD=ThePostgresPassword -e POSTGRES_USER=admin -e PGDATA=/var/lib/postgresql/data/pgdata -v /var/lib/postgresql/data:/var/lib/postgresql/data -d postgres

2. Change postgres password

        docker run -it --link pactbroker-db:postgres --rm postgres sh -c 'exec psql -h $POSTGRES_PORT_5432_TCP_ADDR -p $POSTGRES_PORT_5432_TCP_PORT -U admin'

3. Run these scripts

        CREATE USER pactbrokeruser WITH PASSWORD 'TheUserPassword';
        CREATE DATABASE pactbroker WITH OWNER pactbrokeruser;
        GRANT ALL PRIVILEGES ON DATABASE pactbroker TO pactbrokeruser;

4. start the broker

        docker run --name pactbroker --link pactbroker-db:postgres -e PACT_BROKER_DATABASE_USERNAME=pactbrokeruser -e PACT_BROKER_DATABASE_PASSWORD=TheUserPassword -e PACT_BROKER_DATABASE_HOST=postgres -e PACT_BROKER_DATABASE_NAME=pactbroker -d -p 8082:80 dius/pact-broker