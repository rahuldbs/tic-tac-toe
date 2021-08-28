export const RenderRow = (props) => {
  return props.data.map((col, index) => {
    return (
      <td key={index} onClick={() => props.onClick(index)}>
        {col}
      </td>
    );
  });
};
