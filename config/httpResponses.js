module.exports = {
  okPaginated: (pagination, data) => ({ status: 200, data: { pagination, data } }),
  ok: (data) => ({ status: 200, data: { data } }),
  created: (data) => ({ status: 201, data: { data } }),
  noContent: () => ({ status: 204 }),
  notFound: () => ({ status: 404, data: { code: 'NOT_FOUND' } })
}
