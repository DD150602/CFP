import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

export default function Botonera (props) {
  const { descarga, agregar, editar, eliminar, ver } = props
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          m: 1
        }
      }}
    >
      <ButtonGroup className='justify-end' variant='outlined' aria-label='outlined button group'>
        {agregar}
        {editar}
        {descarga}
        {eliminar}
        {ver}
      </ButtonGroup>
    </Box>
  )
}
