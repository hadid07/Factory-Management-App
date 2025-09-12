import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import axios from 'axios';

const TransactionsModal = (props) => {

  return (
    <div>
      <Modal show={props.show} onHide={props.hide} centered size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Transactions Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex align-items-center gap-5 mb-3 '>
            <h5 className='text-primary fw-bold' >{props.customerName}</h5>
            <h5 className='text-primary fw-bold' >{props.customerArea}</h5>
          </div>

          <div style={{maxHeight:'60vh', overflowY:'auto' }}>
          <Table className='table table-striped table-secondary'  >
            <thead>
              <tr className='fw-bold' >
                <td>Date</td>
                <td>Type</td>
                <td>S/E Amount</td>
                <td>Credit</td>
                <td>Debit</td>
                <td>Running Balance</td>
              </tr>
            </thead>
            <tbody>
              {props.transactions.map((tran, index) => (
                <tr key={index}>
                  <td>{tran.date}</td>
                  <td>{tran.transactiontype}</td>
                  <td>{tran.transactionamount}</td>
                  <td>{tran.credit}</td>
                  <td>{tran.debit}</td>
                  <td className='fw-bold' >{tran.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
              </div>
        </Modal.Body>
      </Modal>


    </div>
  )
}

export default TransactionsModal