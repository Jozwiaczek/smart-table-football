export default function parsMongoDbRegexQueries(queryType = '$regex', field = 'name') {
  return async (context) => {
    if (context.params.query) {
      Object.keys(context.params.query)
        .filter((key) => key.includes(field))
        .forEach((key) => {
          const q = context.params.query[key];
          context.params.query[key] = {
            ...q,
            $options: 'i',
          };
        });
    }
  };
}
