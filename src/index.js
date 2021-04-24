import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import models, {sequelize} from "../models";

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* custom middleware which sets a param me as the user */
app.use((req, res, next) => {
	req.context = {
		models,
		me: models.users[1],
	};
	next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/", routes.root);

const eraseDatabaseOnSync = true;
sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
	if (eraseDatabaseOnSync) {
		createUsersWithMessages();
	}
	app.listen(port, () => {
		console.log("Express App listening at Port:", port);
	});
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
 
  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
