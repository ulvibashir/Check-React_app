const FIREBASE_DOMAIN = 'https://check-791f5.firebaseio.com/';

function fetchAPI(endpoint, method) {
    const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };

  return async (args, key = '') => {
    try {
      let getParams = '?';
      if (method === "GET") {
        for (let key in args) {
          getParams += `${key}=${args[key]}&`;
        }
      } else {
        options.body = JSON.stringify(args);
      }
      const url = key ? 
      `${FIREBASE_DOMAIN}${endpoint}${key}.json${getParams}`
      :
      `${FIREBASE_DOMAIN}${endpoint}${getParams}`
      
      const response = await fetch(url, options);
      return response.json();
    } catch (error) {
      return { error: true, errObj: error };
    }
  };
}

export const getUsersFetch = fetchAPI("users.json", "GET");
export const createUserFetch = fetchAPI("users.json", "POST");
export const getProjectsFetch = fetchAPI("projects.json", "GET")
export const getDetailsFetch = fetchAPI("projects/", "GET")
