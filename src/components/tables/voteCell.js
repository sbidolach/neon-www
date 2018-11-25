import React, { Component } from 'react'
import Popconfirm from '../feedback/popconfirm'
import Button from '../uielements/button'


export default class extends Component {
  render () {
    const { index, onVoteCell } = this.props
    return (
      <Popconfirm
        title="Sure to vote fot this fund option?"
        okText="VOTE"
        cancelText="No"
        onConfirm={() => onVoteCell(index)}
      >
        <a>Vote</a>
      </Popconfirm>
    )
  }
}
