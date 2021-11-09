export const CONSTANTS = {
    ERR_MSG_DURATION: 2000
}

/**
 * Mock a call to API to fetch data from Json file
 */

export const loadMeteors = async () => {
    const response = await fetch('NasaData.json');
    return await response.json();
}
