import React, { Component } from 'react'
import Popconfirm from '../feedback/popconfirm'

export default class extends Component {
  render () {
    const { index, onRefreshCell } = this.props
    return (
      <Popconfirm
        title="Sure to refresh transactions?"
        okText="DELETE"
        cancelText="No"
        onConfirm={() => onRefreshCell(index)}
      >
        <a>Refresh</a>
      </Popconfirm>
    )
  }
}
