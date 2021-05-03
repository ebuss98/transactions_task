'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Transactions', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING
        },
        from_address: {
          allowNull: false,
          type: Sequelize.STRING
        },
        to_address: {
          allowNull: false,
          type: Sequelize.STRING
        },
        value: {
          allowNull: false,
          type: Sequelize.FLOAT
        },
        block_number: {
          allowNull: false,
          type: Sequelize.INTEGER
        }
      }, {
        transaction: t
      });
      await queryInterface.addIndex('Transactions', ['from_address', 'to_address', 'block_number'], {transaction: t});
      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};