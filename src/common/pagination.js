module.exports = async (model, query, page, limit, delta = 2) => {
  const pages = [];
  const totalRows = await model.find(query).countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  const left = page - delta;
  const right = page + delta;
  const prev = page - 1;
  const hasPrev = page > 1 ? true : false;
  const next = page + 1;
  const hasNext = page < totalPages ? true : false;
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      i === page ||
      (i >= left && i <= right)
    ) {
      pages.push(i);
    } else if (i === left - 1 || i === right + 1) {
      pages.push("...");
    }
  }
  return { pages, prev, hasPrev, next, hasNext };
};
