import { ValueObject } from "../domain/value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly props2: number) {
    super()
  }
}

describe("ValueObject Unit Tests" , () => {

  test("Should be equals", () => {
    const valueObject1 = new StringValueObject('teste')
    const valueObject2 = new StringValueObject('teste')
    expect(valueObject1.equals(valueObject2)).toBe(true)
  })

  test("Should be diferent", () => {
    const valueObject1 = new ComplexValueObject('teste', 1)
    const valueObject2 = new ComplexValueObject('test', 1)
    expect(valueObject1.equals(valueObject2)).toBe(false)
  })

})