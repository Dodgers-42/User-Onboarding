import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from "axios";


const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    terms: yup.boolean().oneOf([true], "please agree to terms of use"),
    password: yup.string().required("Password needed").min(10,"Password /// must be 10 characters"),
    // submitButtom:yup.string().required("")
  });

export default function Form() {
    // const [user, setUser] = useState();
    const [post, setPost] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

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


      
    const validateChange = e => {
        e.persist();

          yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {setErrors({...errors,[e.target.name]: ""});})
            .catch(err => {setErrors({...errors,[e.target.name]: err.errors[0]});});
        };
      
      useEffect(() => {
      formSchema.isValid(formState).then(valid => {setButtonDisabled(!valid);
      });
    }, [formSchema]);
  
    const inputChange = e => {
        // const targetValue = 
        const newFormData = {
            ...formState,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
            
            validateChange(e);
            setFormState(newFormData);
            
          }
      
        
    // const initialState = {
    //     name: '',
    //     email: '',
    //     password: '',
    //     terms: '',
    //     submitButtom: '',
    // }


    
    const formSubmit = e => {
      e.preventDefault();
      axios
        .post("https://reqres.in/api/users", formState)
        .then(res => {
          setPost(res.data); 
        //   console.log("success", post);
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
  console.log(errors)
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
            value={formState.submitButtom}
            onChange={inputChange}
          />
          {errors.submitButtom.length > 0 ? (
            <p className='error'>{errors.submitButtom}</p>
          ) : null}
        </label>
        <label htmlFor='password'>
            Password
        {/* <label htmlFor='pwd' className='password'> */}
             <input 
                type="password" 
                id="pwd" 
                name="pwd"
                value={formState.password}
                onChange={inputChange}
            />
            {errors.password.length > 0 ? (
            <p className='error'>{errors.password}</p>
          ) : null}
        </label>
        {/* //    What would you like to help with? 
        //    <select id='password' name='password' onChange={inputChange}>
        //     <option value='Newsletter'>Newsletter</option>
        //     <option value='Yard Work'>Yard Work</option>
        //     <option value='Administrative Work'>Administrative Work</option>
        //     <option value='Tabling'>Tabling</option>
        //   </select>  */}
        
         <label htmlFor='terms' className='terms'>
          <input
            type='checkbox'
            name='terms'
            checked={formState.terms}
            onChange={inputChange}
          />
           {errors.terms.length > 0 ? (
            <p className='error'>{errors.checkbox}</p>
          ) : null}

          Terms & Conditions
        </label> 
        //  displaying our post request data 
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button type='submit'>Submit</button>
      </form>
           
    );
  }
  


    