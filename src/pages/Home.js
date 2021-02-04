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

function Home () {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [ createUser, { loading: mutationLoading, error: mutationError }, ] = useMutation(CREATE_USER) 

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_USERS) 

  if(queryLoading) return <p>loading query...</p>
  if(queryError) return <p>somethign went wrong</p>

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUser({ variables: { name, email, password }})
    }catch(error) {
      console.log('ups')
    }
  }

  return (
    <>
      <Container>
        <span>{errors.account}</span>
        <Form>
          <Form.Group as={Row} controlId="name">
            <Col xs="auto">
              <Form.Label srOnly>
                Nombre
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
              <Form.Control
                className="mb-2"
                value={name}
                placeholder="Nombre"
                onChange={handleChange}
              />
              </InputGroup>
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
        {mutationError && <p>Error :( try again</p>}
        {mutationLoading && <p>Loading mutation...</p>}
      </Form>
    </Container>
    </>
  )
}

export default Home 
