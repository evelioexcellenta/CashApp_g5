'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            OrderID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // OrderID: {
            //     type: Sequelize.INTEGER
            // },
            Recipient_Name: {
                type: Sequelize.STRING
            },
            Total_Price: {
                type: Sequelize.INTEGER
            },
            Order_Date: {
                type: Sequelize.DATE
            },
            CartID: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Orders');
    }
};