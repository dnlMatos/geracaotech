import connection from "../connection/connection.js";
import "../models/User.js";
import "../models/Category.js";
import "../models/Product.js";
import "../models/ProductCategory.js";
import "../models/ProductImage.js";
import "../models/ProductOption.js";

connection.sync({ force: true });
