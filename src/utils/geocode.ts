export const geocodeAddress = async (
  address: string
): Promise<{ latitude: number; longitude: number }> => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.GEOCODE_API_KEY}`
  );

  const data = await response.json();
  if (data.results.length == 0) throw new Error('Unable to geocode address.');

  const { lat, lng } = data.results[0].geometry;

  return { latitude: 16, longitude: 49.5 };
};
