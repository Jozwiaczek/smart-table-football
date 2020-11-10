export default function attachKind() {
  return async (context) => {
    const data = await context.service.get(context.id);
    if (data.kind) {
      context.params.query = { kind: data.kind };
    }
  };
}
