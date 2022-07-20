import template from './form-field.hbs';
import './form-field.css';

// const html = template({name: 'test', label: 'Name', error: true, errorText: 'Error', type: 'password'});

export default ({name, label, error, errorText, type}) => template({name, label, error, errorText, type});