import mongoose from "mongoose";

const GenerateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const ProductSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
      default: null,
      validate: {
        validator: function (s) {
          return s <= this.price;
        },
        message: "Discounted Price cannot exceed Original Price",
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

ProductSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = GenerateSlug(this.name);
  }
  next();
});

ProductSchema.pre("insertMany", function (next, docs) {
  docs.forEach((doc) => {
    if (doc.name) {
      doc.slug = GenerateSlug(doc.name);
    }
  });
  next();
});

const productModel = mongoose.model("products", ProductSchema);

export default productModel;
