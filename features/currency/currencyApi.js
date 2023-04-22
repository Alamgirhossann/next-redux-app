

export const getCurrency = async () => {
 const res = await fetch('https://api.apilayer.com/fixer/latest?base=USD&apikey=ieXzxGLEepiF2xZgIgitT9gDbmQvocN4555')
  const data = await res.json()
  return data;
};






