import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginAPI } from '../apis/backendapi'
import '../styles/globals.css'

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export default function LoginPage({ setToken }) {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const token = await loginUser({
    //   username,
    //   password
    // });

    var token = ''
    console.log(username, password)
    // const user = "admin@gmail.com"
    // const pwd = "s;lerjs89#$%#"
    // if(username == user && password == pwd) token = "1234567890"
    // setToken(token)
    // console.log(token)

    token = await loginAPI(username, password)

    setToken(token)
    console.log(token)
  }

  return (
    <main className="login overflow-hidden w-full h-screen relative flex">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <div
          className="position-absolute top-4 start-50 translate-middle-x"
          style={{
            width: '40%',
            height: '12vh',
            backgroundColor: 'white',
            padding: '5px',
          }}
        >
          <h3 style={{ fontSize: '3rem', textAlign: 'center' }}>
            KAI Venture Partners
          </h3>
        </div>
        <div
          style={{
            width: '30%',
            height: '70vh',
            backgroundColor: 'white',
            padding: '5px',
          }}
        >
          <Container>
            <h3 style={{ fontSize: '3rem' }}>Please enter Your Credentials</h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Please enter your email and password</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{ marginTop: '5px' }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <h3 style={{ textAlign: 'center' }}>OR</h3>
              <Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Request access to your account</Form.Label>
                  <Form.Control type="text" placeholder="Name" />
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    style={{ marginTop: '5px' }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Request access to your account</Form.Label>
                  <Button
                    type="submit"
                    variant="outline-secondary"
                    style={{ width: '100%' }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline-secondary"
                    style={{ width: '100%', marginTop: '5px' }}
                  >
                    Request Access
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </main>
  )
}
