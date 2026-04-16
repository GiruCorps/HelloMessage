#!/usr/bin/env node
/**
 * generate-jwt.js
 * Generates a unique JWT for use in API requests / cURL testing.
 *
 * Usage:
 *   node scripts/generate-jwt.js
 *   JWT=$(node scripts/generate-jwt.js)
 */

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const token = jwt.sign(
  {
    transactionId: uuidv4(),
    iat: Math.floor(Date.now() / 1000)
  },
  JWT_SECRET,
  { expiresIn: '5m' }
);

// Output only the token (compatible with shell variable capture)
process.stdout.write(token + '\n');
