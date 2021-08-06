module.exports = (sequelize, Sequelize) => {

    const UserRegister = sequelize.define("UserRegister", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return UserRegister;

};