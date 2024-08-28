export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row, //当前行的数据
      column: ctx.props.column, //当前列的数据
      index: ctx.props.index //当前是第几行
    };

    return ctx.props.render(h, params);
  }
};
