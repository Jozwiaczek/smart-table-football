const rowStyle = (record = {}) => {
  if (record.status === 'pending' || !record.status) return { backgroundColor: '#ffd' };
  if (record.status === 'rejected') return { opacity: 0.3 };
  return {};
};

export default rowStyle;
