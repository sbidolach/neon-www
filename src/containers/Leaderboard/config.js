import React from 'react'

import Button from '../../components/uielements/button'

function createColumns () {
  return [
    {
      title: 'Group Name',
      key: 'fund',
      className: 'isoImageCell',
      render: object => {
        return (
          <div>
            <span style={{fontSize: '16px'}}><b>{object.name}</b></span>
            <br/><br/>
            <img src={object.image} style={{height: '90px'}}/>
          </div>
        )
      }
    },
    {
      title: 'Conditions',
      key: 'conditions',
      render: object => {
        return (
          <div style={{fontSize: '16px'}}>
            Amount: <b>{object.amount}</b>
            <br/> <br/>
            Frequency: <b>{object.frequency}</b>
          </div>
        )
      }
    },
    {
      title: 'Performance',
      key: 'performance',
      render: object => {
        return (
          <div>
            <img src={object.performance} style={{height: '70px'}}/>
          </div>
        )
      }
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => {alert('You are added to group')}}>Ask to join</Button>
        </span>
      )
    }
  ]
}

export { createColumns }
