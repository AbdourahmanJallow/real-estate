import opencage from 'opencage-api-client';

export const geocodeAddress = async (
  address: string
): Promise<{ latitude: number; longitude: number }> => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey) throw new Error('API key not found');

  const data = await opencage.geocode({ q: address, key: apiKey });

  console.log('goecode data ', data.results[0].geometry);

  if (data.results.length === 0) throw new Error('Unable to geocode address.');
  const { lat, lng } = data.results[0].geometry;

  return { latitude: lat, longitude: lng };
};
