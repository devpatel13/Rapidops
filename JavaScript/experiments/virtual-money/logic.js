const users = [];

function handleRequest(req) {
  console.log(req);
  let response;
  if (req.type === "create") response = createUser(req.name);
  return response;
}

function createUser(name) {
  if (users.find((user) => user.name === name) === undefined) {
    users.push({ name });
    return {
      message: `user ${name} created`,
      status: 201,
    };
  } else
    return {
      message: "Username already exist!",
      status: 500,
    };
}

module.exports = handleRequest;
