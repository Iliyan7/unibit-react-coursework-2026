import { useState } from 'react'

export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name] && validate) {
      setErrors(prev => ({ ...prev, ...validate({ ...values, [name]: value }) }))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    if (validate) {
      setErrors(prev => ({ ...prev, ...validate(values) }))
    }
  }

  function resetForm() {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  function isValid() {
    if (!validate) return true
    const errs = validate(values)
    setErrors(errs)
    setTouched(Object.keys(initialValues).reduce((acc, k) => ({ ...acc, [k]: true }), {}))
    return Object.keys(errs).length === 0
  }

  return { values, errors, touched, handleChange, handleBlur, resetForm, isValid }
}
