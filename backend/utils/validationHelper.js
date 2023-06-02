import {body, query} from "express-validator"

export function loginSanitizer(){
    return [
        body('email')
        .trim()
        .escape()
        .bail()
        .notEmpty()
        .isLength({min: 8, max: 30})
        .isEmail(),
        body('password')
        .trim()
        .escape()
        .bail()
        .notEmpty()
        .isLength({min: 8, max: 30})
    ]
}

export function uploadSanitizer(){   
    return [
        body('name')
        .trim()
        .escape()
        .notEmpty()
        .bail(),
        body('claims')
        .notEmpty(),
        query('option')
        .trim()
        .escape()
        .notEmpty()
        .bail()
    ]
}

export function fileAccessSanitizer(){
    return [
        body('file')
        .trim()
        .escape()
        .notEmpty()
        .bail(),
        query('option')
        .trim()
        .escape()
        .notEmpty()
        .bail()
    ]
}

export function configSanitizer(){
    return [
        body('options')
        .trim()
        .notEmpty()
        .escape()
        .bail()
    ]
}
