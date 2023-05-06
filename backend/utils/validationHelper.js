import {body} from "express-validator"

export function loginSanitizer (){
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

export function inputSanitizer(){   
    return [
        body('input')
        .trim()
        .escape()
        .bail()
        .notEmpty()
    ]
}
