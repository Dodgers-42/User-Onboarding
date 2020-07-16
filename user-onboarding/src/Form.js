import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from "axios";

export default function Form() {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        terms: "",
        password: "",
        submitButtom: ""
      });
    
      
      const [errors, setErrors] = useState({
          name: "",
          email: "",
          terms: "",
          password: "",
          submitButtom: ""
      });

      const formSchema = yup.object().shape({
        name: yup.string().required("Name is required."),
        email: yup.string()
          .email("Must be a valid email address.")
          .required("Must include email address."),
        terms: yup.boolean().oneOf([true], "please agree to terms of use"),
        password: yup.string().required("Password needed").min(10,"Password must be 10 characters"),
      });
      
      const validateChange = e => {
        e.persist();

          yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {setErrors({...errors,[e.target.name]: ""});})
            .catch(err => {setErrors({...errors,[e.target.name]: err.errors[0]});});
        };
      
      useEffect(() => {
      formSchema.isValid(user).then(valid => {setButtonDisabled(!valid);
      });
    }, [formSchema, user]);
  
    const handleChange = e => {
          const targetValue = 
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setUser({
                ...user,
                [event.target.name]: targetValue
            });
            validateChange(event);
          }
      
        
    // const initialState = {
    //     name: '',
    //     email: '',
    //     password: '',
    //     terms: '',
    //     submitButtom: '',
    // }


    const [user, setUser] = useState([]);

    const [post, setPost] = useState([]);

    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    
    const formSubmit = e => {
      e.preventDefault();
      axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
          setPost(res.data); // get just the form data from the REST api
        //   console.log("success", post);
          // reset form if successful
          setFormState({
            name: "",
            email: "",
            terms: "",
            password: "",
            submitButtom: ""
          });
        })
        .catch(err => console.log(err.response));
    };
  
    return (
      <form onSubmit={formSubmit}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
        </label>
        <label htmlFor='email'>
          Email
          <input
            type='text'
            name='email'
            value={formState.email}
            onChange={inputChange}
          />
          {errors.email.length > 0 ? (
            <p className='error'>{errors.email}</p>
          ) : null}
        </label>
        <label htmlFor='submitButtom'>
          Why would you like to help?
          <textarea
            name='submitButtom'
            value={formState.motivation}
            onChange={inputChange}
          />
          {errors.submitButtom.length > 0 ? (
            <p className='error'>{errors.submitButtom}</p>
          ) : null}
        </label>
        <label htmlFor='password'>
          What would you like to help with?
          <select id='positions' name='positions' onChange={inputChange}>
            <option value='Newsletter'>Newsletter</option>
            <option value='Yard Work'>Yard Work</option>
            <option value='Administrative Work'>Administrative Work</option>
            <option value='Tabling'>Tabling</option>
          </select>
        </label>
        <label htmlFor='terms' className='terms'>
          <input
            type='checkbox'
            name='terms'
            checked={formState.terms}
            onChange={inputChange}
          />
          Terms & Conditions
        </label>
        displaying our post request data
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    );
  }
  


    // export default Form;