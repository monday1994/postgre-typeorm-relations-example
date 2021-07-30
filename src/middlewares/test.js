const _ = require('lodash');
const arr = [
  {
    value: undefined,
    msg: 'Invalid value',
    param: 'firstName',
    location: 'body'
  },
  {
    value: undefined,
    msg: 'Invalid value',
    param: 'firstName',
    location: 'body'
  },
  {
    value: 'Tomek.Mroz2gmail.com',
    msg: 'Invalid value',
    param: 'email',
    location: 'body'
  }
]
console.log('uniq = ', _.uniqBy(arr, 'param'))
