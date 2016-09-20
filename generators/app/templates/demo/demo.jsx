// @require '../../style/reset.scss'
// @require './demo.scss'

import React from 'react';
import ReactDom from 'react-dom';
import <%=upperName%> from '../index';
import { Demo, DemoPanel } from '../../../external/demo/index';
import Doc from './doc.md';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // demo state goes here
    };
  }

  render() {
    return (
      <Demo name="<%=upperName%>" doc={<Doc />}>
        <DemoPanel title="默认demo">
          <<%=upperName%>
            name="<%=upperName%>"
          />
        </DemoPanel>
      </Demo>
    );
  }
}

const demo = document.getElementById('demo');

// 会被首页调用，判断下有无节点
if (demo) {
  ReactDom.render(<App />, demo);
}
