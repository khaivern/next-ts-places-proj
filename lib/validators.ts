const VALIDATE_REQUIRE_TYPE = 'required'
const VALIDATE_MIN_LENGTH_TYPE = 'min'

export const VALIDATE_REQUIRE = () => ({type: VALIDATE_REQUIRE_TYPE});
export const VALIDATE_MIN_LENGTH = (val:number) => ({type: VALIDATE_MIN_LENGTH_TYPE, val: val})

type Value = string;

export type Validator = {
  type: string,
  val? : number
}

export const validate = (value: Value, validators: Validator[])=> {
  let isValid = true;
  for(const validator of validators) {

    if(validator.type === VALIDATE_REQUIRE_TYPE) {
      isValid = isValid && value.trim().length !== 0;
    }

    if(validator.type === VALIDATE_MIN_LENGTH_TYPE) {
      isValid = isValid && value.trim().length >= validator.val!
    }
  }
  return isValid
}