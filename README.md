# Folk ARPS website

This is the new (2021) Folk ARPS site which uses nuxt and vuetify.

## Editing 

Markdown content files are stored in `content/`

The easiest way ot edit the site is to use Netlify CMS which can be accessed via `/admin` on the site.

## Development

The site can be run in a docker container for development

``` docker-compose up --build ```

Once started the site will be available on `http://localhost:8080` and will auto-relocated changes.

Static output files/content can be manually generated with:
```
npm install
npm run generate
```

## Deployment

Deployment is via continuous development using Netlify. Pushing changes to the main branch will update the site after a few minutes.
