import { 
  Button, 
  Form, 
  Row, 
  Col, 
  InputGroup, 
  FormControl 
} from 'react-bootstrap'
import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const GET_USERS = gql`
  {
    users {
      _id
      name
      email
    }
  }
`
const CREATE_USER = gql`
  mutation CreateUser( $name: String!, $email: String! ) {
    createUser(input: {
      name: $name
      email: $email
    }) {
      _id
      name
      email
    }
  }
`

function Home () {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [ createUser, user ] = useMutation(CREATE_USER) 

  const { data, loading, error } = useQuery(GET_USERS) 

  if(loading) return <p>loading...</p>
  if(error) return <p>somethign went wrong</p>

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
    createUser({
      variables: { name, email }
    })
  }

  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="name">
          <Col xs="auto">
            <Form.Label srOnly>
              Nombre
            </Form.Label>
            <Form.Control
              className="mb-2"
              value={name}
              placeholder="Nombre"
              onChange={handleChange}
            />
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
                  placeholder="Email"
                  onChange={handleChange}
                />
              </InputGroup>
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
          </Form.Group>
      </Form>
    </>
  )
}

export default Home 
