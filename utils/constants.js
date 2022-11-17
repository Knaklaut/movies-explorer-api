const ServerRes = {
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICTING_REQ: 409,
  SERVER_ERR: 500,
};

const Message = {
  BAD_REQUEST: 'Переданы некорректные данные.',
  UNAUTHORIZED: 'Неправильный email или пароль.',
  AUTH_REQUIRED: 'Необходима авторизация.',
  FORBIDDEN: 'Отсутствуют права на удаление этого фильма.',
  MOVIE_NOT_FOUND: 'Запрошенный фильм не найден.',
  USER_NOT_FOUND: 'Пользователь не найден.',
  PAGE_NOT_FOUND: 'Запрошенная страница не найдена.',
  CONFLICTING: 'Пользователь с таким email уже существует.',
  BAD_URL: 'Некорректная ссылка.',
  VALIDATION_ERR: 'Некорректный id.',
  SERVER_ERR: 'На сервере произошла ошибка.',
  CRASH_TEST: 'Сервер сейчас упадёт.',
};

module.exports = {
  ServerRes,
  Message,
};
