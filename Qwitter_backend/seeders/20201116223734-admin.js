'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 0,
      username: 'admin',
      password: '$2b$10$04vdbAVtV1iifc2cxbS96Oa4EFiz1ML6EgBsru9Q6Aa6w4u9y7yrK',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};