import Boton from './boton'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import withReactContent from 'sweetalert2-react-content'
import { generarPdf } from '../utils/pdfReporteFinanzas'
import { generarWord } from '../utils/docReporteFInanzas'

export default function AlertDescargar (props) {
  const { idSeleccionado, tooltip } = props
  const [desabilitado, setDesabilitado] = useState(idSeleccionado !== null)
  const [dataMostrar, setDataMostrar] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4321/api/${idSeleccionado}`)
        setDataMostrar(result.data)
      } catch (error) {
        setDataMostrar({})
      }
    }

    fetchData()
  }, [idSeleccionado])

  useEffect(() => {
    if (idSeleccionado === null) {
      setDesabilitado(false)
    } else if (idSeleccionado !== null && idSeleccionado) {
      setDesabilitado(false)
    } else {
      setDesabilitado(true)
    }
  }, [idSeleccionado])

  const handleClick = async () => {
    const MySwal = withReactContent(Swal)
    await MySwal.fire({
      title: 'Seleccione una opción',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: 'Descargar PDF',
      denyButtonText: 'Descargar Word'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        generarPdf(dataMostrar)
      } else if (result.isDenied) {
        generarWord(dataMostrar)
      }
    })
  }

  return (
    <>
      <Boton
        bgColor='success'
        icon={<CloudDownloadIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}
