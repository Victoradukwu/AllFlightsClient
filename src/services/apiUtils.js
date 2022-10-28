export const handleResponse = async (response) =>{
  if (response.ok) {return response.json();}

  const  err_msg = await response.json();
  throw new Error(err_msg.detail);
}

// In a real app, would likely call an error logging service.
export const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
