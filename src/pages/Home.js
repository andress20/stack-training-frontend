import styled from 'styled-components'
import { 
  Button, 
  Form, 
  Row, 
  Col, 
  InputGroup, 
  FormControl 
} from 'react-bootstrap'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

//const GET_USERS = gql`
  //{
    //users {
      //_id
      //name
      //email
    //}
  //}
//`
const CREATE_USER = gql`
  mutation CreateUser( $name: String!, $email: String!, $password: String! ) {
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const MiniContainer = styled.div`
  background-color: #f0efeb;
  height: auto;
  width: auto;
`
const Background = styled.body`
  background-image: url("https://wallpaperaccess.com/full/1338378.jpg");
  background-size: cover;
  height: 100vh;
  width: 100vw;
`
const FormAlert = styled.p`
  color: red;
`

function Home () {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [ 
    createUser,
    { 
      loading: mutationLoading, 
      error: mutationError 
    } 
  ] = useMutation(CREATE_USER, { onError: (error) => setErrors({email: error.message, emailMessage: 'Correo ya esta en uso'}) }) 

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if(validate()) {
      createUser({ variables: { name, email, password }})
    }
  }

  return (
    <Background>
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
            //{mutationLoading && <p>Creando nuevo usuario</p>}
          </Form.Group>
            </Form>
    </Background>
  )
}

export default Home 
