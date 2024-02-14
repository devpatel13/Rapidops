// Hello World

// 1.
// alert("I'm JavaScript");

// practice

// Promise Error Handling

// 1. What do you think? Will the .catch trigger? Explain your answer.

// new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     throw new Error("Whoops!");
//   }, 1000);
// }).catch(alert);

// here the error is NOT handled as it is not generated While the synchronous
// execution of the promise, but afterwards by setTimeout.

// Async/Await

// 1. Rewrite this example code from the chapter Promises chaining using async/await
// instead of .then/catch:

// function loadJson(url) {
//   return fetch(url).then((response) => {
//     if (response.status == 200) {
//       return response.json();
//     } else {
//       throw new Error(response.status);
//     }
//   });
// }

// 2. Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.

// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = "HttpError";
//     this.response = response;
//   }
// }

// async function loadJson(url) {
//   let response = await fetch(url);
//   if (response.status == 200) {
//     let json = await response.json();
//     return json;
//   } else throw new HttpError(response);
// }

// // Ask for a user name until github returns a valid user
// async function demoGithubUser() {
//   let user;
//   while (true) {
//     let name = prompt("Enter a name?", "iliakan");
//     try {
//       user = await loadJson(`https://api.github.com/users/${name}`);
//       break;
//     } catch (err) {
//       if (err instanceof HttpError && err.response.status == 404) {
//         alert("No such user, please reenter");
//       } else throw err;
//     }
//   }
//   alert(`Full name: ${user.name}.`);
//   return user;
// }

// demoGithubUser();

// 3. We have a “regular” function called f. How can you call the async
// function wait() and use its result inside of f?

// async function wait() {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return 10;
// }

// function f() {
//   wait().then((resolve) => alert(resolve));
// }
// f(); 
