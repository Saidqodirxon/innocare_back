const Categories = require("../categories/Categories");
const Certificates = require("./Certificates");
const allCertificatesService = async (query) => {
  try {
    const { q, page, limit, sort, is_visible, view, categoryId, all } =
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

    // If search query `q` exists, apply it to the fields you want to search
    if (q) {
      const regex = new RegExp(q, "i"); // "i" for case-insensitive search
      filter.$or = [
        { name_uz: { $regex: regex } },
        { description_uz: { $regex: regex } },
      ];
    }

    if (typeof is_visible !== "undefined" && is_visible !== "all") {
      filter.is_visible = is_visible === "true";
    }

    if (typeof view !== "undefined" && view !== "all") {
      filter.view = parseInt(view);
    }

    if (typeof categoryId !== "undefined" && categoryId !== "all") {
      filter.categoryId = categoryId;
    }

    let queryBuilder = Certificates.find(filter).sort(sortOptions).lean();

    if (!all) {
      queryBuilder = queryBuilder
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);
    }

    const certificates = await queryBuilder.exec();
    const totalCertificates = await Certificates.countDocuments(filter);

    return {
      certificates,
      total: totalCertificates,
      offset: all ? 0 : paginationOptions.skip,
      limit: all ? totalCertificates : paginationOptions.limit,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allCertificatesService;
