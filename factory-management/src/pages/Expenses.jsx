import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { CashStack, TrashFill } from 'react-bootstrap-icons'
import { Modal, Table } from 'react-bootstrap'
import ExpenseModal from '../components/ExpenseModal'
import axios from 'axios'

const Expenses = () => {
  const getLocalDateString = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const [date, setDate] = useState(getLocalDateString())
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [items, setItems] = useState([])
  const [expenses, setExpenses] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [deleteExpense, setDeleteExpense] = useState(null)

  useEffect(() => {
    const getItems = async () => {
      const res = await axios.get('http://localhost:3000/get_items', {
        withCredentials: true,
      })
      if (res.data.status) {
        setItems(res.data.items)
      }
    }

    const get_expenses = async () => {
      try {
        const result = await axios.get(
          'http://localhost:3000/get_all_expenses',
          { withCredentials: true }
        )
        if (result.data.status) {
          setExpenses(result.data.expenses)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getItems()
    get_expenses()
  }, [])

  const hide = () => {
    setShowExpenseModal(false)
    setDate(getLocalDateString())
  }

  const filteredExpenses = expenses.filter((exp) => {
    const localDate = new Date(exp.date).toLocaleDateString('en-CA') // YYYY-MM-DD
    return localDate === date
  })

  const handleDeleteClick = (expense) => {
    setDeleteExpense(expense)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    
    try {
      const result = await axios.post(
        'http://localhost:3000/delete_expense',
        deleteExpense,
        { withCredentials: true }
      )

      if (result.data.status) {
        setMessage(result.data.message)
        setShowMessage(true)

        // refresh list
        const res = await axios.get('http://localhost:3000/get_all_expenses', {
          withCredentials: true,
        })
        if (res.data.status) {
          setExpenses(res.data.expenses)
        }
      } else {
        setMessage('Could not delete Expense')
        setShowMessage(true)
      }
    } catch (err) {
      console.log(err)
      setMessage('Internal Server Error')
      setShowMessage(true)
    } finally {
      setShowDeleteModal(false)
      setDeleteExpense(null)
    }
  }

  return (
    <>
      <Navbar />
      <div className="d-flex flex-row">
        <div className="flex-grow-0" style={{ width: '220px' }}>
          <Sidebar />
        </div>
        <div className="flex-grow-1 p-4">
          <div className="d-flex flex-row mx-5 justify-content-between">
            <input
              type="date"
              name="date"
              className="border-2 border-primary rounded p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div
              className="btn btn-primary"
              onClick={() => setShowExpenseModal(true)}
            >
              <CashStack /> <span>Add Expense</span>
            </div>
          </div>

          <div>
            <Table className="table table-secondary table-striped shadow rounded mt-3">
              <thead>
                <tr>
                  <td>Date</td>
                  <td>Customer Name</td>
                  <td>Customer Area</td>
                  <td>Description</td>
                  <td>Type</td>
                  <td>Expense Amount</td>
                  <td>Debit</td>
                  <td>Remaining</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      {new Date(expense.date).toLocaleDateString('en-CA')}
                    </td>
                    <td>{expense.customername}</td>
                    <td>{expense.customerarea}</td>
                    <td>{expense.description}</td>
                    <td>{expense.expensetype}</td>
                    <td>{expense.expenseamount}</td>
                    <td>{expense.debit}</td>
                    <td>
                      {Number(expense.expenseamount) - Number(expense.debit)}
                    </td>
                    <td onClick={() => handleDeleteClick(expense)}>
                      <TrashFill className="text-danger cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <ExpenseModal
        show={showExpenseModal}
        hide={hide}
        date={date}
        items={items}
      />

      {/* Delete Confirm Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this expense?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      {/* Message Modal */}
      <Modal show={showMessage} onHide={() => setShowMessage(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowMessage(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Expenses