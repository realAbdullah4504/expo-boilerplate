const SERVER_URL = process.env.EXPO_PUBLIC_ADDRESS;

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};

const postRequest = async <T>(
  endPoint: string,
  data?: object,
  headers?: object
): Promise<T> => {
  const response: Response = await fetch(`${SERVER_URL}${endPoint}`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response) as Promise<T>;
};

const getRequest = async <T>(url: string, headers?: object): Promise<T> => {
  const response: Response = await fetch(`${SERVER_URL}${url}`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
  return handleResponse(response) as Promise<T>;
};

export { postRequest, getRequest };
