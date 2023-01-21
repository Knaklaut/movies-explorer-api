const ServerRes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICTING_REQ: 409,
  SERVER_ERR: 500,
};

const Message = {
  CREATED: 'Пользователь успешно добавлен в базу.',
  BAD_REQUEST: 'Переданы некорректные данные.',
  UNAUTHORIZED: 'Неправильный email или пароль.',
  MOVIE_FORBIDDEN: 'Отсутствуют права на удаление этого фильма.',
  MOVIE_NOT_FOUND: 'Запрошенный фильм не найден.',
  USER_NOT_FOUND: 'Пользователь не найден.',
  USER_BAD_EMAIL: 'Такой адрес email уже существует',
  USER_CONFLICT: 'Пользователь с таким email уже существует.',
  PAGE_NOT_FOUND: 'Запрошенная страница не найдена.',
  VALIDATION_BAD_URL: 'Некорректная ссылка.',
  SERVER_ERROR: 'На сервере произошла ошибка.',
};

module.exports = {
  ServerRes,
  Message,
};
