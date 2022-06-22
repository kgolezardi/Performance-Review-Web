This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting Up a Developmental API Server

First off, create a `.env` file in `docker` directory based on the given `docker/sample.env`.

After making sure that you have [Docker Engine](https://docs.docker.com/engine/install/ubuntu/),
[Docker Compose](https://docs.docker.com/compose/install/),
and [Docker Compose V2](https://docs.docker.com/compose/cli-command/)
installed, navigate to `docker` directory and run:

```
docker compose up -d
```

If you are setting up the backend for the first time, you will need to run these commands as well:

```
docker compose exec api python manage.py migrate --noinput
docker compose exec api python manage.py createsuperuser
```

To bring the API server down, run `docker compose down`. You can bring the server back up simply by running
`docker compose up -d`. Note that all of the commands above should be executed while the working directory is on
`docker`. You may also need to run the migration command if there are some new migrations in the backend.

Finally, note that each time there is a new docker image, we should run:

```
docker compose pull api
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
