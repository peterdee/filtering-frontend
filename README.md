## filtering-frontend

This is a frontend application for [Brille module](https://github.com/julyskies/brille) demo

Backend application code is available at https://github.com/peterdee/filtering-backend

DEV: http://localhost:3000

PRODUCTION: *TBD*

### Deploy

```shell script
git clone https://github.com/peterdee/filtering-frontend
cd ./filtering-frontend
nvm use 18
npm ci
```

### Environment variables

The `.env` file is required, see [.env.example](.env.example) for details

### Launch

##### Development

```shell script
npm run dev
```

Development server will be available at http://localhost:3000

##### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

### License

[MIT](./LICENSE.md)
