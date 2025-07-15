const express = require("express");
const cors = require("cors");
const db = require("./src/db");
const config = require("./src/shared/config");
const handleError = require("./src/shared/errors/handle");
//
const UserRoute = require("./src/modules/users/_api");
const AdventagesRoute = require("./src/modules/adventages/_api");
const ProductsRoute = require("./src/modules/products/_api");
const CategoriesRoute = require("./src/modules/categories/_api");
const BrandsRoute = require("./src/modules/brands/_api");
const AboutsRoute = require("./src/modules/about/_api");
const NewsRoute = require("./src/modules/news/_api");
const PartnersRoute = require("./src/modules/partners/_api");
const CertificatesRoute = require("./src/modules/certificates/_api");
const ContactsRoute = require("./src/modules/contacts/_api");
const BannersRoute = require("./src/modules/banners/_api");
const Uploader = require("./src/modules/upload");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use("/public", express.static("public"));

app.use(ContactsRoute);
app.use(UserRoute);
app.use(Uploader);
app.use(AdventagesRoute);
app.use(CategoriesRoute);
app.use(ProductsRoute);
app.use(BrandsRoute);
app.use(AboutsRoute);
app.use(NewsRoute);
app.use(PartnersRoute);
app.use(BannersRoute);
app.use(CertificatesRoute);

app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
