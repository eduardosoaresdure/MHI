
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Permite ao Metro resolver os módulos do Leaflet
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'cjs',
];

module.exports = config;
