import Form from '../models/form-model.js'

const formValidationSchema = {
  title: {
    in: ['body'],
    exists: {
      errorMessage: 'Form title is required'
    },
    notEmpty: {
      errorMessage: 'Form title cannot be empty'
    },
    custom: {
      options: async function (value) {
        const form = await Form.findOne({ title: value.toLowerCase() })
        if (!form) {
          return true
        }
        throw new Error('Form title already exists, try a different one')
      }
    }
  },

  'inputs': {
    in: ['body'],
    isArray: {
      errorMessage: 'Inputs must be an array'
    },
    notEmpty: {
      errorMessage: 'At least one input field is required'
    }
  },

  'inputs.*.type': {
    in: ['body'],
    exists: {
      errorMessage: 'Input type is required'
    },
    notEmpty: {
      errorMessage: 'Input type cannot be empty'
    },
    isIn: {
      options: [['text', 'number', 'email', 'password', 'textarea']],
      errorMessage: 'Invalid input type'
    }
  },

  'inputs.*.label': {
    in: ['body'],
    exists: {
      errorMessage: 'Input label is required'
    },
    notEmpty: {
      errorMessage: 'Input label cannot be empty'
    }
  },

  'inputs.*.placeholder': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Placeholder must be a string'
    }
  }
}

export default formValidationSchema
