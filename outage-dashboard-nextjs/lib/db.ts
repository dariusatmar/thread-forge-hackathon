import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ZIP code coordinates for Connecticut (from original Flask app)
export const ZIP_COORDINATES: Record<string, { lat: number; lon: number; city: string }> = {
  '06001': { lat: 41.8798, lon: -72.7479, city: 'Avon' },
  '06002': { lat: 41.8626, lon: -72.5856, city: 'Bloomfield' },
  '06010': { lat: 41.7579, lon: -72.8403, city: 'Bristol' },
  '06016': { lat: 41.5565, lon: -72.9289, city: 'Broad Brook' },
  '06032': { lat: 41.8584, lon: -72.7509, city: 'Farmington' },
  '06033': { lat: 41.8834, lon: -72.7826, city: 'Glastonbury' },
  '06035': { lat: 41.6612, lon: -72.8120, city: 'Granby' },
  '06042': { lat: 41.7798, lon: -72.5187, city: 'Manchester' },
  '06043': { lat: 41.7959, lon: -72.5270, city: 'Bolton' },
  '06051': { lat: 41.9009, lon: -72.5859, city: 'New Britain' },
  '06052': { lat: 41.9298, lon: -72.5598, city: 'New Britain' },
  '06053': { lat: 41.8787, lon: -72.5620, city: 'New Britain' },
  '06067': { lat: 41.8590, lon: -72.4959, city: 'Rocky Hill' },
  '06070': { lat: 41.8462, lon: -72.7931, city: 'Simsbury' },
  '06074': { lat: 41.7337, lon: -72.8326, city: 'South Windsor' },
  '06078': { lat: 41.6987, lon: -72.8648, city: 'Suffield' },
  '06082': { lat: 41.8959, lon: -72.7759, city: 'Enfield' },
  '06088': { lat: 41.7798, lon: -72.7187, city: 'East Granby' },
  '06095': { lat: 41.9431, lon: -72.5620, city: 'Windsor' },
  '06096': { lat: 41.8387, lon: -72.6437, city: 'Windsor Locks' },
  '06105': { lat: 41.7662, lon: -72.7009, city: 'Hartford' },
  '06106': { lat: 41.7548, lon: -72.6887, city: 'Hartford' },
  '06107': { lat: 41.7598, lon: -72.7220, city: 'West Hartford' },
  '06108': { lat: 41.7726, lon: -72.7498, city: 'East Hartford' },
  '06109': { lat: 41.7337, lon: -72.7187, city: 'Wethersfield' },
  '06110': { lat: 41.7448, lon: -72.7276, city: 'West Hartford' },
  '06111': { lat: 41.7137, lon: -72.7387, city: 'Newington' },
  '06117': { lat: 41.7859, lon: -72.7109, city: 'West Hartford' },
  '06118': { lat: 41.7909, lon: -72.7598, city: 'East Hartford' },
  '06119': { lat: 41.7709, lon: -72.6687, city: 'West Hartford' },
  '06226': { lat: 41.8598, lon: -72.2309, city: 'Willimantic' },
};

export default prisma;
