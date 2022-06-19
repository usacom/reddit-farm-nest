#!/bin/sh
>&2 echo "Starting server..."
npm run typeorm:run && npm run start:$NODE_ENV
