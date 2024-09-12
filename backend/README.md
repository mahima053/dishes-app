# Backend API for Dishes App

## How to run

1. Install dependencies
```bash
npm install
```

2. Run the server
```bash
npm run dev
```

## References
- Express.js - https://expressjs.com/ - For building the API, including express generator.
- i18next - https://www.npmjs.com/package/i18next - For internationalization and localization. Still need to integrate it.
- OpenApi Specification integration - https://bump.sh/blog/express-api-openapi - Pending
- Clean Architecture - https://blog.tkssharma.com/blog/build-clean-apis-with-nodejs-typescript/ https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3 https://celepbeyza.medium.com/introduction-to-clean-architecture-acf25ffe0310


## Learnings
- Learnt about internationalization and localization using i18next. This was the first time I was using it.
- Learnt from various sources about clean architecture. I had heard it before but never implemented it from scratch. I have tried to implement it in this project. Still need to learn few more concepts like Dependency Injection, etc.
- Learnt about few command line tools like cross-env, to setup environment variables in a cross-platform way.

## Pending
- Implementing OpenApi Specification integration. It would be great to have API documentation generated automatically. This would ease the process of API documentation.
- Implementing i18next for internationalization and localization. This would help in making the app multilingual.
- Although implemented clean architecture, still need to learn more about it. As the clear distinction of what code goes to Service vs Repository. Found this, bit blurry. But understood that data opeartions should be in Repository and business logic should be in Service.