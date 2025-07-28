const Categories = require("../categories/Categories");
const Products = require("./Products");

const allProductsService = async (query) => {
  try {
    const { q, page, limit, sort, is_visible, is_view, categoryId, all } =
      query || {};

    const sortOptions = {};
    const paginationOptions = {};

    const itemsPerPage = parseInt(limit) || 10000;
    const currentPage = parseInt(page?.currentPage) || 1;
    const offset = parseInt(page?.offset) || 0;
    const requestedLimit = parseInt(page?.limit) || itemsPerPage;

    if (!all) {
      paginationOptions.skip = offset;
      paginationOptions.limit = requestedLimit;
    }

    if (sort && sort.by) {
      if (sort.by === "name_ru") {
        sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
      }
    }

    // 🔽 Query filter
    const filter = {};

    // 🔍 Search query
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name_uz: { $regex: regex } },
        { description_uz: { $regex: regex } },
      ];
    }

    // 👁 is_visible filter
    if (typeof is_visible !== "undefined" && is_visible !== "all") {
      filter.is_visible = is_visible === "true";
    }

    // 👁‍🗨 is_view filter: string "true", "false", "all"
    if (typeof is_view !== "undefined" && is_view !== "all") {
      if (is_view === "true") {
        filter.is_view = true;
      } else if (is_view === "false") {
        filter.is_view = false;
      }
    }

    // 📂 categoryId filter
    if (typeof categoryId !== "undefined" && categoryId !== "all") {
      filter.categoryId = categoryId;
    }

    let queryBuilder = Products.find(filter).sort(sortOptions).lean();

    if (!all) {
      queryBuilder = queryBuilder
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);
    }

    const products = await queryBuilder.exec();
    const totalProducts = await Products.countDocuments(filter);

    return {
      products,
      total: totalProducts,
      offset: all ? 0 : paginationOptions.skip,
      limit: all ? totalProducts : paginationOptions.limit,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allProductsService;
