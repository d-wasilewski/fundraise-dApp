import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'paov73bw',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skwzcT2wfZXgeXLms1LJAacymNnxLK143OOmLhSaQHPXDDJhl0jpdGWvBuOSnXYDUxEr2eDmPPXZg7io4LgiCTx7E9swlfOfaf2WWFqnjVpBvpEKzwHl3Ucnw4aC09ISUsOZEbgSQxYTAfKzL8cGeuaAg8eaQjTsXo6J0Cy7m7K1s6bwpma0',
  useCdn: false,
});
