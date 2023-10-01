const yup = require('yup')

const formSchema = yup.object({
    username: yup
        .string()
        .required('Username is Required')
        .min(6, 'Username too Short')
        .max(20, 'Username too Long'),
    password: yup
        .string()
        .required('Password is Required')
        .min(6, 'Password too Short')
        .max(20, 'Password too Long'),
})

function validateForm(req, res, next) {
    const formData = req.body

    // Validate the form data against the schema
    formSchema
        .validate(formData)
        .catch((err) => {
            // Data is invalid, send an error response with details
            res.status(400).json({ errors: err.errors })
            console.error(err)
        })
        .then((valid) => {
            if (valid) {
                // Data is valid, you can perform further actions here
                console.log('Data is good')
                next()
            }
        })
}

module.exports = validateForm
