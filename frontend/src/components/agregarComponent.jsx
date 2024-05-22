import { Grid, Modal, Typography } from '@mui/material'
import useForm from '../hooks/useForm'
import Input from './Input'
import Selects from './Selects'
import { useState, useEffect } from 'react'
import Boton from './boton'
import { useHabilitar } from '../hooks/useHabilitar'
import Message from './succesfulMessage'
import axios from 'axios'
import { getDataById } from '../utils/getDataById'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'

const defaultValues = {
  nombreUsuario: '',
  numeroDocumento: '',
  numeroContacto: '',
  direccion: '',
  correo: '',
  cantidadFormularios: 1
}

const generador = [
  {
    id: 1,
    value: 1
  },
  {
    id: 2,
    value: 2
  },
  {
    id: 3,
    value: 3
  },
  {
    id: 4,
    value: 4
  },
  {
    id: 5,
    value: 5
  },
  {
    id: 6,
    value: 6
  }
]

export const FormAgregar = (props) => {
  const { label, id, bgColor, icon, tooltip, actualizar, dato, successMessage, errorMessage } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const { desabilitado } = useHabilitar({ id })

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // constante para manejar la cantidad de formularios
  const [formulariosGenerados, setFormulariosGenerados] = useState([])
  // constante para manejar los datos de las deudas

  const [deudas, setDeudas] = useState([])

  // constante para el manejo de pasos
  const [paso, SetPaso] = useState(1)

  useEffect(() => {
    const nuevasDeudas = []
    for (let i = 0; i < values.cantidadFormularios; i++) {
      nuevasDeudas.push({
        entidad_bancaria: '',
        fecha_pago_oportuno: dayjs().format('MM/DD/YYYY'),
        valor_pago: 0,
        mes_registro: dayjs().format('MM/YYYY'),
        estado_pago: ''
      })
    }
    setDeudas(nuevasDeudas)
  }, [values.cantidadFormularios])

  useEffect(() => {
    if (paso === 2) {
      generarFormularios()
    }
  }, [paso])

  const handleModal = async () => {
    successMessage('')
    errorMessage('')
    const { todosDatos, validacion } = await getDataById({ id, endpoind: 'admin', defaultValues })
    if (validacion) {
      if (todosDatos instanceof Error) {
        setError(todosDatos)
      } else {
        setValues(todosDatos)
      }
    }
    setOpen(true)
  }

  const handleClose = () => {
    setValues(defaultValues)
    setError('')
    setSuccess('')
    setOpen(false)
    SetPaso(1)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const envio = { ...values, registrosBancarios: deudas }
    console.log(envio)
    try {
      const endpoint = 'http://localhost:4321/api/'
      const httpMethod = 'post'
      const response = await axios[httpMethod](endpoint, envio)
      console.log(response)
      actualizar(!dato)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  // codigo para generar formularios
  const generarFormularios = () => {
    const nuevosFormularios = []
    for (let i = 0; i < values.cantidadFormularios; i++) {
      // logica formularios generados
      nuevosFormularios.push(
        <Grid container spacing={2} key={i}>
          {i === 0 &&
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year', 'month']}
                  label='Mes a registrar'
                  value={dayjs(deudas.mes_registro)}
                  onChange={(date) => handleMonthChange(date, i)}
                  required
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>}
          <Grid item xs={12}>
            <Typography variant='h6'>Deuda {i + 1}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Input
              id='entidad_bancaria'
              label='Entidad Bancaria'
              name='entidad_bancaria'
              value={deudas.entidad_bancaria}
              onChange={(e) => handleInputChangeDeudas(e, i)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Fecha de pago oportuno'
                value={dayjs(deudas.fecha_pago_oportuno)}
                onChange={(date) => handleDateChange(date, i)}
                required
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              id='estado_pago'
              label='Estado Pago'
              name='estado_pago'
              value={deudas.estado_pago}
              onChange={(e) => handleInputChangeDeudas(e, i)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Input
              id='valor_pago'
              label='Valor Pago'
              name='valor_pago'
              value={deudas.valor_pago}
              onChange={(e) => handleInputChangeDeudas(e, i)}
              required
            />
          </Grid>
        </Grid>
      )
    }
    setFormulariosGenerados(nuevosFormularios)
  }

  const handleInputChangeDeudas = (e, index) => {
    const { name, value } = e.target
    setDeudas(prevDeudas => {
      const updatedDeudas = [...prevDeudas]
      updatedDeudas[index][name] = value
      return updatedDeudas
    })
  }

  const handleDateChange = (date, index) => {
    setDeudas(prevDeudas => {
      const updatedDeudas = [...prevDeudas]
      updatedDeudas[index].fecha_pago_oportuno = date.format('MM/DD/YYYY')
      return updatedDeudas
    })
  }

  const handleMonthChange = (date, index) => {
    setDeudas(prevDeudas => {
      const updatedDeudas = [...prevDeudas]
      for (const deudas of updatedDeudas) {
        deudas.mes_registro = date.format('MM/YYYY')
      }
      return updatedDeudas
    })
  }

  return (
    <div>
      <Boton
        onClick={handleModal}
        bgColor={bgColor}
        icon={icon}
        tooltip={tooltip}
        desable={desabilitado}
      />
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] border border-solid border-black rounded-lg shadow p-4 bg-white overflow-y-auto max-h-[380px]' autoComplete='off' id='form' noValidate>
          <h1 className='text-3xl text-center mb-2'>{label}</h1>
          {error && (
            <Message severity='error' message={error} />
          )}
          {success && (
            <Message severity='success' message={success} />
          )}
          <Grid container spacing={2} columns={12}>
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='nombreUsuario'
                  label='Nombre Usuario'
                  name='nombreUsuario'
                  value={values.nombreUsuario}
                  onChange={handleInputChange}
                  required
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='numeroDocumento'
                  label='Numero Documento'
                  name='numeroDocumento'
                  value={values.numeroDocumento}
                  onChange={handleInputChange}
                  required
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='numeroContacto'
                  fullWidth
                  label='Numero Contacto'
                  name='numeroContacto'
                  value={values.numeroContacto}
                  onChange={handleInputChange}
                  required
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='direccion'
                  fullWidth
                  label='Direccion'
                  name='direccion'
                  value={values.direccion}
                  onChange={handleInputChange}
                  required
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='correo'
                  fullWidth
                  label='Correo'
                  name='correo'
                  value={values.correo}
                  onChange={handleInputChange}
                  required
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Selects
                  id='cantidadFormularios'
                  label='Cantidad Registros'
                  name='cantidadFormularios'
                  value={values.cantidadFormularios}
                  onChange={handleInputChange}
                  items={generador}
                  required
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Boton
                  onClick={handleClose}
                  bgColor='error'
                  icon={<CloseIcon className='w-6 h-6' />}
                  tooltip='Cancelar'
                  text='Cancelar'
                />
              </Grid>}
            {paso === 1 &&
              <Grid item xs={12} sm={6}>
                <Boton
                  onClick={() => SetPaso(2)}
                  bgColor='primary'
                  icon={<ArrowForwardIcon className='w-6 h-6' />}
                  tooltip='Siguiente'
                  text='Siguiente'
                />
              </Grid>}
            {paso === 2 && (
              <div className='ms-4 mt-3'>
                {formulariosGenerados.map((formulario) => formulario)}
                <Grid item xs={12}>
                  <button
                    type='submit'
                    className='mt-4 w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-500 to-blue-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                  >
                    Registrar
                  </button>
                </Grid>
              </div>
            )}
          </Grid>
        </form>
      </Modal>
    </div>
  )
}
