export class AppError {
    control?: string;
    value?: string;
    route?: string;
    code?: number;
}

export const CONTROL_ERRORS = {
    required: 'This field is required',
    requiredTrue: 'Need confirm',
    email: 'Email is not valid',
    minlength: 'Too short',
    pattern: 'Invalid value',
    min: 'Not enough symbols'
};

