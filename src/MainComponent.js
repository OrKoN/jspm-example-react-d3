import React from 'react';
import { D3Component } from './D3Component.js';

export class MainComponent extends React.Component {
  render() {
    return <div>
      <h1>Hello World</h1>
      <D3Component />
    </div>;
  }
}