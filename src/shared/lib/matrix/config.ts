export const MATRIX_CONFIG = {

baseUrl: 'https://matrix.org',
deviceId: 'capsa-client',
initialSyncLimit: 20,
};

if (import.meta.env.DEV) {
    console.log('MATRIX_CONFIG:', MATRIX_CONFIG);
}