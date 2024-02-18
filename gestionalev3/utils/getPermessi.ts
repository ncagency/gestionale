import axios from 'axios';


const apiURL =  "https://testxsjsjns-bbec60097ba9.herokuapp.com"

export const getPermessi = async (workerId: string) => {
  try {
    const response = await axios.get(`${apiURL}/workers/${workerId}`);
    return response.data.permessi;
  } catch (error) {
    console.error('Errore durante il recupero dei permessi dal database:', error);
    return null; // o un valore di default appropriato
  }
};