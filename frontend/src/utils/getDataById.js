import axios from 'axios'

export const getDataById = async ({ id, endpoind }) => {
  if (id !== null && id) {
    try {
      const result = await axios.get(`http://localhost:4321/${endpoind}/${id}`)
      const todosDatos = {
        ...result.data
      }
      return { todosDatos, validacion: (id !== null && id) }
    } catch (error) {
      return { todosDatos: `Error: ${error.response.data.message}`, validacion: (id !== null && id) }
    }
  } else {
    return { todosDatos: null, validacion: (id !== null && id) }
  }
}
