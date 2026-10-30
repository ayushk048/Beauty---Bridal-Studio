/** Builds a Pexels CDN URL from a photo id. */
export const pexels = (id: number, width = 900): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
