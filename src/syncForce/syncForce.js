import connection from "../connection/connection.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import ProductImage from "../models/ProductImage.js";
import ProductOption from "../models/ProductOption.js";
import User from "../models/User.js";

connection.sync({ force: true });
