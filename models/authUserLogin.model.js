module.exports = (sequelize, Sequelize) => {

    const UserLogin = sequelize.define("UserLogin", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false
    });
    return UserLogin;

};