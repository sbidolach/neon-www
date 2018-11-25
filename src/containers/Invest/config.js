import React from 'react'
import Button from '../../components/uielements/button'

function createColumns () {
  return [
    {
      title: 'Fund Option',
      key: 'fund',
      className: 'isoImageCell',
      render: object => {
        return (
          <div>
            <img src={object.fund} style={{height: '70px'}}/>
          </div>
        )
      }
    },
    {
      title: 'Investment',
      key: 'investment',
      render: object => {
        return (
          <div>
            <img src={object.option} style={{height: '70px'}}/>
          </div>
        )
      }
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => {alert('Voted')}}>Vote</Button>
        </span>
      )
    }
  ]
}

export { createColumns }
