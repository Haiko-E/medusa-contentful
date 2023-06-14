// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || 'https://app.medusa-commerce.com';

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://localhost:8000';

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/my-medusa-store';

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Contentful Variables
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || '';
const CONTENTFUL_ACCESS_TOKEN =
  process.env.CONTENTFUL_ACCESS_TOKEN ||
  'CFPAT-uyMomKY2vYSnW1A4jvv5cb2GDn4oW6Wxc3gjbUO4wGg';
const CONTENTFUL_ENV = process.env.CONTENTFUL_ENV || '';

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // {
  //   resolve: `medusa-plugin-contentful`,
  //   options: {
  //     space_id: CONTENTFUL_SPACE_ID,
  //     access_token: CONTENTFUL_ACCESS_TOKEN,
  //     environment: CONTENTFUL_ENV,
  //   },
  // },
  {
    resolve: '@medusajs/admin',
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
    },
  },

  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    },
  },
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    database_url: DATABASE_URL,
    database_type: 'postgres',
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
  modules: {
    eventBus: {
      resolve: '@medusajs/event-bus-redis',
      options: {
        redisUrl: REDIS_URL,
      },
    },
    cacheService: {
      resolve: '@medusajs/cache-redis',
      options: {
        redisUrl: REDIS_URL,
      },
    },
    eventBus: {
      resolve: '@medusajs/event-bus-local',
    },
  },
};
