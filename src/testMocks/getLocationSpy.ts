export const getLocationSpy = (url: string): jest.SpyInstance<Location, []> => {
  const locationSpy = jest.spyOn(window, 'location', 'get');
  const location: Partial<Location> = new URL(url);

  location.assign = jest.fn();
  location.replace = jest.fn();
  location.reload = jest.fn();

  locationSpy.mockImplementation(() => location as Location);

  return locationSpy;
};
