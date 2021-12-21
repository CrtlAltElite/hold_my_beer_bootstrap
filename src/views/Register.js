import React, {useState, useEffect} from "react";
import beer from "../images/beer-unsplash.jpg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {usePostUser} from "../api/apiUser"
import {Navigate} from 'react-router-dom';
const FormFieldElement = (props)=>(
  <div className="col-md-6 standardized">
  <div className="form-group">
    {props.children}
  </div>
</div>
)
const FormFieldButton = (props)=>(<div className="row">
<div className="col-md-12 standardized">
  <div className="form-group">
    {props.children}
  </div>
</div>
</div>)

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid e-mail format")
    .required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string().test('passwords-match', 'Passwords must match', function(value){
      return this.parent.password === value
    }),
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required")
});

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  name:"",
  location:''
};

const styles = {
  error: { color: "red" },
};


const Register = () => {
  const [userInfo, setUserInfo]=useState({})
  const register = usePostUser(userInfo)

  const handleSubmit = (values)=>{  
    setUserInfo(values)
  }

  if (register?.response_code===200) return <Navigate to='/login'/>
  return (
    <section className="h-100 h-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <img
                src={beer}
                alt="beer"
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-4">Register</h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={FormSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ errors, touched }) => (  
                    <Form>
                      <div className="row">
                        <FormFieldElement>
                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                          />
                          {errors.name && touched.name ? (
                            <div style={styles.error}>{errors.name}</div>
                            ) : null}
                        </FormFieldElement>
                        <FormFieldElement>
                          <Field
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Location"
                          />
                          {errors.location && touched.location ? (
                            <div style={styles.error}>{errors.location}</div>
                            ) : null}
                        </FormFieldElement>
                      </div>
                      <div style={{ marginTop: 15 }} className="row">
    

                        <FormFieldElement>
                          <Field
                            type="e-mail"
                            name="email"
                            className="form-control"
                            placeholder="E-mail"
                          />
                          {errors.email && touched.email ? (
                            <div style={styles.error}>{errors.email}</div>
                            ) : null}
                        </FormFieldElement>
      
                      </div>

                      <div style={{ marginTop: 15 }} className="row">
                        <FormFieldElement>
                          <>
                          <Field
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                          />
                          {errors.password && touched.password ? (
                            <div style={styles.error}>{errors.password}</div>
                            ) : null}
                          </> 
                        </FormFieldElement>

                        <FormFieldElement>
                          <Field
                            type="password"
                            name="passwordConfirmation"
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                          {errors.passwordConfirmation && touched.passwordConfirmation ? (
                            <div style={styles.error}>{errors.passwordConfirmation}</div>
                            ) : null}
                        </FormFieldElement>
                      </div>

                      <FormFieldButton>
                        <button
                          style={{ marginTop: 15 }}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Register
                        </button>
                      </FormFieldButton>

                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
