export type CategoryConstructorProps = {
  category_id: string
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

export class Category {
  category_id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: Date

  constructor(props: CategoryConstructorProps){
    this.category_id = props.category_id
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
    this.created_at = props.created_at ?? new Date()
  }

  // factory method
  static create(props: CategoryConstructorProps): Category {
    return new Category(props)
  }

  changeName(name: string): void {
    this.name = name
  }

  changeDescription(description: string): void {
    this.description = description
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