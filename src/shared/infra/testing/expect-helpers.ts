import { ClassValidatorFields } from '../../../shared/validators/class-validator-fields'
import { FieldsErrors } from '../../validators/validator-fields-interface'

type Expected = | 
{
  validator: ClassValidatorFields<any>; data: any
}
| (() => any)


expect.extend({
  containsErrorMessage(expected: any, received: FieldsErrors) {}
})