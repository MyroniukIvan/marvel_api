import React from 'react';
import {Formik} from 'formik';
import useMarvelService from "../../services/UseMarvelService";


export default function SearchCharacter() {
    const {getCharacterByName} = useMarvelService();

    return (
        <div>
        <Formik
            initialValues={{email: '', password: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                  values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, /* and other goodies */
              }) => (
                  <form className={'char__form'}
                           onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button className={"button button__long button__main "} type="submit" style={{'display': 'block'}}
                        disabled={isSubmitting}>
                    <div className="inner">Submit</div>
                </button>
            </form>)}
        </Formik>
    </div>);
}