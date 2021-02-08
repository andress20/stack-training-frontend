import { 
  Button, 
  Form, 
  Row, 
  Col, 
  InputGroup, 
  FormControl,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap'
import {
  ContainerSignUp,
  ContainerHeadButtons,
  ContainerForm,
  MiniContainer,
  Background,
  FormAlert
} from '../components/signUp/signUpStyle'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useLazyQuery , useMutation } from '@apollo/client'

const SIGN_IN = gql`
  query SignIn( $email: String!, $password: String! ) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      _id
      name
      email
    }
  }
`
const SIGN_UP = gql`
  mutation signUp( $name: String!, $email: String!, $password: String! ) {
    createUser(input: {
      name: $name
      email: $email
      password: $password
    }) {
      _id
      name
      email
    }
  }
`

function Home () {

  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState(1)
  const [ getUser, { signInLoading, data}] = useLazyQuery(SIGN_IN)
  const [ 
    signUp,
    { 
      loading: mutationLoading, 
      error: mutationError 
    } 
  ] = useMutation(SIGN_UP, { onError: (error) => setErrors({email: error.message, emailMessage: 'Correo ya esta en uso'}) }) 

  //const { data, loading: queryLoading, error: queryError } = useQuery(GET_USERS) 

  const validate = () => {
    const isCorrectPassword = !!password && !!passwordConfirm && password === passwordConfirm

    if(!isCorrectPassword) {
      setErrors({ password: 'La contraseña no coincide' })
      return false
    }
    setErrors({ password: '' })
    return true
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    switch(id) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'passwordConfirm':
        setPasswordConfirm(value)
        break
      default: break
    }
  }

  const handleForm = (val) => {
    setForm(val)
  }

  const handleSubmitSignUp = async (e) => {
    e.preventDefault()
    if(validate()) {
      try {
        const newUser = await signUp({ variables: { name, email, password }})
        if(newUser) {
          history.push(`/dashboard`)
        }

      }catch(error) {
        setErrors({signUp: 'Error en la creacion de usuario'})
      }finally {
        setErrors({signUp: ''})
      }
    }
  }

  const handleSubmitSignIn = (e) => {
    e.preventDefault()
      try {
        getUser({ variables: { email, password }})
          console.log(data.signIn._id)
        if(data.signIn._id) {
          history.push('/dashboard')
        }
      }catch(error) {
        setErrors({ signIn: 'email o contraseña incorrectos'})
      }finally {
        setErrors({ signIn: ''})
      }
  }

  return (
    <Background>
      <ContainerSignUp>
        <ContainerHeadButtons>
          <ToggleButtonGroup type="radio" name="formOption" value={form} defaultValue={1} onChange={handleForm}>
            <ToggleButton variant="outline-info" value={1}>Registrarse</ToggleButton>
            <ToggleButton variant="outline-info" value={2}>Ingresar</ToggleButton>
          </ToggleButtonGroup>
        </ContainerHeadButtons>
        {form === 1 &&
        <ContainerForm>
          <Form>
            <Form.Group as={Row} controlId="name">
              <Col xs="auto">
                <Form.Label srOnly>
                  name
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    type="name"
                    value={name}
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                </InputGroup>
                <Form.Text>
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="email">
              <Col xs="auto">
                <Form.Label srOnly>
                  email
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    type="email"
                    value={email}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                  />
                </InputGroup>
                <Form.Text>
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="password">
              <Col xs="auto">
                <Form.Label srOnly>
                  Contraseña
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    type="password"
                    value={password}
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="passwordConfirm">
              <Col xs="auto">
                <Form.Label srOnly>
                  Confirme contraseña
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    type="password"
                    value={passwordConfirm}
                    placeholder="Confirmar contraseña"
                    onChange={handleChange}
                  />
                </InputGroup>
                <Form.Text>
                  <FormAlert>{errors.password}{errors.emailMessage}</FormAlert>
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group>
              <Col xs="auto">
                <Button 
                  type="submit"
                  className="mb-2"
                  onClick={handleSubmitSignUp}
                >
                  Registrar
                </Button>
              </Col>
                 {mutationLoading && <p>Creando nuevo usuario</p>}
            </Form.Group>
              </Form>
        </ContainerForm>
        }
    { form === 2 &&
        <ContainerForm>
          <Form>
            <Form.Group as={Row} controlId="email">
              <Col xs="auto">
                <Form.Label srOnly>
                  email
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    type="email"
                    value={email}
                    placeholder="Correo electrónico"
                    onChange={handleChange}
                  />
                </InputGroup>
                <Form.Text>
                </Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="password">
              <Col xs="auto">
                <Form.Label srOnly>
                  Contraseña
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    type="password"
                    value={password}
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Col>
            </Form.Group>
              <FormAlert>{errors.signIn}</FormAlert>
            <Form.Group>
              <Col xs="auto">
                <Button 
                  type="submit"
                  className="mb-2"
                  onClick={handleSubmitSignIn}
                >
                  Ingresar
                </Button>
              </Col>
                 {signInLoading && <p>Ingresando..</p>}
            </Form.Group>
              </Form>
        </ContainerForm>
    }
      </ContainerSignUp>
    </Background>
  )
}

export default Home 
