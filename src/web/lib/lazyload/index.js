import React from 'react';
import Lazyloads from './Lazyload';

export default function Lazyload(component, resetProps, loading) {
  return props => (
    <Lazyloads load={component} loading={loading}>
      {Comp => (Comp ? <Comp page={resetProps} {...props} /> : null)}
    </Lazyloads>
  );
}
