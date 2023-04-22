

export const getCurrency = async () => {
 const res = await fetch('https://api.apilayer.com/fixer/latest?base=USD&apikey=ZjqB0ixLE8luEblQFtLgMxT1CM7Y3pXh')
  const data = await res.json()
  return data;
};






