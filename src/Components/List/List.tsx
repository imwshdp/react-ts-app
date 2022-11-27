import React from 'react';

interface ListProps<T> {
  // items array of <T> type
  items: T[];
  // function of render an item with <T> type, which is returning an React Node
  renderItem: (item: T) => React.ReactNode;
}

export default function List<T>(props: ListProps<T>) {
  return (
    <div>
      {props.items.map(props.renderItem)}
    </div>
  );
}