export const handleResponse = async (response) =>{
  if (response.ok) {return response.json();}
  if (response.status === 400) {
    const err_msg = await response.text();
    throw new Error(err_msg);
  }
  throw new Error("Network error occurred.");
}

// In a real app, would likely call an error logging service.
export const handleError = (error) => {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
