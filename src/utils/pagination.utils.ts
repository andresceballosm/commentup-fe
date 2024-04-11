export type Isentiment = {
  id: string;
  timestamp: string;
};

export const paginate = (items: Isentiment[], page = 1, perPage = 10) => {
  const offset = perPage * (page - 1);
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * page);

  return {
    previousPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages,
    items: paginatedItems,
  };
};
