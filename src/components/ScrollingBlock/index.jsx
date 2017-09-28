import React, { Component } from 'react';

class ScrollingBlock extends Component {
  componentWillUpdate() {
    this.scrollingBlock.scrollTop = this.scrollingBlock.scrollHeight;
  }

  render() {
    return (
      <div
        className={'scrollingBlock'}
        ref={scrollingBlock => {
          this.scrollingBlock = scrollingBlock;
        }}
      >
        <div className="scrollingBlock__scrollable">{this.props.children}</div>
      </div>
    );
  }
}

export default ScrollingBlock;
