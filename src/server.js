import { createServer, Model, Factory, Response } from "miragejs";
import { faker } from '@faker-js/faker';

faker.setLocale('zh_CN');

const initialReactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};
const createReactions = () => {
  const reactions = {};
  const fakerDatatypeNumber = (option = {}) => faker.datatype.number(option);
  ['thumbsUp', 'hooray', 'heart', 'rocket', 'eyes'].forEach((name) => {
    reactions[name] = () => fakerDatatypeNumber()
  });
  return reactions;
}

export default function server({ environment = "test" }) {
  return createServer({
    environment,
    models: {
      posts: Model,
      users: Model,
    },
    routes() {
      this.namespace = "api"

      this.get("/movies", () => ({
        movies: [
          { id: 1, name: "Inception", year: 2010 },
          { id: 2, name: "Interstellar", year: 2014 },
          { id: 3, name: "Dunkirk", year: 2017 },
        ]
      }))

      this.get("/posts", (schema, request) => schema.posts.all(),
        // { timing: 3000 }
      )
      // 上面的简写
      // this.get("/movies");
      this.get("/users");

      this.post("/posts", (schema, request) => {
        const { post } = JSON.parse(request.requestBody);
        const { title, content, userId } = post;
        if (title && content && userId) {
          // 根据request body params 创建一条新的post 并添加到post model数据中
          // models中的 property 会自动添加一个s post->posts user->users 最好显示添加s
          return schema.posts.create({ ...post, date: new Date().toISOString(), reactions: {...initialReactions}});
        }
          return new Response(400,{ some: 'header' },{ errors: 'request body 数据不完整' });

      }, { timing: 5000 });
    },
    factories: {
      post: Factory.extend({
        title() {
          return faker.lorem.sentence();
        },
        content() {
          return faker.lorem.paragraphs();
        },
        date() {
          return faker.date.past();
        },
        userId() {
          return  faker.datatype.number({ min: 0, max: 2 }).toString()
        },
        reactions: {
          ...createReactions(),
        },
      }),
      user: Factory.extend({
        name: faker.name.firstName
      })
    },
    // eslint-disable-next-line no-shadow
    seeds(server) {
      console.log(server, 'server');
      // 生成单条数据
      // server.create('post', initialPost);
      // 生成多条数据
      server.createList('post', 10);
      server.createList('user', 3);
      // server.db.dump()
    },

  })
}



