import { models } from 'stf-core';
import validator from 'validator';

export const validateLogin = (values, translate) => {
  const errors = { username: undefined, password: undefined };
  const requiredMessage = translate('ra.validation.required');

  if (!values.username) {
    errors.username = requiredMessage;
  }
  if (!values[models.players.fields.password]) {
    errors.password = requiredMessage;
  }
  return errors;
};

export const validateRegistration = (values, translate) => {
  const errors = { username: undefined, password: undefined };
  const requiredMessage = translate('ra.validation.required');

  if (!values[models.players.fields.firstName]) {
    errors[models.players.fields.firstName] = requiredMessage;
  }

  if (!values[models.players.fields.lastName]) {
    errors[models.players.fields.lastName] = requiredMessage;
  }

  if (!values[models.players.fields.email]) {
    errors[models.players.fields.email] = requiredMessage;
  } else if (!validator.isEmail(values[models.players.fields.email])) {
    errors[models.players.fields.email] = 'Incorrect email';
  }

  if (!values[models.players.fields.password]) {
    errors[models.players.fields.password] = requiredMessage;
  } else if (values[models.players.fields.password].length < 6) {
    errors[models.players.fields.password] = 'Password must contain at least 6 characters';
  } else if (values[models.players.fields.password] !== values.repeatPassword) {
    errors.repeatPassword = 'Password must be the same as above';
  }

  return errors;
};

export const validatePasswordReset = (values, translate) => {
  const errors = { username: undefined, password: undefined };

  if (!values[models.players.fields.email]) {
    errors[models.players.fields.email] = translate('ra.validation.required');
  } else if (!validator.isEmail(values[models.players.fields.email])) {
    errors[models.players.fields.email] = 'Incorrect email';
  }

  return errors;
};

export const validatePasswordRecovery = (values, translate) => {
  const errors = {};

  if (!values[models.players.fields.password]) {
    errors[models.players.fields.password] = translate('ra.validation.required');
  } else if (values[models.players.fields.password].length < 6) {
    errors[models.players.fields.password] = 'Password must contain at least 6 characters';
  } else if (values[models.players.fields.password] !== values.repeatPassword) {
    errors.repeatPassword = 'Password must be the same as above';
  }

  return errors;
};
