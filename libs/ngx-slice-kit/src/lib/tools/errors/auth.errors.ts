export const AUTH_ERRORS = {
    'login': {
        1: {
            control: 'password',
            value: 'Wrong password'
        },
        303: {
            control: 'password',
            value: 'Empty password'
        },
        302: {
            control: 'email',
            value: 'Empty email'
        },
        6: {
            control: 'email',
            value: 'Specified credentials do not exists on server'
        },
        5: {
            control: 'email',
            value: 'Account is not activated. Check your email address'
        },
        404: {
            control: 'email',
            value: 'Specified credentials do not exists on server'
        },
    },
    'register': {
        300: {
            control: 'terms',
            value: 'You must accept Terms of usage (after you read it, for sure)'
        },
        301: {
            control: 'name',
            value: 'Empty name'
        },
        302: {
            control: 'email',
            value: 'Empty email'
        },
        303: {
            control: 'email',
            value: 'Empty email'
        },
        304: {
            control: 'password',
            value: 'Empty email'
        },
        305: {
            control: 'email',
            value: 'Invalid email format'
        },
        18: {
            control: 'email',
            value: 'User with specified email already exists'
        },
        19: {
            control: 'shortlink',
            value: 'User with specified username already exists'
        }
    },
    'register-confirm': {
    },
    'password-reset': {
        302: {
            control: 'email',
            value: 'Empty email'
        },
        404: {
            control: 'email',
            value: 'Specified email does not exists on server'
        }
    },
    'password-recovery': {
        301: {
            control: 'password',
            value: 'Empty or weak password (min 6 symbols length)'
        },
        302: {
            control: 'confirmPassword',
            value: 'Empty confirm password'
        },
        303: {
            control: 'confirmPassword',
            value: 'Confirmation password not equals to its origin'
        }
    },
    'invite': {
    },
};
