const MAX_USER_NUMBER = 1000;

module.exports = {
    "/": {
        home: "page"
    },
    "/users": function () {
        let users = [];

        for (let i = 0; i < MAX_USER_NUMBER; i++)
            users.push({
                id: Math.floor(Math.random() * Math.floor(MAX_USER_NUMBER)),
                name: `user_${i}`
            });

        return users;
    },
    "/users/active_count": 100,
    "/users/current/name": "Current User",
    "/users/:id": function (params) {
        return `The user id is ${params.id}`;
    },
}