import { 
  Button, 
  Form, 
  Row, 
  Col, 
  InputGroup, 
  FormControl,
} from 'react-bootstrap'
import {
  //Container,
  //MiniContainer,
  Background,
  FormAlert
} from './signUpStyle'

function SignUpForm (
  name,
  email,
  password,
  passwordConfirm,
  errors,
  mutationLoading,
  handleChange,
  handleSubmit,
){
  console.log('estos son los errsos: ',errors)

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
                  type="text"
                  onChange={handleChange}
                  value={password}
                  placeholder="Nombre"
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
                Nombre
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                  type="text"
                  value={password}
                  placeholder="Nobre"
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
              <Form.Text>
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

export default SignUpForm
