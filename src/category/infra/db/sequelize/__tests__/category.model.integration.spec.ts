import { Sequelize } from "sequelize"
import { CategoryModel } from "../category.model"
import sequelize from "sequelize";

describe('Category Integration Tests', () => {
  test('Should create a category', async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
    });

    await sequelize.sync({
      force: true
    })


  })
})    