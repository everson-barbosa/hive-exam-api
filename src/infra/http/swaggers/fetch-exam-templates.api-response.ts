export const FETCH_EXAM_TEMPLATES_SWAGGER = {
  query: {
    order: {
      name: 'order',
      enum: ['asc', 'desc'],
      required: false,
      description: 'Ordem dos resultados',
    },
    orderBy: {
      name: 'orderBy',
      enum: ['createdAt', 'status', 'updatedAt'],
      required: true,
      description: 'Campo de ordenação',
    },
    page: {
      name: 'page',
      type: Number,
      required: false,
      description: 'Número da página (mínimo: 1)',
    },
    perPage: {
      name: 'perPage',
      type: Number,
      required: false,
      description: 'Itens por página (mínimo: 10)',
    },
  },
  response: {
    success: {
      status: 200,
      description: 'Lista de templates de exame retornada com sucesso',
      schema: {
        example: {
          examTemplates: [
            {
              id: '12345',
              title: 'Exame de Matemática',
              status: 'ativo',
              createdAt: '2025-01-01T00:00:00Z',
              updatedAt: '2025-01-01T00:00:00Z',
            },
            {
              id: '67890',
              title: 'Exame de História',
              status: 'inativo',
              createdAt: '2025-01-01T00:00:00Z',
              updatedAt: '2025-01-01T00:00:00Z',
            },
          ],
        },
      },
    },
    badRequest: {
      status: 400,
      description: 'Erro de validação nos parâmetros da requisição',
      schema: {
        example: {
          message: 'Validation failed',
          statusCode: 400,
          errors: [
            {
              field: 'page',
              message: 'Page must be a number and greater than or equal to 1',
            },
          ],
        },
      },
    },
  },
};
