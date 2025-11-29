/**
 * This function retrieves the user's current geographical location
 * using the browser's Geolocation API. It returns a promise that
 * resolves to an array containing the longitude and latitude.
 *
 * @returns {Promise<[number, number]>} A promise that resolves to [longitude, latitude].
 */
export function getUserLocation(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // Return the [longitude, latitude] array
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert('Is not possible get your geolocation');
        console.error({ err });
        reject(err);
      },
      {
        enableHighAccuracy: true, // Use high accuracy if available
        timeout: 5000, // Maximum time to wait for a position
        maximumAge: 0, // Do not use a cached position
      }
    );
  });
}
