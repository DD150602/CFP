import { Grid, Modal, Typography } from '@mui/material'
import Input from './Input'
import { useState } from 'react'
import Boton from './boton'
import { useHabilitar } from '../hooks/useHabilitar'
import Message from './succesfulMessage'
import { getDataById } from '../utils/getDataById'
import dayjs from 'dayjs'

export const VisualizarComponent = (props) => {
  const { label, id, bgColor, icon, tooltip, successMessage, errorMessage } = props
  const [values, setValues] = useState(null)
  const { desabilitado } = useHabilitar({ id })

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleModal = async () => {
    successMessage('')
    errorMessage('')
    const { todosDatos, validacion } = await getDataById({ id, endpoind: 'api' })
    if (validacion) {
      if (todosDatos instanceof Error) {
        setError(todosDatos)
      } else {
        setValues(todosDatos[0])
      }
    }
    setOpen(true)
  }

  const handleClose = () => {
    setValues(null)
    setError('')
    setSuccess('')
    setOpen(false)
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
        <form className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] border border-solid border-black rounded-lg shadow p-4 bg-white overflow-y-auto max-h-[450px]' autoComplete='off' id='form' noValidate>
          <h1 className='text-3xl text-center mb-2'>{label}</h1>
          {error && (
            <Message severity='error' message={error} />
          )}
          {success && (
            <Message severity='success' message={success} />
          )}
          <Grid container spacing={2} columns={12}>
            {values &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='nombreUsuario'
                  label='Nombre Usuario'
                  name='nombreUsuario'
                  value={values.nombre_usuario}
                  required
                  disabled
                />
              </Grid>}
            {values &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='numeroDocumento'
                  label='Numero Documento'
                  name='numeroDocumento'
                  value={values.numero_documento}
                  disabled
                />
              </Grid>}
            {values &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='numeroContacto'
                  fullWidth
                  label='Numero Contacto'
                  name='numeroContacto'
                  value={values.numero_contacto}
                  disabled
                />
              </Grid>}
            {values &&
              <Grid item xs={12} sm={6}>
                <Input
                  id='direccion'
                  fullWidth
                  label='Direccion'
                  name='direccion'
                  value={values.direccion}
                  disabled
                />
              </Grid>}
            {values &&
              <Grid item xs={12} sm={12}>
                <Input
                  id='correo'
                  fullWidth
                  label='Correo'
                  name='correo'
                  value={values.correo}
                  disabled
                />
              </Grid>}
            {values && (
              <div className='ms-4 mt-3'>
                {values.registros_bancarios.map((formulario, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={12}>
                      <Typography variant='h6'>Deuda {index + 1}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        id='entidad_bancaria'
                        label='Entidad Bancaria'
                        name='entidad_bancaria'
                        value={formulario.entidad_bancaria}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        id='fecha_pago_oportuno'
                        label='Fecha de pago oportuno'
                        name='fecha_pago_oportuno'
                        value={dayjs(formulario.fecha_pago_oportuno).format('MM/DD/YYYY')}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        id='mes_registro'
                        label='Mes a registrar'
                        name='mes_registro'
                        value={formulario.mes_registro}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        id='estado_pago'
                        label='Estado Pago'
                        name='estado_pago'
                        value={formulario.estado_pago}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Input
                        id='valor_pago'
                        label='Valor Pago'
                        name='valor_pago'
                        value={formulario.valor_pago}
                        required
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </div>
            )}
          </Grid>
        </form>
      </Modal>
    </div>
  )
}
