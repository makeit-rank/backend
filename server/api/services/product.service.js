import Product from "../../models/Product";
import Review from "../../models/Review";
import Seller from "../../models/Seller";
import User from "../../models/User";
import authService from "./auth.service";
class ProductServices {
  async createProduct(user_id, product) {
    const seller = await Seller.findOne({ user_id: user_id });
    let search_key = "";
    const length = product.specification ? product.specification.length : 0;
    for (let i = 0; i < length; i++) {
      search_key +=
        product.specification[i].name +
        " " +
        product.specification[i].value +
        " ";
    }
    search_key += product.title;

    const newProduct = await Product.create({
      title: product.title,
      price: product.price,
      specification: product.specification,
      various_size: product.various_size,
      requiredAttachments: product.requiredAttachments
        ? product.requiredAttachments
        : null,
      images: product.images,
      user_id: user_id,
      shop_name: seller.shop_name,
      search_key: search_key,
    });

    seller.products
      ? seller.products.push(newProduct._id)
      : (seller.products = [newProduct._id]);

    await seller.save();
    return newProduct;
  }
  async addReview(uid, body) {
    const user = await User.findById(uid);
    const review = await Review.create({
      name: user.name,
      product_id: body.product_id,
      star: body.star,
      description: body.description,
      timestamp: new Date().getTime(),
    });
    const product = await Product.findById(body.product_id);
    const count = product?.count ? product.count : 0;
    const star = product?.star ? product.star : 0;
    const newStar = (star * count + body.star) / (count + 1);

    await Product.findByIdAndUpdate(body.product_id, {
      star: newStar.toFixed(2),
      count: count + 1,
    });
    return review._id;
  }
  async getProductById(id) {
    const product = await Product.findById(id);
    const reviewsOfProduct = await Review.find({ product_id: id });

    try {
      return { ...product["_doc"], reviews: { ...reviewsOfProduct } };
    } catch (err) {
      return { message: "Product not found" };
    }
  }
  async getTopPicks(limit) {
    const products = await Product.find({
      star: { $gt: 0 },
    })
      .sort({ star: -1 })
      .limit(parseInt(limit));
    return products;
  }
  async getProductSellerid(uid) {
    const seller = await Seller.findOne({ user_id: uid });
    const products = [];
    if (seller) {
      for (let i = 0; i < seller.products.length; i++) {
        const product = await Product.findById(seller.products[i]);
        if (product) products.push(product);
      }
      return products;
    }
    return { message: "No user found" };
  }
  async searchProduct(keyword) {
    if (keyword.length < 2) return [];
    const keys = keyword.split(" ");
    let top = 0;
    let picks = 0;
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "top") top = 1;
      else if (keys[i] === "pick" || keys[i] === "picks") picks = 1;
      else if (
        keys[i] === "toppicks" ||
        keys[i] === "top-picks" ||
        keys[i] === "top-pick"
      ) {
        (top = 1), (picks = 1);
      }
    }
    if (top && picks) {
      return this.getTopPicks(10);
    } else if (top) {
      const products = await Product.aggregate([
        {
          $search: {
            index: "Search index",
            autocomplete: {
              query: keyword,
              path: "search_key",
            },
          },
        },
      ])
        .sort({ star: -1 })
        .limit(10);
      return products;
    } else {
      const products = await Product.aggregate([
        {
          $search: {
            index: "Search index",
            autocomplete: {
              query: keyword,
              path: "search_key",
            },
          },
        },
      ]);
      return products;
    }
  }
}

export default new ProductServices();
