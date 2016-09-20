/**
 * imui.<%=upperName%>
 * @author <%=author%>
 * @date <%=date%>
 */

import React, { PropTypes } from 'react';

<%if (stateless === 'y'){%>
const <%=upperName%> = function (props) {
  return (
    <div className="im-<%=name%>">
      hello, {props.name}
    </div>
  );
};

<%=upperName%>.propTypes = {
  // replace with your own props
  name: PropTypes.string
};

<%=upperName%>.defaultProps = {

};
<%} else {%>
class <%=upperName%> extends React.Component {
  static propTypes = {
    // replace with your own props
    name: PropTypes.string
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      // state of your component
    };
  }

  render() {
    return (
      <div className="im-<%=name%>">
        hello, {this.props.name}
      </div>
    );
  }
}
<%}%>

export default <%=upperName%>;

