class Pagination {
  apply(service) {
    if (!service.model) {
      throw new Error('Model is required for pagination')
    }

    service.pagination = async function (page = 1, limit = 20, conditions) {
      limit = limit < 1 ? 20 : Math.min(limit, 500)
      const offset = (page - 1) * limit

      const rows = await service.model.findAll(limit, offset, conditions)
      const total = await service.model.count(conditions)

      const pagination = {
        current_page: page,
        total,
        per_page: limit,
        from: rows.length > 0 ? offset + 1 : null,
        to: rows.length > 0 ? rows.length : null,
      }

      return {
        rows,
        pagination,
      }
    }
  }
}

module.exports = new Pagination()
