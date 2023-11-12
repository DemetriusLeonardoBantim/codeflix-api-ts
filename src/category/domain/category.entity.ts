import { EntityValidationError } from '../../shared/validators/validation.error'
import { Uuid } from '../../shared/domain/value-objects/uuid.vo'
import { CategoryValidatorFactory } from './category.validator'
import { Entity } from '../../shared/domain/entity'
import { ValueObject } from 'src/shared/domain/value-object'

export type CategoryConstructorProps = {
  category_id?: Uuid
  name: string
  description?: string | null
  is_active?: boolean
  created_at?: Date 
}

export type CategoryCreateCommand = {
  name: string
  description?: string | null
  is_active?: boolean
}

export class Category extends Entity {
  category_id: Uuid
  name: string
  description: string | null
  is_active: boolean
  created_at: Date

  constructor(props: CategoryConstructorProps){
    super();
    this.category_id = props.category_id ?? new Uuid()
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
    this.created_at = props.created_at ?? new Date()
  }

  get entity_id(): ValueObject {
    return this.category_id
  }

  static create(props: CategoryConstructorProps): Category {
    return new Category(props)
  }

  changeName(name: string): void {
    this.name = name
  }

  changeDescription(description: string): void {
    this.description = description
  }

  static validate(entity: Category){
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(entity)
    if(!isValid) {
      throw new EntityValidationError(validator.errors)
    }  
  }

  
  toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.category_id,
      is_active: this.is_active,
      created_at: this.created_at
    }
  }
}