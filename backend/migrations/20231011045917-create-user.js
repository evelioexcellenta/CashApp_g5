'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            UserID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // UserID: {
            //     type: Sequelize.INTEGER
            // },
            Fullname: {
                type: Sequelize.STRING
            },
            Username: {
                type: Sequelize.STRING
            },
            Email: {
                type: Sequelize.STRING
            },
            Password: {
                type: Sequelize.STRING
            },
            Role: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};