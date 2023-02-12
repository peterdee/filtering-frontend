## filtering-frontend

[Brille](https://github.com/julyskies/brille) module demo - frontend

Stack: [Nuxt](https://nuxt.com), [Axios](https://axios-http.com), [common-styles](https://github.com/julyskies/common-styles)

Backend application code is available at https://github.com/peterdee/filtering-backend

**DEV**: http://localhost:3000

**PRODUCTION**: https://images.dyum.in (https://filtering-frontend.vercel.app)

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

```shell script
npm run build
```

Locally preview production build:

```shell script
npm run preview
```

### Vercel deployment

This application is automatically deployed to [Vercel](https://vercel.com)

### License

[MIT](./LICENSE.md)
