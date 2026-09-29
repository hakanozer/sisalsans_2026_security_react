import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import { apiConfig } from '../services/apiConfig'

interface RegisterFormValues {
  name: string
  email: string
  password: string
}

const registerSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
})

function Register() {

  const navigate = useNavigate()

  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: ''
  }

  const sendRegister = async (values: RegisterFormValues) => {
    console.log('Register form values:', values)
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-4"></div>

        <div className="col-sm-4">

          <h2>User Register</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={sendRegister}
          >

            {({ isSubmitting }) => (

              <Form>

                <div className="mb-3">

                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger mt-1"
                  />

                </div>

                <div className="mb-3">

                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="E-Mail"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-1"
                  />

                </div>

                <div className="mb-3">

                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger mt-1"
                  />

                </div>

                <div className="d-flex justify-content-between">

                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>

                  <NavLink
                    to="/"
                    className="btn btn-danger"
                  >
                    Login
                  </NavLink>

                </div>

              </Form>

            )}

          </Formik>

        </div>

        <div className="col-sm-4"></div>
      </div>

      <ToastContainer />
    </>
  )
}
export default Register
