import { ValueObject } from 'src/shared/domain/value-object';
import { Entity } from '../../../domain/entity'
import { Uuid } from '../../../domain/value-objects/uuid.vo'
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid
  name: string
  price: number
}

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string
  price: number

  constructor(props: StubEntityConstructor){
    super()
    this.entity_id = props.entity_id || new Uuid()
    this.name = props.name
    this.price = props.price
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid > {
  getEntity(): new (...args: any[]) => any {
    return StubEntity
  }
}

describe(('InMemoryRepository Unit Test'), () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository()
  })

  test('Should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Teste',
      price: 100,
    })

    await repo.insert(entity)
    expect(repo.insert.length).toBe(1)
  })
})