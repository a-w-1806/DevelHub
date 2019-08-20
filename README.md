# DevelHub: A Social Network for Developers

<a href="https://develhub.herokuapp.com" target="_blank">https://develhub.herokuapp.com</a>

**Attention**: If you have trouble opening this web page, please refresh the page to try again since heroku apps hibernate if there is no traffic for a period of time.

The front end code is in the <a href="https://github.com/Yuchen-Wang-SH/DevelHub/tree/master/client" target="_blank">`/client`</a> folder. The back end code is in the <a href="https://github.com/Yuchen-Wang-SH/DevelHub/tree/master/server" target="_blank">`/server`</a> folder.

## Main Functionalities

- Register an account, and build your profile by adding basic information, experiences, educations, and social network links.
- See other users' profiles by accessing their own pages.
- Release or delete posts, like or dislike posts, and make your comments.

## Technologies

- A **RESTful** back end written in **Node.js**, using **Express**.
  - Store data in **MongoDB**, and connect to it using **Mongoose**.
  - User authentication using **JSON Web Tokens (JWT)**.
  - Encrypt passwords using **bcrypt.js** before storing.
- A front end UI written using **React**.
  - Manage the state of the whole application using **Redux**.
  - Get latest five repos of registered users through **GitHub API**.
- **Docker**
- **Travis CI**
- **Nginx** for routing to front end server or back end server.

## Back end routes

### /api/users

#### POST /api/users/register

```javascript
reqBody = { name, email, password, password2 };
// Success 200.
res.data = { name, email, password, avatar, date, _id };
// Failure 400. Each is a string with error information to display in front end.
res.data = { name, email, password, password2 };
```

#### POST /api/users/login

```javascript
reqBody = { email, password };
// Success 200.
res.data = { success: true, token };
// Failure 400.
res.data = { email, password };
```

#### GET /api/users/current

```javascript
// Send request with Authorization header filled with JWT
// Success 200.
res.data = { id, name, email };
```

### /api/profile

#### GET /api/profile

```javascript
// Send request with Authorization header filled with JWT
// Success 200.
res.data = {
  social: {},
  skills: [],
  user: { _id, name, avatar },
  handle,
  status,
  experience: [
    { current, _id, title, company, location, from, to, description }
  ],
  education: [
    { current, _id, school, degree, fieldofstudy, from, to, description }
  ],
  date
};
// Fail 404. Each is a string with error information.
res.data = { noprofile };
```

#### GET /api/profile/all

```javascript
// Success 200.
res.data = [profiles];
// Fail 404.
res.data = { profile: "There are no profiles" };
```

#### GET api/profile/handle/:handle

```javascript
// Success 200
res.data = profile;
// Fail 404. Each is a string with error information.
res.data = { noprofile };
```

#### GET api/profile/user/:user_id

```javascript
// Success 200
res.data = profile;
// Fail 404. Each is a string with error information.
res.data = { noprofile };
```

#### POST api/profile

```javascript
reqBody = {
  handle,
  status,
  skills: "",
  website,
  youtube,
  twitter,
  facebook,
  linkedin,
  instagram,
  location,
  bio,
  githubusername
};
// Success 200
res.data = profile;
// Fail 400.
res.data = { handle: "That handle already exists." };
```

#### POST api/profile/experience

```javascript
reqBody = { title, company, location, from, to, current, description };
// Success 200
res.data = profile;
```

#### POST api/profile/education

```javascript
reqBody = { school, degree, fieldofstudy, from, to, current, description };
// Success 200
res.data = profile;
```

#### DELETE api/profile/experience/:exp_id

```javascript
// Success 200
res.data = profile;
```

#### DELETE api/profile/education/:edu_id

```javascript
// Success 200
res.data = profile;
```

#### DELETE api/profile

```javascript
// Success 200
res.data = { success: true };
```

### /api/posts

#### GET api/posts

```javascript
// Success 200
res.data = [
  {
    text,
    name,
    avatar,
    user,
    likes: [{ user }],
    comments: [{ user, text, name, avatar, date }],
    date
  }
];
// Fail 404. Each is a string with error information.
res.data = { nopostsfound: "No posts found" };
```

#### GET api/posts/:id

```javascript
// Success 200
res.data = post;
// Fail 404. Each is a string with error information.
res.data = { nopostsfound: "No post found with that ID" };
```

#### POST api/posts

```javascript
reqBody = { text };
// Success 200.
res.data = post;
// Fail 400. Each is a string with error information.
res.data = { text };
```

#### DELETE api/posts/:id

```javascript
// Success 200.
res.data = { success: true };
// Fail 404.
res.data = { postnotfound: "No post found" };
// Fail 401.
res.data = { notauthorized: "User not authorized" };
```

#### POST api/posts/like/:id

```javascript
// Success 200.
res.data = post;
// Fail 404.
res.data = { postnotfound: "No post found" };
// Fail 400.
res.data = { alreadyliked: "User already liked this post" };
```

#### POST api/posts/unlike/:id

```javascript
// Success 200.
res.data = post;
// Fail 404.
res.data = { postnotfound: "No post found" };
// Fail 400.
res.data = { notliked: "You have not yet liked this post" };
```

#### POST api/posts/comment/:id

```javascript
reqBody = { text };
// Success 200.
res.data = post;
// Fail 404.
res.data = { postnotfound: "No post found" };
```

#### DELETE api/posts/comment/:id/:comment_id

```javascript
// Success 200.
res.data = post;
// Fail 404.
res.data = { postnotfound: "No post found" };
// Fail 404.
res.data = { commentnotexists: "Comment does not exist" };
```
