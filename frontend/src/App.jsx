import DataTable from './components/dataTable'
import useSelectId from './hooks/useSelectId'
import Stack from '@mui/material/Stack'
import Botonera from './components/botonera'
import { FormAgregar } from './components/agregarComponent'
import AddIcon from '@mui/icons-material/Add'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AlertDescargar from './components/descargaCopmponent'

const columns = [
  { field: 'nombre_usuario', headerName: 'Nombre', width: 140 },
  { field: 'numero_documento', headerName: 'Numero de documento', width: 200 },
  { field: 'numero_contacto', headerName: 'Numero de contacto', width: 170 },
  { field: 'direccion', headerName: 'Direccion', width: 260 },
  { field: 'correo', headerName: 'Correo', width: 180 }
]
/*
const data = [
  {
    id: 1,
    nombre_usuario: 'Juan Pérez',
    numero_documento: '12345678',
    numero_contacto: '+1234567890',
    direccion: 'Calle Principal 123',
    correo: 'juan@example.com'
  },
  {
    id: 2,
    nombre_usuario: 'María García',
    numero_documento: '87654321',
    numero_contacto: '+1987654321',
    direccion: 'Avenida Central 456',
    correo: 'maria@example.com'
  },
  {
    id: 3,
    nombre_usuario: 'Carlos López',
    numero_documento: '23456789',
    numero_contacto: '+1122334455',
    direccion: 'Plaza Mayor 789',
    correo: 'carlos@example.com'
  }
]
*/

function App () {
  const { selectId, saveSelectId } = useSelectId()
  const [actualizar, setActualizar] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState(null)
  const [dataMostrar, setDataMostrar] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/api')
        setDataMostrar(result.data)
      } catch (error) {
        setDataMostrar([])
        error.response ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
      }
    }

    fetchData()
  }, [actualizar])
  return (
    <div>
      <div className='fixed top-0 left-0 w-full bg-custom-blue text-white py-2 flex items-center'>
        <div className='text-3xl font-bold ms-2'>CFP</div>
      </div>
      <div className='text-5xl text-center mt-16 mb-7 relative z-0'>
        Sistema de Registro Financiero
      </div>
      <Stack
        spacing={2}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '71%',
          maxHeight: '80vh',
          p: [2, 3, 4],
          overflow: 'auto'
        }}
      >
        <Botonera
          agregar={<FormAgregar
            icon={<AddIcon className='w-6 h-6' />}
            tooltip='Agregar Cliente'
            bgColor='primary'
            label='Agregar Cliente'
            actualizar={setActualizar}
            dato={actualizar}
            id={null}
            successMessage={setSuccess}
            errorMessage={setError}
                   />}
          descarga={<AlertDescargar
            idSeleccionado={selectId}
            tooltip='Descargar Informe'
                    />}
        />
        <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
      </Stack>
    </div>
  )
}

export default App
